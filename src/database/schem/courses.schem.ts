import * as mongoose from 'mongoose';
const { Schema } = mongoose

export const coursesSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        descripion: {
            type: String,
            required: true
        },
        docenteId: [{ 
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true

        }],
        videos: [{
            type: Schema.Types.ObjectId,
            ref: 'lives'
        }],
    }
)