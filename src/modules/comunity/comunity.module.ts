import { Module } from '@nestjs/common';
import { ComunityService } from './comunity.service';
import { ComunityController } from './comunity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from 'src/model';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Community.name, schema: CommunitySchema}]),
    JwtModule
  ],
  providers: [ComunityService],
  controllers: [ComunityController]
})
export class ComunityModule {}
