import { Column, CreateDateColumn } from 'typeorm';
import { Status } from './status.enum';

export class BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: Status, default: Status.Active })
  status: Status;
}
