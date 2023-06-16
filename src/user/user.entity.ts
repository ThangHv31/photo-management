import { Exclude } from 'class-transformer';
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
  @Column({ nullable: true })
  public name: string;
  @Column()
  @Column({ nullable: true })
  public username: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];
}
