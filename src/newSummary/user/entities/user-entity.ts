
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { status } from '../enum/status-enum';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column({ default: true })
  active: boolean;

  @Column({
      type: 'enum',
      enum: status,
      default: status.OFFLINE
  })
  status?: string;

  @Column('simple-array', { nullable: true, default: [] })
    sockets: string[];

  @CreateDateColumn({ type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp'})
  updateAt:Date;

}