import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AuthResponse } from "src/types/auth";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const userExists = await this.usersService.findUserByEmail(loginDto.email);
    if (!userExists)
      throw new UnauthorizedException("Invalid email or password!");
    const IsPasswordMatching = await compare(
      loginDto.password,
      userExists.password
    );
    if (!IsPasswordMatching)
      throw new UnauthorizedException("Invalid email or password!");
    const userWithoutPassword = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      roles: userExists.roles,
      createdAt: userExists.createdAt,
      updateAt: userExists.updateAt,
    };
    const payload = {
      email: loginDto.email,
      sub: userExists.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const userExists = await this.usersService.findUserByEmail(
      registerDto.email
    );
    if (userExists) throw new BadRequestException("Email is not available");
    const user = await this.usersService.create(registerDto);
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
    };
    const payload = {
      email: registerDto.email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}
