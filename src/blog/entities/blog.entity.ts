import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  m_id: number;

  @Column()
  m_topic: string;

  @Column()
  m_title: string;

  @Column()
  m_content: string;

  @Column()
  m_belong_to: number;

  @Column()
  m_created: string;

  @Column()
  m_modified: string;
}