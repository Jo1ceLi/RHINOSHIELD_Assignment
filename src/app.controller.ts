import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Itsthisforthat } from './DailySentenseServices/Itsthisforthat.service';
import { Metaphorpsum } from './DailySentenseServices/Metaphorpsum.service';
import { GetDailySentense } from './DailySentenseServices/get-daily-sentense.interface';

@Controller()
export class AppController {
  constructor(
    private readonly itsthisforthat: Itsthisforthat,
    private readonly metaphorpsum: Metaphorpsum,
  ) {}

  @Get()
  async getSentense(@Query('source') source: string): Promise<string> {
    if (source !== 'I' && source !== 'M') {
      throw new BadRequestException(`Source mismatch, only accept "I" or "M"`);
    }
    const service = this.sentenseFactory(source);
    return service.getSetense();
  }

  private sentenseFactory(source: string): GetDailySentense {
    switch (source) {
      case 'M':
        return this.metaphorpsum;
      case 'I':
        return this.itsthisforthat;
      default:
        return this.metaphorpsum;
    }
  }
}
