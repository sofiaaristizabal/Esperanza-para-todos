import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BeforeInsert} from "typeorm";
import { Organo } from "src/organos/entities/organo.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Cliente extends User{

    @Column()
    dateOfBirth: string;

    @Column('text')
    bloodType:string;

    @Column('text', { array: true })    
    HLA: string[];

    @Column('text')
    country:string;

    @ManyToOne(()=>User, (user)=>user.clientes)
    user:User;
    
    @OneToMany(()=>Organo, (organo)=>organo.cliente)
    organos:Organo[];

    @BeforeInsert()
    toLowerCase(){
        this.country = this.country.toLowerCase();
    }

    @BeforeInsert()
    toUpperCase(){
        this.bloodType = this.bloodType.toUpperCase();

    }
}
