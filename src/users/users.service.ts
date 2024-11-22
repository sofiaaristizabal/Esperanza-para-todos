import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';

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
      const {fullName, email, phoneNumber} = user;
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

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password, roles } = loginUserDto;
      
      // Use a query to check both User and its child entities
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne();
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials')
      }
      // Determine user type
      const {userType, associatedId} = await this.determineUserType(user.id, user.roles);
      const { fullName } = user;
      const jwt = this.jwtService.sign({
        email, 
        fullName, 
        type: userType
      });
      return { 
        user: { 
          fullName, 
          email, 
          type: userType, 
          jwt,
          ... (associatedId && { [`${userType.toLowerCase()}Id`]: associatedId })
        } 
      };
    } catch(err) {
      console.log(err);
      throw new UnauthorizedException(err.detail);
    }
  }
  async determineUserType(userId: string, type: string): Promise<{ userType: string, associatedId?: string }> {
    if (type === 'Proveedor') {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .innerJoin(Proveedor, 'proveedor', 'proveedor.email = user.email')
        .where('user.id = :userId', { userId })
        .select('proveedor.id', 'proveedorId')
        .getRawOne();
  
      if (user) {
        return { userType: 'Proveedor', associatedId: user.proveedorId };
      }
    }
  
    if (type === 'Cliente') {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .innerJoin(Cliente, 'cliente', 'cliente.email = user.email')
        .where('user.id = :userId', { userId })
        .select('cliente.id', 'clienteId')
        .getRawOne();
  
      if (user) {
        return { userType: 'Cliente', associatedId: user.clienteId };
      }
    }
  
    return { userType: 'User' };
  }
  
}
