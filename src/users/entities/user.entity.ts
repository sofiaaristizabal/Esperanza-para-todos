import { MinLength } from "class-validator";
import { Entity, Column, TableInheritance, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Cliente } from "src/clientes/entities/cliente.entity";
import { Proveedor } from "src/proveedores/entities/proveedore.entity";

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text', {unique:true})
    @MinLength(4)
    email:string;

    @Column('text')
    @MinLength(8)
    password:string;

    @Column('boolean', {default:true})
    isActive:boolean;

    @Column('text')
    @MinLength(1)
    fullName:string; 

    @Column('text')
    phoneNumber:string;

    @OneToMany(() => Cliente, (cliente) => cliente.user)
    clientes:Cliente[];
    
    @OneToMany(() => Proveedor, (proveedor) => proveedor.user)
    proveedores:Proveedor[];
}
