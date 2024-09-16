import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { OrganosModule } from 'src/organos/organos.module';
import { OrganosService } from 'src/organos/organos.service';
import { Organo } from 'src/organos/entities/organo.entity';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, UsersService, OrganosService],
  imports:[TypeOrmModule.forFeature([Cliente, User, Organo]), UsersModule, OrganosModule]
})
export class ClientesModule {}
