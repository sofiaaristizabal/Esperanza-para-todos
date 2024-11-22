import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedor } from './entities/proveedore.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Organo } from 'src/organos/entities/organo.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProveedoresService {

  constructor(@InjectRepository(Proveedor)
  private readonly proveedorRepository: Repository<Proveedor>,
  private readonly userService:UsersService
  ){}

  async create(createProveedoreDto: CreateProveedoreDto) {

    const userData = {
      email: createProveedoreDto.email,
      password: createProveedoreDto.password,
      fullName: createProveedoreDto.fullName,
      phoneNumber: createProveedoreDto.phoneNumber,
      roles: 'Proveedor'
    };
    const user = await this.userService.create(userData);
    
    const proveedorData: Partial<Proveedor> = {
      email:createProveedoreDto.email,
      password: createProveedoreDto.password,
      fullName: createProveedoreDto.fullName,
      phoneNumber:createProveedoreDto.phoneNumber,
      roles: 'proveedor',
      type: 'proveedor',
      contactPerson: createProveedoreDto.contactPerson,
    };
    
    const proveedor = this.proveedorRepository.create(proveedorData);
    await this.proveedorRepository.save(proveedor)
    const {email, fullName, contactPerson, categories, countries, organos} = proveedor;
    return proveedor;
  }

  async findAll() {

    const proveedores = await this.proveedorRepository.find({});
    return proveedores;
  }

  async findOne(id: string) {

    const proveedor = await this.proveedorRepository.findOne({where:{id}, relations:['user']});

    if(!proveedor){
      throw new NotFoundException(`the proveedor with id #${id} was not found `)
    }
    const {email, fullName, contactPerson, categories, countries, organos} = proveedor;
    return proveedor;
  }

  async update(id: string, updateProveedoreDto: UpdateProveedoreDto) {
    
    await this.userService.update(id,updateProveedoreDto)
    const proveedor = this.proveedorRepository.preload({id:id,...updateProveedoreDto});
    if(!proveedor){
      throw new NotFoundException(`the proveedor with id #${id} was not found `)
    }
    
    return proveedor;
  }

  async remove(id: string) {
    await this.userService.remove(id);
    const proveedor = await this.proveedorRepository.delete({id:id});
    return proveedor;
  }
}
