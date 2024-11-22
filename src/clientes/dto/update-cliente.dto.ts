import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsArray, IsString } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @IsString()
    bloodType:string;

    @IsArray()
    HLA:string[];
}
