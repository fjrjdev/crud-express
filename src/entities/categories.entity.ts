import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import Property from "./properties.entity";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Property, (properties) => properties.category)
  properties: Property[];
}

export default Category;
