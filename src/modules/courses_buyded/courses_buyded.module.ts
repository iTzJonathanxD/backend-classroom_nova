import { Module } from '@nestjs/common';
import { CoursesBuydedController } from './courses_buyded.controller';
import { CoursesBuydedService } from './courses_buyded.service';

@Module({
  controllers: [CoursesBuydedController],
  providers: [CoursesBuydedService]
})
export class CoursesBuydedModule {}
