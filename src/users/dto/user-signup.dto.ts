import {  IsNotEmpty, IsString } from "class-validator";
import { userSignInDto } from "./user-signin.dto";

export class UserSignUpDto extends userSignInDto{
    @IsNotEmpty({ message: "Name can not be null" })
    @IsString()
    first_name: string;

    @IsNotEmpty({ message: "Name can not be null" })
    @IsString()
    last_name: string;

    @IsString()
    ip_addrress: string;

}