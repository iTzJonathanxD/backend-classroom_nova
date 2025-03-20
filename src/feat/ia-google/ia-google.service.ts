import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TextGenerationService } from './services/text-generation.service';
import { ImageGenerationService } from './services/image-generation.service';
import { VisionService } from './services/vision.service';
import { 
  GOOGLE_AI_API_KEY, 
  IMAGE_GENERATION_MODEL, 
  VISION_MODEL, 
  TEXT_GENERATION_MODEL 
} from '../../config/env.config';

@Injectable()
export class IaGoogleService implements OnModuleInit {
  private genAI: GoogleGenerativeAI;
  private readonly apiKey: string;
  private readonly models: { imageGeneration: string; vision: string; textGeneration: string };

  constructor(
    private configService: ConfigService,
    private textGenerationService: TextGenerationService,
    private imageGenerationService: ImageGenerationService,
    private visionService: VisionService,
  ) {
    this.apiKey = GOOGLE_AI_API_KEY;
    this.models = {
      imageGeneration: IMAGE_GENERATION_MODEL,
      vision: VISION_MODEL,
      textGeneration: TEXT_GENERATION_MODEL,
    };
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async onModuleInit() {
    // Consulta de prueba para verificar la API key
    try {
      const prompt = 'Si te digo "ping", por favor responde con "pong".'; // El prompt mejorado
      const model = this.genAI.getGenerativeModel({ model: this.models.textGeneration }); // Obtener el modelo de generación
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      // Verificar si la respuesta es "pong"
      if (responseText.trim() === 'pong') {
        console.log('Conexión exitosa con la IA de Google');
      } else {
        console.error('La IA de Google no respondió correctamente');
      }
    } catch (error) {
      console.error('Error al conectar con la IA de Google:', error.message);
    }
  }

  // Métodos para acceder a los servicios específicos
  getTextGeneration() {
    return this.textGenerationService;
  }

  getImageGeneration() {
    return this.imageGenerationService;
  }

  getVision() {
    return this.visionService;
  }
} 