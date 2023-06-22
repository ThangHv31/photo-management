import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../albums/album.entity';
import { Photo } from '../photos/photo.entity';
import { BaseEntity } from '../base/base-entity.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public name: string;

  @Column()
  @Column({ nullable: true })
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: false, unique: true })
  public email: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];
}
