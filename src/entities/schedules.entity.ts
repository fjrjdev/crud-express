import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { User } from "./user.entity";
import Property from "./properties.entity";

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Property)
  property: Property;

  constructor() {
    if (!this.date) {
      this.date = moment().format("YYYY/MM/DD");
    }
    if (!this.hour) {
      this.hour = moment().format("HH:MM");
    }
  }
}

export default Schedule;
