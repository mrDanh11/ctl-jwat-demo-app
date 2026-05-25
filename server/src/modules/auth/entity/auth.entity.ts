import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// export enum AuthProvider {
//   LOCAL = 'LOCAL',
//   GOOGLE = 'GOOGLE',
// }

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password!: string | null;

  @Column()
  fullName!: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  googleId!: string | null;

  // @Column({
  //   type: 'enum',
  //   enum: AuthProvider,
  //   default: AuthProvider.LOCAL,
  // })
  // provider!: AuthProvider;
}
