import { Module } from '@nestjs/common';
import { OrganosService } from './organos.service';
import { OrganosController } from './organos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organo } from './entities/organo.entity';

@Module({
  controllers: [OrganosController],
  providers: [OrganosService],
  imports: [TypeOrmModule.forFeature([Organo])]
})
export class OrganosModule {}
