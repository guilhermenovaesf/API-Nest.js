import { CreateCourseDto } from './create-course.dto';
import { PartialType } from '@nestjs/mapped-types';
//faz o mesmo
export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  // @IsString()
  // readonly name?: string; // ? : propriedades opcionais, ou seja, posso alterar ou não!!
  // @IsString()
  // readonly description?: string;
  // @IsString({ each: true })
  // readonly tags?: string[];
}
//AINDA NÃO ACEITA MODIFICAR SÓ UM PARÂMETRO
