import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(roles);
    if (!roles) return true;
    const { user } = context.switchToHttp().getRequest<Request>();
    if (!user || !user.roles) return false;
    return roles.some((role: string) => user.roles.includes(role));
  }
}
// i need when user required both roles for get this api
// What is Reflector?
//
