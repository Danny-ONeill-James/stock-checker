import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [ConfigModule.forRoot(), DiscordModule.forFeature()],
  providers: [BotService, ConfigService, BotGateway],
  exports: [BotService],
  controllers: [BotController],
})
export class BotModule {}
