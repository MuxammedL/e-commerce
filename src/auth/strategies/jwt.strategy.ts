import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Roles } from "src/enum/common/user-toles";
import { UsersService } from "src/users/users.service";
import { Timestamp } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET_KEY")!,
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);
    return {
      id: payload.sub,
      name: user?.name,
      email: payload.email,
      roles: user?.roles,
      createdAt: user?.createdAt,
      updatedAt: user?.updateAt,
    };
  }
}

interface JwtPayload {
  sub: number;
  email: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Roles[];
}
