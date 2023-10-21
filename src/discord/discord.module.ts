import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';

@Module({
  imports: [ConfigModule],
  providers: [DiscordService, ConfigService],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
