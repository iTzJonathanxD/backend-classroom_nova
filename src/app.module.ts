import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { LivesModule } from './modules/lives/lives.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ComunityModule } from './modules/comunity/comunity.module';
import { CategoryCoursesModule } from './modules/category_courses/category_courses.module';
import { CoursesBuydedModule } from './modules/courses_buyded/courses_buyded.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    DatabaseModule, 
    UserModule, 
    PaymentsModule, 
    LivesModule, 
    CoursesModule, 
    ComunityModule, 
    CategoryCoursesModule, 
    CoursesBuydedModule,
    LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}