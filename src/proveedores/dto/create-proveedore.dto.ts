import { IsString, IsNotEmpty, MinLength, IsEmail, IsArray, ArrayNotEmpty, Matches } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateProveedoreDto extends CreateUserDto{

    @IsString()
    @MinLength(1)
    @Matches(/^jaime s\.v$/i,
         { message: 'acces denied' })
    contactPerson:string;

    @IsString()
    type: string = 'Proveedor';

}
