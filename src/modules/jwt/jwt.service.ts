import { Injectable } from '@nestjs/common'
import { generateJwt, verifyJwt } from '../../common/utils/helpers';

@Injectable()
export class JwtServices {

  async verifyJwt(token: string): Promise<any> {
    return verifyJwt(token); 
  }
  async generateJwt(user: any): Promise<string> {
    return generateJwt(user); 
  }
}
