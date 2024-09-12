import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganoDto } from './create-organo.dto';

export class UpdateOrganoDto extends PartialType(CreateOrganoDto) {}
