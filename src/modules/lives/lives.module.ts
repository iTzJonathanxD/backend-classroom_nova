import { Module } from '@nestjs/common';
import { LivesService } from './lives.service';
import { LivesController } from './lives.controller';
import { MongooseModule } from '@nestjs/mongoose';  
import { Live, LiveSchema } from 'src/model';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Live.name, schema: LiveSchema }]),  
    JwtModule
  ],
  providers: [LivesService],
  controllers: [LivesController]
})
export class LivesModule {}
