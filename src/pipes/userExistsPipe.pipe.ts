import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}
  async transform(value: number) {
    const user = await this.usersService.findById(value);
    if (!user) {
      throw new NotFoundException(`User with ID ${value} not found`);
    }
    return value;
  }
}
