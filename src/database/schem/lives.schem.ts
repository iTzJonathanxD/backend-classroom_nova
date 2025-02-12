import * as mongoose from 'mongoose';

export const livesSchema = new mongoose.Schema({
    thumbnail: { 
        type: String, 
        required: true 
    }, 
    url_video: { 
        type: String, 
        required: true 
    } 
  });
  