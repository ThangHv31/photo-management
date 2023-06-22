import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../albums/album.entity';
import { BaseEntity } from '../base/base-entity.entity';
import { User } from '../users/user.entity';

@Entity('photo')
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public link: string;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;
}
