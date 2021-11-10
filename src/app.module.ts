import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'flavinha99',
      database: 'nest',
      autoLoadEntities: true,
      synchronize: true, //NUNCA utilizar em produção, ele não reflete o estado anterior e faz as alterações, ele recria o banco em cada atualização, solução = migrations
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
