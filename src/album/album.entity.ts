import { BaseEntity } from 'src/base/base-entity.entity';
import { Photo } from 'src/photos/photo.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  Long,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Long;
  @Column()
  name: String;
  @Column()
  description: String;
  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];
}
