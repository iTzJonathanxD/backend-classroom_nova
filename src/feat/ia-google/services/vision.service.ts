import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { VISION_MODEL } from '../../../config/env.config';

@Injectable()
export class VisionService {
  private model: any;

  constructor(genAI: GoogleGenerativeAI) {
    this.model = genAI.getGenerativeModel({ model: VISION_MODEL });
  }

  async analyzeImage(imageData: Buffer, prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent([
        { text: prompt },
        { inlineData: { mimeType: 'image/jpeg', data: imageData.toString('base64') } }
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Error analyzing image: ${error.message}`);
    }
  }

  async detectObjects(imageData: Buffer): Promise<string> {
    try {
      const result = await this.model.generateContent([
        { text: 'What objects do you see in this image?' },
        { inlineData: { mimeType: 'image/jpeg', data: imageData.toString('base64') } }
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Error detecting objects: ${error.message}`);
    }
  }

  async describeImage(imageData: Buffer): Promise<string> {
    try {
      const result = await this.model.generateContent([
        { text: 'Describe this image in detail.' },
        { inlineData: { mimeType: 'image/jpeg', data: imageData.toString('base64') } }
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Error describing image: ${error.message}`);
    }
  }
} 