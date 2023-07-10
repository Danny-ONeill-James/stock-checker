import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePreorderDto } from './dtos/CreatePreorder.dto';
import { PreorderEntity } from './entities/preorder.entity';

@Injectable()
export class PreordersService {
  constructor(
    @InjectRepository(PreorderEntity)
    private preorderRepository: Repository<PreorderEntity>,
  ) {}

  async getFirestormPreorders(): Promise<CreatePreorderDto[]> {
    return null;
  }
}
