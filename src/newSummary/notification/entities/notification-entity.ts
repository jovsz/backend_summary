
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/index.entities';

@Entity('notifications')
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: false})
  message: string

  @Column({type: 'varchar'})
  type: string

  @Column({type: 'varchar'})
  relatedArea: string

  @ManyToMany(() => User)
  @JoinTable()
  user_id: User[]

  @Column({type: 'varchar', nullable:true})
  currentTime: string;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp'})
  updateAt:Date;

  @Column({type: 'boolean', default: false})
  view: boolean;

}