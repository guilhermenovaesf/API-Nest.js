import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }
  @Post()
  create(@Body() createCurseDto: CreateCourseDto) {
    return this.coursesService.create(createCurseDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCurseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCurseDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
