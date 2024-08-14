import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(@InjectRepository(Class) private readonly classRepository: Repository<Class>,
  ) { }

  create(createClassDto: CreateClassDto): Promise<Class> {
    const kelas: Class = new Class();
    kelas.name = createClassDto.name;
    return this.classRepository.save(kelas);
  }

  findAll(): Promise<Class[]> {
    return this.classRepository.find();
  }

  findOne(id: number): Promise<Class> {
    return this.classRepository.findOneBy({ id });
  }

  update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
    const kelas: Class = new Class();
    kelas.name = updateClassDto.name;
    kelas.id = id;
    return this.classRepository.save(kelas);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.classRepository.delete(id);
  }
}
