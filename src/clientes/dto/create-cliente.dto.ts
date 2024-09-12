import { IsString, IsNotEmpty, MinLength, IsEmail, IsArray, ArrayNotEmpty,IsDate, MinDate, MaxDate, IsDateString } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateClienteDto extends CreateUserDto{
 
    @IsDateString()
    @IsNotEmpty()
    dateOfBirth:string;

    @IsString()
    bloodType:string;

    @IsArray()
    HLA:string[];

    
    @IsString()
    country:string;

}
