import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentsService } from './payments.service';
import { PaymentDocument } from 'src/model';
import { BaseController } from '../../shared/base/base.controller';
import { IaGoogleService } from '../../feat/ia-google/ia-google.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Payments } from 'src/model/payment.model';

@Controller('api/v1/payments')
export class PaymentsController extends BaseController<PaymentDocument> {
  constructor(
    private readonly productService: PaymentsService,
    private readonly iaGoogleService: IaGoogleService,
  ) {
    super(productService); 
  }

  @Post('process-payment-image')
  @Auth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async processPaymentImage(@UploadedFile() file: Express.Multer.File, @Body() body: { ip_transaccion: string, dispositivo: string, detalles_adicionales: string }) {
    try {
      // Procesar la imagen con el servicio de visión
      const analysis = await this.iaGoogleService.getVision().analyzeImage(
        file.buffer,
        `Analiza este comprobante de pago y extrae la siguiente información en formato JSON:
        {
          "monto": "cantidad numérica del pago",
          "moneda": "código de moneda (priorizar: PEN, MXN, USD)",
          "razon": "descripción o concepto del pago",
          "fecha_pago": "fecha y hora en formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.SSSZ)",
          "entity": "tipo de comprobante (transferencia bancaria, captura de teléfono, plataforma de pago específica)",
          "codigo_transaccion": "código único de la transacción o voucher"
        }
        Responde SOLO con el JSON, sin texto adicional.`
      );

      const parsedAnalysis = JSON.parse(analysis);

      // Validar que todos los campos requeridos estén presentes
      const requiredFields = ['monto', 'moneda', 'razon', 'fecha_pago', 'entity', 'codigo_transaccion'];
      const missingFields = requiredFields.filter(field => !parsedAnalysis[field]);

      if (missingFields.length > 0) {
        throw new Error(`Campos faltantes en el análisis: ${missingFields.join(', ')}`);
      }
      // Crear un nuevo objeto de pago
      const newPayment = new Payments();
      newPayment.alumnoId = parsedAnalysis.alumnoId;
      newPayment.monto = parsedAnalysis.monto;
      newPayment.moneda = parsedAnalysis.moneda;
      newPayment.razon = parsedAnalysis.razon;
      newPayment.fecha_pago = new Date(parsedAnalysis.fecha_pago);
      newPayment.fecha_expiracion = new Date(); // Ajusta según tu lógica
      newPayment.codigo_transaccion = parsedAnalysis.codigo_transaccion;
      newPayment.entity = parsedAnalysis.entity;
      newPayment.estado = 'Pendiente'; // Estado inicial
      newPayment.metadata = {
        imagen_voucher: file.filename,
        detalles_adicionales: body.detalles_adicionales,
        ip_transaccion: body.ip_transaccion,
        dispositivo: body.dispositivo,
      };

      // Guardar el nuevo pago en la base de datos
      await this.productService.create(newPayment);

      return {
        success: true,
        message: 'Imagen procesada y pago guardado exitosamente',
        data: newPayment,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al procesar la imagen',
        error: error.message,
      };
    }
  }
}