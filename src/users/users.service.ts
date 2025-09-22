import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserModel from './../Database/User.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<{status:string, data?:User, message?:string}> {
    try{
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
