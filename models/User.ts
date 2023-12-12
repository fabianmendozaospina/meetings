import {
  // BeforeCreate,
  Column,
  DataType,
  Model,
  Table,
} from "npm:sequelize-typescript";

// import * as bcrypt from "bcrypt";

@Table({
  tableName: "user",
})
export class User extends Model {
  // @Column({
  //     type: DataType.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true
  // })
  // id!:number

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(60),
  })
  image!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Type a valid email",
      },
    },
    unique: {
      name: "name",
      msg: "User already registered",
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Password cannot be empty",
      },
    },
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  active!: boolean;

  @Column({
    type: DataType.STRING,
  })
  tokenPassword!: string;

  @Column({
    type: DataType.DATE,
  })
  tokenExpiration!: Date;

  // @BeforeCreate
  // static async beforeCreate(instance: User, name: string) {
  //   // Encript the password.
  //   if (instance.password) {
  //     instance.password = await User.hashPassword(instance.password);
  //   }
  // }

  // static async hashPassword(password: string) {
  //   const salt = await bcrypt.genSalt(12);
  //   return await bcrypt.hash(password, salt);
  // }

  // async validatePassword(password: string) {
  //   return await bcrypt.compare(password, this.password);
  // }
}
