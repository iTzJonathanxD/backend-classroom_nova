import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const paymentsSchema = new Schema(
    {
        alumnoId: {
            ref: 'users',
            type: Schema.Types.ObjectId,
            required: true
        },
        monto: {
            type: Number,
            required: true,
        },
        razon: {
            type: String,
            required: true,
        },
        fecha_pago: {
            type: Date,
            required: true
        },
        fecha_expiracion: {
            type: Date,
            required: true
        },
        estado: { 
            type: String, 
            enum: ["Pendiente", "Aprobado", "Rechazado"], 
            default: "Pendiente"
        },
    }
)