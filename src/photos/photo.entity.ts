import { Album } from 'src/album/album.entity';
import { BaseEntity } from 'src/base/base-entity.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, Long, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photo')
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: Long;
  @Column()
  public name: String;
  @Column()
  public link: String;
  @ManyToOne(() => User, (user) => user.photos)
  user: User;
  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;
}
