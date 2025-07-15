import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
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
  validate(payload: JwtPayload) {
    const user = this.usersService.findOne(payload.sub);
    return {
      id: payload.sub,
      email: payload.email,
    //   name: user.name,
    };
  }
}

interface JwtPayload {
  sub: number;
  email: string;
}
