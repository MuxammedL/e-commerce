import "express";
import { Roles } from "src/enum/common/user-roles.enum";
import { User as UserEntity } from "src/users/entities/user.entity";

declare global {
  namespace Express {
    interface User {
      roles: Roles[];
    }
    interface Request {
      user?: UserEntity;
    }
  }
}
