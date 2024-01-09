import { Column, DataType, Model, Table } from "npm:sequelize-typescript";
import { v1 as uuidv1 } from "uuid";
import { Category } from "./Category.ts";
import { User } from "./User.ts";

@Table({
  tableName: "group",
})
export class Group extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string | number[];

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The group must have a name",
      },
    },
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Type a description",
      },
    },
  })
  description!: string;

  @Column({
    type: DataType.STRING(200),
  })
  url!: string;

  @Column({
    type: DataType.STRING(100),
  })
  image!: string;

  constructor(values?: { id: string } | undefined, options?: any) {
    super(values, options);
    if (!values || !values.id) {
      this.id = uuidv1.generate();
    }
  }
}
