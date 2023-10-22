import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { Client, GatewayIntentBits } from 'discord.js';
import { PreorderEntity } from 'src/preorders/entities/preorder.entity';
import { IPreorder } from 'src/preorders/interfaces/preorder.interface';
import { PreordersService } from 'src/preorders/preorders.service';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

@Injectable()
export class BotService {
  constructor(private preorderService: PreordersService) {}

  async HourlyCheck(game: string) {
    console.log('Hourly Check');
    //Check Database for new preorders
    const newPreorders: IPreorder[] =
      await this.CheckDatabaseForNewPreordersForGame(game);
    //if there are new preorders, send a message to the discord channel

    if (newPreorders) {
      this.PostMessageToDiscord(newPreorders);
    }

    return newPreorders;
  }

  async CheckDatabaseForNewPreordersForGame(
    game: string,
  ): Promise<IPreorder[]> {
    const preorders: IPreorder[] =
      await this.preorderService.GetNewPreordersForGame(game);
    console.log('Preorders: ', preorders);
    return preorders;
  }

  PostMessageToDiscord(preorders: IPreorder[]) {
    console.log('Posting to Discord');
  }
}
