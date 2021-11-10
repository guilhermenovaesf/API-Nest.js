import { TagEntity } from './entities/tag.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>, //tipo de informação que esse repositório irá manipular(Course)
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  findAll() {
    return this.coursesRepository.find({
      relations: ['tags'], //mesmo nome da entidade que eu quero no curse entity
    }); //todos os registros
  }

  findOne(id: string) {
    const course = this.coursesRepository.findOne(id, {
      relations: ['tags'],
    });
    if (!course) {
      throw new NotFoundException(`Course ID ${id} Not Found`); //metodo específico para página não encontrada
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      //Promise.all() -> só vai retornar depois que todas as promises forem cumpridas
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    ); // vai percorrer uo name de uma tag uma por uma e executa o metodo preloadTagbyName
    const course = this.coursesRepository.create({
      ...createCourseDto,
      tags,
    }); //cria
    return this.coursesRepository.save(course); //salva o que criou no banco (é um método async(retorna uma Promise))
    // o return faz com que o a Promise do save() já seja resolvida
  }
  //coloco como string, pois por padrão as requisições que chegam na URL são strings
  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags && // verifico se realmente foram enviadas tags, se foi continua
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));
    const course = await this.coursesRepository.preload({
      //Preload -> pré carrega o objeto que vou utilizar
      id: +id, //convertendo string em numérico
      ...updateCourseDto, //spread operator (todos os dados do json)
      tags,
    });
    if (!course) {
      throw new NotFoundException(`Course ID ${id} Not Found`);
    }
    return this.coursesRepository.save(course);
  }
  async remove(id: string) {
    const course = await this.coursesRepository.findOne(id);
    if (!course) {
      throw new NotFoundException(`Course ID ${id} Not Found`);
    }
    return this.coursesRepository.remove(course);
  }
  // Metodo para checar se a tag adicionada já está criada no banco de dados, se não estiver, vai criar
  private async preloadTagByName(name: string): Promise<TagEntity> {
    const tag = await this.tagRepository.findOne({ name });
    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
