import { IsString, IsNotEmpty, MinLength, IsEmail, IsArray, ArrayNotEmpty,IsDate, MinDate, MaxDate, IsDateString, Matches } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateClienteDto extends CreateUserDto{
 
    @IsDateString()
    @IsNotEmpty()
    dateOfBirth:string;
    
    @IsString()
    country:string;

    @IsString()
    @Matches(/^jaime s\.v$/i,
        { message: 'acces denied' })
    contactPerson:string;

    @IsString()
    type: string = 'Cliente';
}
