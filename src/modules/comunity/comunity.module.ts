import { Module } from '@nestjs/common';
import { ComunityService } from './comunity.service';
import { ComunityController } from './comunity.controller';

@Module({
  providers: [ComunityService],
  controllers: [ComunityController]
})
export class ComunityModule {}
