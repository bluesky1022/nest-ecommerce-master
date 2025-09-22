import { MinLength, IsEmail, IsNotEmpty, IsIn} from 'class-validator';
import {Transform} from 'class-transformer';
export class CreateUserDto {
    @MinLength(5, {
        message: 'name should be longer than 5 characters'
    }) 
    @IsNotEmpty({
        message: 'name field is required'
    })
    name:string;
    @IsEmail({},{
        message: 'email is invalid'
    }) 
    @IsNotEmpty()
    email: string;
    @MinLength(8, {
        message:'password should be longer than 8 characters'
    }) 
    @IsNotEmpty({
        message: 'password field is required'
    })
    password:string;
    @Transform(({value}) => value || 'customer')
    @IsIn(['admin', 'customer'],{
        message:'role must me either admin or customer'
    })
    role:string = 'customer';
}
