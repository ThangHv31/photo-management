import { BaseEntity } from 'src/base/base-entity.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photo_reactions')
export class PhotoReactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  photoId: number;
  @Column()
  liked: boolean;
  @Column({ nullable: true })
  comment: String;
}
