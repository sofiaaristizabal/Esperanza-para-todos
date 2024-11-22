import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';
import { Organo } from './entities/organo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';

@Injectable()
export class OrganosService {

  constructor(@InjectRepository(Organo)
   private readonly organoRepository: Repository<Organo>,
   @InjectRepository(Proveedor)
   private readonly proveedorRepository: Repository<Proveedor>
   )
   {}  

  async create(createOrganoDto: CreateOrganoDto) {

    try{

      const {proveedorId, ...organoData} = createOrganoDto;

      const proveedor = await this.proveedorRepository.findOneBy({id:proveedorId});

      if(!proveedor){
        throw new NotFoundException(`Proveedor con ID ${proveedorId} no encontrado`);
      }

      const organo = this.organoRepository.create({...organoData, proveedor});
   
    return  await this.organoRepository.save(organo);

    } catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.organoRepository.find({relations:['proveedor']});
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
