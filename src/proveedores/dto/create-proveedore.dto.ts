import { IsString, IsNotEmpty, MinLength, IsEmail, IsArray, ArrayNotEmpty } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateProveedoreDto extends CreateUserDto{

    @IsString()
    @MinLength(1)
    contactPerson:string;

    @IsArray()
    @ArrayNotEmpty()
    categories:string[];

    @IsArray()
    @ArrayNotEmpty()
    countries:string[];





}
