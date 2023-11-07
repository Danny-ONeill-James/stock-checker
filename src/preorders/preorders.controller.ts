import { Controller, Get } from '@nestjs/common';
import { PreordersService } from './preorders.service';

@Controller('preorders')
export class PreordersController {
  constructor(private readonly preorderService: PreordersService) {}

  @Get()
  async getPreorders() {
    await this.preorderService.getFirestormPreorders();
  }
}
