import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PreordersModule } from 'src/preorders/preorders.module';
import { BotController } from './bot.controller';
import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forFeature(),
    PreordersModule,
  ],
  providers: [BotService, ConfigService, BotGateway],
  exports: [BotService],
  controllers: [BotController],
})
export class BotModule {}
