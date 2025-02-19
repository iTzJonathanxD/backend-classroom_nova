import { SetMetadata } from '@nestjs/common';

export const LOG_METHOD = 'log_method'; 

export const LogMethod = () => SetMetadata(LOG_METHOD, true);
