import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
    @InjectRepository(Class) private readonly classRepository: Repository<Class>
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const classEntity = await this.classRepository.findOne({ where: { id: createStudentDto.classId } });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${createStudentDto.classId} not found!`);
    }

    const student = this.studentRepository.create({
      ...createStudentDto, class: classEntity,
    })

    return this.studentRepository.save(student);
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['class'] });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id }, relations: ['class'] });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    if (updateStudentDto.classId) {
      const classEntity = await this.classRepository.findOne({ where: { id: updateStudentDto.classId } });
      if (!classEntity) {
        throw new NotFoundException(`Class with id ${updateStudentDto.classId} not found`);
      }
      student.class = classEntity;
    }

    // Perbarui properti entitas Student
    this.studentRepository.merge(student, updateStudentDto);
    return this.studentRepository.save(student);
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
  }
}
