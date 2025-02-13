import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { LivesModule } from './modules/lives/lives.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ComunityModule } from './modules/comunity/comunity.module';
import { CategoryCoursesModule } from './modules/category_courses/category_courses.module';
import { CoursesBuydedModule } from './modules/courses_buyded/courses_buyded.module';

@Module({
  imports: [
    DatabaseModule, 
    UserModule, 
    PaymentsModule, 
    LivesModule, 
    CoursesModule, 
    ComunityModule, 
    CategoryCoursesModule, 
    CoursesBuydedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}