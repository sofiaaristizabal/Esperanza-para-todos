import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedoreDto } from './create-proveedore.dto';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class UpdateProveedoreDto extends PartialType(CreateProveedoreDto) {


    @IsArray()
    @ArrayNotEmpty()
    categories:string[];

    @IsArray()
    @ArrayNotEmpty()
    countries:string[];
}
