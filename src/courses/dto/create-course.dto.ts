import { IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  readonly name: string; //readyonly apenas para segurança
  @IsString()
  readonly description: string;
  @IsString({ each: true }) //para cada dado tem que ser string
  readonly tags: string[];
}
//Se não cumprir os requisitos acima, ele retorna 400 e uma mensagem específica
//Ou seja, não preciso criar uma classe para tratar esses erros!
