import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>,
  private readonly jwtService: JwtService

  )
  {}


  async create(createUserDto: CreateUserDto) {

    try{
      const user = this.userRepository.create(createUserDto);
      user.password = await bcrypt.hash(user.password, 10);
      await this.userRepository.save(user);
      const {fullName, email, phoneNumber, clientes, proveedores} = user;
      return user;
    } 
    catch(err){
      console.log(err);
      throw new BadRequestException(err.detail);
    }

  }

  async findAll() {

    const users = await this.userRepository.find({});
    return users;
  }

  async findOne(id: string) {

    const user = await this.userRepository.findOneBy({id:id});
    if(!user){
      throw new NotFoundException(`the user with id #${id} was not found `)
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await  this.userRepository.preload({id:id,...updateUserDto});
    if(!user){
      throw new NotFoundException(`the user with id #${id} was not found `)
    }

    this.userRepository.save(user);

    return user;
  }

  async remove(id: string) {

    const user = await this.userRepository.delete({id:id});
    return user;
  }

  async login (loginUserDto: LoginUserDto){

    try {
      const {email, password} = loginUserDto;
      const user = await this.userRepository.findOneBy({email})
      if(!user){
        throw new UnauthorizedException('Invalid credentials');
      }

      const isValid = bcrypt.compareSync(password, user.password);
      if(!isValid){
        throw new UnauthorizedException('Invalid credentials')
      }

      const {fullName} = user;
      const jwt = this.jwtService.sign({email, fullName});
      return {user: {fullName, email, jwt}};
    } catch(err){
      console.log(err);
      throw new UnauthorizedException(err.detail);
    }
  }
}
