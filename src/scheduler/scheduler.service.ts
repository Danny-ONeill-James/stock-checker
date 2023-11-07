import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BotService } from 'src/bot/bot.service';
import { PreordersService } from 'src/preorders/preorders.service';

@Injectable()
export class SchedulerService {
  constructor(
    private preorderService: PreordersService,
    private botService: BotService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES_BETWEEN_9AM_AND_6PM, {
    name: 'getPreordersCron',
  })
  async getPreordersCron() {
    console.log('Run CronJob: getPreordersCron ', new Date());
    await this.preorderService.getFirestormPreorders();
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    name: 'postToDiscordCron',
  })
  async postToDiscordCron() {
    console.log('Run CronJob: postToDiscordCron ', new Date());
    await this.botService.checkForNewMessages('Warhammer 40,000');
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'checkNextNullImageCron',
  })
  async checkNextNullImage() {
    console.log('Run CronJob: checkNextNullImageCron ', new Date());
    await this.preorderService.checkNextNullImage('Warhammer 40,000');
  }
}
