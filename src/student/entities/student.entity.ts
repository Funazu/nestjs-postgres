import { Class } from "src/class/entities/class.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '255'})
    name: string;

    @Column({ type: 'varchar', length: '255' })
    gender: string;

    @Column({ type: 'integer'})
    age: number;

    @ManyToOne(() => Class, classEntity => classEntity.students, { eager: true })
    class: Class;
}
