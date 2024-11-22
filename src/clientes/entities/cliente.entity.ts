import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BeforeInsert, OneToOne, JoinColumn} from "typeorm";
import { Organo } from "src/organos/entities/organo.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Cliente extends User{

    @Column({ nullable: true })
    dateOfBirth: string;

    @Column('text', { nullable: true })
    bloodType:string;

    @Column('text', { array: true, nullable: true })    
    HLA: string[];

    @Column('text', { nullable: true })
    country:string;

    @Column('text')
    contactPerson:string;

    @Column('text', { nullable: true })
    type: string;
    
    @OneToMany(()=>Organo, (organo)=>organo.cliente)
    organos:Organo[];
}
