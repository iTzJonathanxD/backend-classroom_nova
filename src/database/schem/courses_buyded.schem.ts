import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const coursesbuySchema = new mongoose.Schema(
    {
      fecha_adquisicion:{
        type: String,
        required: true
      },
      renovacion:{
        type: String,
        required: true
      },
      referidosId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
      ],

    }

);
      