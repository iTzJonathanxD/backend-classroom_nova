import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IaGoogleService } from './ia-google.service';
import { TextGenerationService } from './services/text-generation.service';
import { ImageGenerationService } from './services/image-generation.service';
import { VisionService } from './services/vision.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Module({
  imports: [ConfigModule],
  providers: [
    IaGoogleService,
    TextGenerationService,
    ImageGenerationService,
    VisionService,
    {
      provide: GoogleGenerativeAI,
      useValue: new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY),
    },
  ],
  exports: [IaGoogleService, TextGenerationService, ImageGenerationService, VisionService]
})
export class IaGoogleModule {} 