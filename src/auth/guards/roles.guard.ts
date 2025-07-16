import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!roles) return true;
    const { user } = context.switchToHttp().getRequest<Request>();
    const hasAccess = user?.roles
      .map((role: string) => roles.includes(role))
      .find((value: boolean) => value);
    return hasAccess!;
  }
}
