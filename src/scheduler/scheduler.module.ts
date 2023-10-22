import { Module } from '@nestjs/common';
import { BotModule } from 'src/bot/bot.module';
import { PreordersModule } from 'src/preorders/preorders.module';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';

@Module({
  providers: [SchedulerService],
  imports: [BotModule, PreordersModule],
  controllers: [SchedulerController],
})
export class SchedulerModule {}
