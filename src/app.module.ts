import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { ConfigModule } from '@nestjs/config';
import { Class } from './class/entities/class.entity';
import { Student } from './student/entities/student.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.POSTGRES_PORT),
      password: `${process.env.POSTGRES_PASS}`,
      username: `${process.env.POSTGRES_USER}`,
      entities: [Class, Student],
      database: `${process.env.POSTGRES_DATABASE}`,
      synchronize: true,
      logging: true,
    }),
    StudentModule,
    ClassModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
