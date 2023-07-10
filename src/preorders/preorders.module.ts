import { Module } from '@nestjs/common';
import { PreordersService } from './preorders.service';
import { PreordersController } from './preorders.controller';

@Module({
  providers: [PreordersService],
  controllers: [PreordersController]
})
export class PreordersModule {}
