import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert } from "typeorm";
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Proveedor } from "src/proveedores/entities/proveedore.entity";

@Entity()
export class Organo {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    type:string;

    @Column('text')
    donorInformation:string;

    @Column('text')
    bloodType: string;

    @Column('text')
    name: string;

    @Column()
    price:string;

    @Column('text', { array: true })
    HLA: string[]; 

    @Column('text', {nullable:true})
    isAvailable:string;

    @Column('text')
    isGood: string; 

    @ManyToOne(()=>Proveedor, (proveedor)=>proveedor.organos)
    proveedor:Proveedor;

    @ManyToOne(()=>Cliente, (cliente)=>cliente.organos)
    cliente:Cliente; 

    @BeforeInsert()
    toUpperCase(){
        this.bloodType = this.bloodType.toUpperCase();

    }

}
