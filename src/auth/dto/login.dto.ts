import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
  @Transform(({ value }: { value: string | undefined }) =>
    value?.trim()?.toLowerCase()
  )
  @IsNotEmpty({ message: "Email can not be null" })
  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;

  @IsNotEmpty({ message: "Password can not be null" })
  @MinLength(6, { message: "Password must be at least 8 characters" })
  @MaxLength(32, { message: "Password must not exceed 32 characters" })
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password too weak. Must include upper, lower, number and special char",
  })
  password: string;
}
