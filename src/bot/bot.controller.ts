import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService) {}

  @Get()
  check() {
    return this.botService.HourlyCheck('Warhammer 40,000');
  }
}
