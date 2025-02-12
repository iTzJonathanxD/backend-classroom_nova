import * as mongoose from 'mongoose';
const {Schema} = mongoose

export const category_cousesSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imagen_referencia: {
            type: String,
            required: true
        },
        cursosId: [{
            type: Schema.Types.ObjectId,
            ref: 'courses',
            required: true
        }],
    }
    
)