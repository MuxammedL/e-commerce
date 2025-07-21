import { ROLES } from "src/enum/common/user-roles.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: true })
  password: string;
  @Column({ type: "enum", enum: ROLES, array: true, default: [ROLES.USER] })
  roles: ROLES[];
  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updateAt: Timestamp;
}
