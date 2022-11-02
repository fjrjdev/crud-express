import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;
}

export default Address;
