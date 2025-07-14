import { Roles } from "src/enum/common/user-toles";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ type: "enum", enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];
}
