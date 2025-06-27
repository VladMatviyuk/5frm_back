import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionsModule } from './sections/sections.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://admin:secret@localhost:27017/test?authSource=admin`,
    ),
    SectionsModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
