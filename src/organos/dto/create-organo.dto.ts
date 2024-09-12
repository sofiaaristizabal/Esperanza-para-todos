import { IsString,  IsNotEmpty, MinLength, IsEmail, IsArray, ArrayNotEmpty,IsDate, MinDate, MaxDate } from "class-validator";

export class CreateOrganoDto {

    @IsString()
    type:string;

    @IsString()
    donorInformation:string;

    @IsString()
    bloodType:string;

    @IsArray()
    HLA:string[];

}
