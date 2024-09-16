import { IsString,  IsNotEmpty, MinLength, IsEmail, IsArray, ArrayNotEmpty,IsDate, MinDate, MaxDate, isBoolean, IsBoolean, IsBooleanString} from "class-validator";

export class CreateOrganoDto {

    @IsString()
    type:string;

    @IsString()
    donorInformation:string;

    @IsString()
    bloodType:string;

    @IsArray()
    HLA:string[];

    @IsBooleanString()
    isAvailable:string;

    @IsBooleanString()
    isGood:string;

}
