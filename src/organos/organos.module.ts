import { Module } from '@nestjs/common';
import { OrganosService } from './organos.service';
import { OrganosController } from './organos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organo } from './entities/organo.entity';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [OrganosController],
  providers: [OrganosService, ProveedoresService, UsersService],
  imports: [TypeOrmModule.forFeature([Organo, Proveedor, User]), ProveedoresModule, UsersModule],
  exports:[]
})
export class OrganosModule {}
