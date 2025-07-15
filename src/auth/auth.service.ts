import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async login(loginDto: LoginDto) {
    const userExists = await this.usersService.findUserByEmail(loginDto.email);
    if (!userExists)
      throw new UnauthorizedException("Invalid email or password!");
    return loginDto;
  }
  async register(registerDto: RegisterDto) {
    const userExists = await this.usersService.findUserByEmail(
      registerDto.email
    );
    if (userExists) throw new BadRequestException("Email is not available");
    const user = await this.usersService.create(registerDto);
    return user;
  }
}
