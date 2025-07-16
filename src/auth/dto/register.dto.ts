import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { LoginDto } from "./login.dto";
import { Roles } from "src/enum/common/user-toles";

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: "Name can not be null" })
  @IsString({ message: "Name should be string" })
  name: string;

  @IsEnum(Roles, {
    each: true,
    message: "Each role must be either 'user' or 'admin'",
  })
  roles: Roles[];
}
