import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreorderEntity } from './entities/preorder.entity';
import { PreordersController } from './preorders.controller';
import { PreordersService } from './preorders.service';

@Module({
  imports: [TypeOrmModule.forFeature([PreorderEntity])],
  providers: [PreordersService],
  controllers: [PreordersController],
  exports: [PreordersService],
})
export class PreordersModule {}
