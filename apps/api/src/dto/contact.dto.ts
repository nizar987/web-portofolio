import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @IsEmail()
  @MaxLength(120)
  email!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  message!: string;
}
