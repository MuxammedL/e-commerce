import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { LoginDto } from "./login.dto";
import { ROLES } from "src/enum/common/user-roles.enum";

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: "Name can not be null" })
  @IsString({ message: "Name should be string" })
  name: string;

  @IsEnum(ROLES, {
    each: true,
    message: "Each role must be either 'user' or 'admin'",
  })
  roles: ROLES[];
}
