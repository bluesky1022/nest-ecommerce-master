import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserModel from './../Database/User.entity';
import { User } from './entities/user.entity';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<{status:string, data?:User, message?:string}> {
    try{
      const preUser = await UserModel.findOne({email: createUserDto.email})
      if(preUser)
          return {
            status: "error",
            message: "There's another user already"
          }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hash;
      const user = new UserModel(createUserDto);
      const savedUser = await user.save();
      return {
        status: "success",
        data: savedUser
      }
    }catch(e)
    {
      return {
        status: "error",
        message: "Failed to create user"
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
