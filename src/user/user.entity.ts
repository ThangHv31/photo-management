import { Album } from 'src/album/album.entity';
import { BaseEntity } from 'src/base/base-entity.entity';
import { Photo } from 'src/photos/photo.entity';
import {
  Column,
  Entity,
  JoinTable,
  Long,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: Long;
  @Column()
  public name: String;
  @Column()
  public username: String;
  @Column()
  public password: String;
  @Column()
  public email: String;
  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];
}
