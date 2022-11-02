import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid, v4 } from "uuid";

import Address from "./addresses.entity";
import Category from "./categories.entity";
import Schedule from "./schedules.entity";

@Entity("properties")
class Property {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  @OneToMany(() => Schedule, (Schedule) => Schedule.property)
  schedules: Schedule[];
}

export default Property;
