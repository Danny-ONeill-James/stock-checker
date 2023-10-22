import { Injectable } from '@nestjs/common';
import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  TextChannel,
} from 'discord.js';
import 'dotenv/config';
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

  async onModuleInit() {
    await this.startBot();
  }

  async onModuleDestroy() {
    await this.logoutBot();
  }

  async startBot() {
    try {
      console.log('Start Bot Service');
      await client.login(process.env.DISCORD_TOKEN);
      client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
      });
    } catch (error) {
      console.error('Error starting the bot:', error);
    }
  }

  async logoutBot() {
    try {
      console.log('Logging out the bot...');
      await client.destroy();
      console.log('Bot logged out successfully.');
    } catch (error) {
      console.error('Error logging out the bot:', error);
    }
  }

  async HourlyCheck(game: string) {
    console.log('Hourly Check');
    //Check Database for new preorders
    const newPreorders: IPreorder[] =
      await this.CheckDatabaseForNewPreordersForGame(game);
    //if there are new preorders, send a message to the discord channel

    if (newPreorders.length >= 0) {
      this.PostMessageToDiscord(newPreorders);
    } else {
      console.log('No new preorders to post to Discord', new Date());
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
    let WarhammerBuyAndSellChannel = process.env.DISCORD_GUILD_ID;
    console.log('Channel Id: ', WarhammerBuyAndSellChannel);

    preorders.forEach((preorder) => {
      console.log('Will post: ', preorder.title);

      const WarhammerPreorderEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(preorder.title)
        .setURL(
          `https://firestormgames.co.uk${preorder.firestormLink}?aff=6378bb243d570`,
        )

        .setAuthor({
          name: 'New Preorder Available',
          iconURL:
            'https://res.cloudinary.com/deftmtx9e/image/upload/v1676545362/More%20From%20Games/siteLogo/mark_dulotp.png',
          url: 'https://morefromgames.com/',
        })
        .setDescription(
          `A new preorder for Warhammer 40,000 ${preorder.title} has become available.`,
        )
        .setImage(`${preorder.image}?aff=6378bb243d570`)
        .setTimestamp()
        .setFooter({
          text: 'Brought to you by MoreFromGames.com',
          iconURL:
            'https://res.cloudinary.com/deftmtx9e/image/upload/v1676545362/More%20From%20Games/siteLogo/mark_dulotp.png',
        });

      console.log('Embed: ', WarhammerPreorderEmbed);

      const channel = client.channels.cache.get(WarhammerBuyAndSellChannel);
      if (channel instanceof TextChannel) {
        channel.send({ embeds: [WarhammerPreorderEmbed] });
      }
    });

    console.log('Posting to Discord', new Date());
  }
}
