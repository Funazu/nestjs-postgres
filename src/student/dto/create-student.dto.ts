import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsNumber()
    @IsNotEmpty()
    classId: number;
}
