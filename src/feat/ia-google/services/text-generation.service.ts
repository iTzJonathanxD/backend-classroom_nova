import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TEXT_GENERATION_MODEL } from '../../../config/env.config';

@Injectable()
export class TextGenerationService {
  private model: any;

  constructor(private readonly googleGenerativeAI: GoogleGenerativeAI) {
    this.model = this.googleGenerativeAI.getGenerativeModel({ model: TEXT_GENERATION_MODEL });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Error generating text: ${error.message}`);
    }
  }

  async generateTextWithContext(prompt: string, context: string): Promise<string> {
    try {
      const result = await this.model.generateContent([
        { role: 'user', parts: [{ text: context }] },
        { role: 'model', parts: [{ text: 'Entendido.' }] },
        { role: 'user', parts: [{ text: prompt }] }
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Error generating text with context: ${error.message}`);
    }
  }

  async generateStructuredText(prompt: string, format: string): Promise<any> {
    try {
      const result = await this.model.generateContent([
        { role: 'user', parts: [{ text: `Generate a response in ${format} format for: ${prompt}` }] }
      ]);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      throw new Error(`Error generating structured text: ${error.message}`);
    }
  }
} 