import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(id);
  }

  @Post('relocalizacion')
  async relocalizacion(
    @Body('id') id: string,
    @Body('insecureCountries') insecureCountries: string[],
    @Body('secureCountries') secureCountries: string[],
  ) {
    const updatedCountry = await this.clientesService.relocalizacion(id, insecureCountries, secureCountries);
    return { updatedCountry };
  }

  @Post('Comprar')
  comprarOrgano(@Body('id') id:string, @Body('organoId') organoId:string){
    return this.clientesService.comprarOrgano(id, organoId)
  }
}
