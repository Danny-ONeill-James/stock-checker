import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreordersModule } from './preorders/preorders.module';

@Module({
  imports: [PreordersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
