import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreordersModule } from './preorders/preorders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.STOCK_CHECKER_DATABASE_HOST,
      port: 5432,
      username: process.env.STOCK_CHECKER_DATABASE_USERNAME,
      password: process.env.STOCK_CHECKER_DATABASE_PASSWORD,
      database: process.env.STOCK_CHECKER_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    PreordersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
