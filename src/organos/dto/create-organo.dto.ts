import { IsString,  IsNotEmpty, MinLength, IsEmail, IsArray, ArrayNotEmpty,IsDate, MinDate, MaxDate, isBoolean, IsBoolean, IsBooleanString, IsDateString, IsNumberString} from "class-validator";

export class CreateOrganoDto {

    @IsString()
    type:string;

    @IsString()
    donorInformation:string;

    @IsString()
    bloodType:string;

    @IsString()
    name:string;

    @IsArray()
    HLA:string[];

    @IsDateString()
    isGood:string;

    @IsNumberString()
    price:string;

    @IsString()
    @IsNotEmpty()
    proveedorId:string; 

}
