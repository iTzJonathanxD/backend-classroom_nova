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
  async processPaymentImage(@UploadedFile() file: Express.Multer.File, @Body() body: { ip_transaccion: string, dispositivo: string, detalles_adicionales: string, estudianteId: string }) {
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
  "entity": "entidad financiera o plataforma de pago (solo bancos y métodos de pago con comprobante en México, Perú y EE.UU.)",
  "codigo_transaccion": "código único de la transacción o voucher"
}

### Criterios para "entity":
- Si es una **transferencia bancaria**, identifica el banco emisor o receptor.
- Si es una **captura de pago de teléfono**, extrae el nombre de la app (ej. PayPal, Mercado Pago, Venmo).
- Si es un **voucher de tarjeta**, identifica la entidad procesadora (ej. Visa, Mastercard, American Express).
- Si el método no pertenece a México, Perú o EE.UU., omítelo.

### Métodos de pago válidos:

#### **🇲🇽 México**  
✅ **Bancos (SPEI, depósitos, cheques)**: BBVA México, Banorte, Citibanamex, HSBC México, Santander México, Banco Azteca, etc.  
✅ **Plataformas digitales**: Mercado Pago, PayPal, Clip, CoDi, OpenPay, Conekta.  
✅ **Tarjetas y vouchers**: Visa, Mastercard, American Express.  
✅ **Pagos en efectivo con comprobante**: OXXO Pay, 7-Eleven Pay, Farmacias del Ahorro, Chedraui Pay.  

#### **🇵🇪 Perú**  
✅ **Bancos (transferencias, cheques, depósitos)**: BCP, Interbank, BBVA Perú, Scotiabank Perú, Caja Huancayo, etc.  
✅ **Plataformas digitales**: Yape, Plin, Lukita, Mercado Pago, PayU, PayPal.  
✅ **Tarjetas y vouchers**: Visa, Mastercard, American Express, Diners Club.  
✅ **Pagos en efectivo con comprobante**: PagoEfectivo, Kasnet, Western Union.  

#### **🇺🇸 EE.UU.**  
✅ **Bancos (ACH, depósitos, cheques)**: Bank of America, Chase Bank, Wells Fargo, Citibank, Capital One, PNC Bank.  
✅ **Plataformas digitales**: PayPal, Venmo, Cash App, Zelle, Stripe, Square.  
✅ **Tarjetas y vouchers**: Visa, Mastercard, American Express, Discover.  
✅ **Pagos en efectivo con comprobante**: MoneyGram, Western Union.  

Responde **solo con el JSON**, sin texto adicional.
`
      );

      // Eliminar las comillas invertidas y espacios adicionales
      const cleanedAnalysis = analysis.replace(/```json/g, '').replace(/```/g, '').trim();

      console.log(cleanedAnalysis);

      // Asegúrate de que el análisis sea un JSON válido
      const parsedAnalysis = JSON.parse(cleanedAnalysis);

      // Validar que todos los campos requeridos estén presentes
      const requiredFields = ['monto', 'moneda', 'razon', 'fecha_pago', 'entity', 'codigo_transaccion'];
      const missingFields = requiredFields.filter(field => !parsedAnalysis[field]);

      if (missingFields.length > 0) {
        throw new Error(`Campos faltantes en el análisis: ${missingFields.join(', ')}`);
      }

      // Crear un nuevo objeto de pago
      const newPayment = new Payments();
      newPayment.estudianteId = body.estudianteId;
      newPayment.monto = parsedAnalysis.monto;
      newPayment.moneda = parsedAnalysis.moneda;
      newPayment.razon = parsedAnalysis.razon;
      newPayment.fecha_pago = new Date(parsedAnalysis.fecha_pago);
      newPayment.codigo_transaccion = parsedAnalysis.codigo_transaccion;
      newPayment.entity = parsedAnalysis.entity;
      newPayment.estado = 'Pendiente'; // Estado inicial

      // Establecer la fecha de expiración a un mes a partir de ahora
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      newPayment.fecha_expiracion = expirationDate;

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