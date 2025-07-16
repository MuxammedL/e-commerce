import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UserExistsPipe } from "src/pipes/userExistsPipe.pipe";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
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
