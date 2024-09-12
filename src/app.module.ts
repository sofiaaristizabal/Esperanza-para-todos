import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ClientesModule } from './clientes/clientes.module';
import { OrganosModule } from './organos/organos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ ConfigModule.forRoot(), 
  TypeOrmModule.forRoot({

    type:'postgres',
    host: process.env.DB_HOST,
    port:+process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities:true,
    synchronize:true
  })
  , ProveedoresModule, ClientesModule, OrganosModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
