import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, BeforeInsert } from "typeorm";
import { Organo } from "src/organos/entities/organo.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Proveedor extends User{

    @Column('text')
    contactPerson:string;

    @Column('text', { array: true })
    categories: string[];

    @Column('text', { array: true })
    countries: string[];

    @ManyToOne(()=>User, (user)=>user.proveedores)
    user:User;

    @OneToMany(()=>Organo, (organo)=>organo.proveedor)
    organos:Organo[];

    @BeforeInsert()
    toLowerCase(){
        this.countries = this.countries.map(country => country.toLowerCase());
    }



}
