import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganosService } from './organos.service';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';


@Controller('organos')
export class OrganosController {
  constructor(private readonly organosService: OrganosService) {}

  @Post()
  create(@Body() createOrganoDto: CreateOrganoDto) {
    return this.organosService.create(createOrganoDto);
  }

  @Get()
  findAll() {
    return this.organosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganoDto: UpdateOrganoDto) {
    return this.organosService.update(id, updateOrganoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organosService.remove(id);
  }
}
