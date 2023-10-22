import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as cheerio from 'cheerio';
import { IsNull, Repository } from 'typeorm';
import { CreatePreorderDto } from './dtos/CreatePreorder.dto';
import { PreorderEntity } from './entities/preorder.entity';
import { IPreorder } from './interfaces/preorder.interface';

@Injectable()
export class PreordersService {
  constructor(
    @InjectRepository(PreorderEntity)
    private preorderRepository: Repository<PreorderEntity>,
  ) {}

  async getPreorders(): Promise<IPreorder[]> {
    const preorders: IPreorder[] = await this.preorderRepository.find({
      where: { deletedAt: IsNull() },
    });

    return preorders;
  }

  async GetNewPreorders(): Promise<IPreorder[]> {
    const newPreorders: IPreorder[] = await this.preorderRepository.find({
      where: { hasBeenCommunicated: false },
    });

    return newPreorders;
  }

  async GetNewPreordersForGame(game: string): Promise<IPreorder[]> {
    const newPreorders: IPreorder[] = await this.preorderRepository.find({
      where: { hasBeenCommunicated: false, game },
    });

    return newPreorders;
  }

  async getFirestormPreorders(): Promise<CreatePreorderDto[]> {
    const html = await fetch(
      'https://www.firestormgames.co.uk/latest-and-pre-release?show=pre-release',
      { cache: 'no-store' },
    ).then((response) => response.text());

    const $ = cheerio.load(html);

    const preorders: CreatePreorderDto[] = [];

    $('.products .panel').each((_, panelElement) => {
      const panel = $(panelElement);
      const game = panel.find('.panel-title').text().trim();

      panel.find('.item-inner').each((_, element) => {
        const preorderElement = $(element);

        const title = preorderElement
          .find('meta[itemprop="name"]')
          .attr('content');
        const firestormLink = preorderElement
          .find('a[itemprop="offers"]')
          .attr('href');
        const image = preorderElement
          .find('meta[itemprop="image"]')
          .attr('content');

        const preorder: CreatePreorderDto = {
          title,
          firestormLink,
          game,
          image,
          hasBeenCommunicated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        preorders.push(preorder);
      });
    });

    const fullDatabase: IPreorder[] = await this.preorderRepository.find({
      where: { deletedAt: IsNull() },
    });

    for (let i = 0; i < fullDatabase.length; i++) {
      const item = fullDatabase[i];
      let foundMatch = false;

      for (let j = 0; j < preorders.length; j++) {
        const inputFromScrape = preorders[j];
        if (
          inputFromScrape.title === item.title &&
          inputFromScrape.game === item.game
        ) {
          foundMatch = true;
          preorders.splice(j, 1);
          j--;
        }
      }

      if (foundMatch) {
        fullDatabase.splice(i, 1);
        i--;
      }
    }

    const currentDate = new Date();

    await this.preorderRepository
      .createQueryBuilder()
      .update()
      .set({ deletedAt: currentDate })
      .whereInIds(fullDatabase.map((item) => item.id))
      .execute();

    preorders.forEach(async (preorder) => {
      // Save the preorder entity to the database
      const createdPreorder = await this.preorderRepository.save(preorder);
      console.log('Added Preorder: ', createdPreorder.title);
    });

    return preorders;
  }

  updatePredorderHasBeenCommunicated(id: string) {
    return this.preorderRepository.update(id, { hasBeenCommunicated: true });
  }
}
