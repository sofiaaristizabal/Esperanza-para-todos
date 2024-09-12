import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { UpdateOrganoDto } from 'src/organos/dto/update-organo.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ClientesService {

  constructor(@InjectRepository( Cliente)
  private readonly clienteRepository: Repository<Cliente>,
  private readonly usersService: UsersService 
  )
  {}

  async create(createClienteDto: CreateClienteDto) {
    const user = await this.usersService.create(createClienteDto); 
    const cliente = this.clienteRepository.create({ ...createClienteDto, user});  
    await this.clienteRepository.save(cliente);
    const {fullName, email, dateOfBirth, bloodType, HLA, country, organos} = cliente;
    return cliente;
  }

  async findAll() {

    const clientes = await this.clienteRepository.find({});
    return clientes;
  }

  async findOne(id: string) {

    const cliente = await this.clienteRepository.findOne({where:{id}, relations: ['user']});
    
    if(!cliente){
      throw new NotFoundException(`the client with id #${id} was not found `)
    }

    const {fullName, email, dateOfBirth, bloodType, HLA, country, organos} = cliente;
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    await this.usersService.update(id ,updateClienteDto)
    const cliente = await this.clienteRepository.preload({id:id,...updateClienteDto});
    if(!cliente){
      throw new NotFoundException(`the client with id #${id} was not found `)
    }
    
    this.clienteRepository.save(cliente)
    const {fullName, email, dateOfBirth, bloodType, HLA, country, organos} = cliente;
    return cliente;
  }

  async remove(id: string) {

    await this.usersService.remove(id);
    const cliente = this.clienteRepository.delete({id:id});
    return cliente;
  }

  async relocalizacion(id:string, insecureCountries:string[], secureCountries:string[]){
  
    const cliente = this.findOne(id); 
    let flag = false; 
    let i = 0;
    while(flag=false && i<insecureCountries.length){
     
      if
    }
     return
  } 
}

