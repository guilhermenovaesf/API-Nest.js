import { TagEntity } from './entities/tag.entity';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, TagEntity])], //definindo todas as minhas entidades
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
