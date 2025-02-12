import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Userschema } from 'src/database';
import { User } from 'src/utils';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: Userschema }]),  
    JwtModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
