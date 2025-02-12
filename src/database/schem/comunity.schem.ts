import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const ComunitySchema = new Schema(
    {
        videoId: {
            ref: 'lives',
            type: Schema.Types.ObjectId,
            required: true
        },
        alumnoId: {
            ref: 'users',
            type: Schema.Types.ObjectId,
            required: true
        },
        comentario: {
            type: String,
            required: true,
        },
        fecha_creacion: {
            type: Date,
            required: true
        }
    }
)