import { Column, DataType, Model, Table } from "npm:sequelize-typescript";

@Table({
  tableName: "category",
})
export class Category extends Model {
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name!: string;
}
