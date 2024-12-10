import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Hello {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    message!: string;
}