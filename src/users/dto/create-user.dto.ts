import { MinLength, IsEmail, IsNotEmpty, IsIn} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty()
    @MinLength(5, {
        message: 'name should be longer than 5 characters'
    }) 
    @ApiProperty()
    @IsNotEmpty({
        message: 'name field is required'
    })
    name:string;
    @ApiProperty()
    @IsEmail({},{
        message: 'email is invalid'
    }) 
    @ApiProperty()
    @IsNotEmpty()
    email: string;
    @ApiProperty()
    @MinLength(8, {
        message:'password should be longer than 8 characters'
    }) 
    @ApiProperty()
    @IsNotEmpty({
        message: 'password field is required'
    })
    password:string;
    @ApiProperty()
    @IsIn(['admin', 'customer'],{
        message:'role must me either admin or customer'
    })
    role:string;
}
