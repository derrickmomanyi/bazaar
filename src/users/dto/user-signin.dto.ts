import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class userSignInDto{
    @IsEmail({}, { message: "Please provide a valid email" })
    @IsNotEmpty({ message: "Email can not be null" })
    email: string;

    @MinLength(5, { message: "Password should be more than n 5 characters" })
    password: string;
}