import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { Metaphorpsum } from './DailySentenseServices/Metaphorpsum.service';
import { Itsthisforthat } from './DailySentenseServices/Itsthisforthat.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [Metaphorpsum, Itsthisforthat],
})
export class AppModule {}
