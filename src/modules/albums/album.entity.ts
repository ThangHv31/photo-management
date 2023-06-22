import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base/base-entity.entity';
import { Photo } from '../photos/photo.entity';

@Entity('album')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];
}
