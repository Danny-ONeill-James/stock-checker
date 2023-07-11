import { Controller, Get } from '@nestjs/common';
import { PreordersService } from './preorders.service';

@Controller('preorders')
export class PreordersController {
  constructor(private preorderService: PreordersService) {}

  @Get('getFirestormPreorders')
  getFirestormPreorders() {
    console.log('Controller: Getting Preorders');
    return this.preorderService.getFirestormPreorders();
  }
}
