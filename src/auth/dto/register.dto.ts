import { IsNotEmpty, IsString } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: "Name can not be null" })
  @IsString({ message: "Name should be string" })
  name: string;
}
