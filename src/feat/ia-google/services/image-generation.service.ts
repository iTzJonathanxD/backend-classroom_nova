import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IMAGE_GENERATION_MODEL } from '../../../config/env.config';

@Injectable()
export class ImageGenerationService {
  private model: any;

  constructor(genAI: GoogleGenerativeAI) {
    this.model = genAI.getGenerativeModel({ model: IMAGE_GENERATION_MODEL });
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent([
        {
          role: 'user',
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Error generating image: ${error.message}`);
    }
  }

  async generateImageWithStyle(prompt: string, style: string): Promise<string> {
    try {
      const result = await this.model.generateContent([
        {
          role: 'user',
          parts: [
            {
              text: `Generate an image in ${style} style: ${prompt}`
            }
          ]
        }
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Error generating image with style: ${error.message}`);
    }
  }

  async generateImageWithSize(prompt: string, width: number, height: number): Promise<string> {
    try {
      const result = await this.model.generateContent([
        {
          role: 'user',
          parts: [
            {
              text: `Generate an image with dimensions ${width}x${height}: ${prompt}`
            }
          ]
        }
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Error generating image with size: ${error.message}`);
    }
  }
} 