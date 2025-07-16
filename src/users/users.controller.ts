import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UserExistsPipe } from "src/pipes/userExistsPipe.pipe";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("admin")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe, UserExistsPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string) {
    return this.usersService.update(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
