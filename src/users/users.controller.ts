import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

interface RESULT{status:string, data?:User, message?:string}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result:RESULT = await this.usersService.create(createUserDto);
    if(result.status === "success"){
      return res.json(result)
    }else {
      return res.status(400).json(result);
    }
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.usersService.remove(+id);
  }
}
