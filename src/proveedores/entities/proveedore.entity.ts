import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, BeforeInsert, JoinColumn, OneToOne } from "typeorm";
import { Organo } from "src/organos/entities/organo.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Proveedor extends User{

    @Column('text')
    contactPerson:string;

    @Column('text', { array: true, nullable:true })
    categories: string[];

    @Column('text', { array: true, nullable:true  })
    countries: string[];

    @Column('text', { nullable: true})
    type: string;

    @OneToMany(()=>Organo, (organo)=>organo.proveedor)
    organos:Organo[];

}
