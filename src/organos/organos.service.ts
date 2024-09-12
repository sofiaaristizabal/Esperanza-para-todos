import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';
import { Organo } from './entities/organo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';


@Injectable()
export class OrganosService {

  constructor(@InjectRepository(Organo)
   private readonly organoRepository: Repository<Organo>
   )
   {}  

  async create(createOrganoDto: CreateOrganoDto) {

    const organo = this.organoRepository.create(createOrganoDto);
    await this.organoRepository.save(organo)
    return organo;
  }

  async findAll() {
    const organos = await this.organoRepository.find({});
    return organos;
  }

  async findOne(id: string) {
    const organo = await this.organoRepository.findOneBy({id:id})
    if(!organo){
      throw new NotFoundException(`the organ with id #${id} was not found `)
    }
    return organo;
  }

  async update(id: string, updateOrganoDto: UpdateOrganoDto) {

    const organo = await this.organoRepository.preload({id:id, ...updateOrganoDto})
    if(!organo){
      throw new NotFoundException(`the organ with id #${id} was not found `)
    }
    return organo;
  }

  async remove(id: string) {

    const organo = await this.organoRepository.delete({id:id});
    return organo;
  }
}
