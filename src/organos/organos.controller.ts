import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganosService } from './organos.service';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/usuario-roles/usuario-roles.guard';
import { getUser } from 'src/users/decorators/getUser.decorator';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';


@Controller('organos')
export class OrganosController {
  constructor(private readonly organosService: OrganosService) {}

  @Post()
  @UseGuards(AuthGuard(), UseRoleGuard)
  create(@Body() createOrganoDto: CreateOrganoDto, @getUser() proveedor: Proveedor) {
    return this.organosService.create(createOrganoDto, proveedor);
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
