import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  m_id: number;

  @Column({ length: 50 })
  m_name: string;

  @Column()
  m_password: string;

  @Column({ unique: true })
  m_email: string;

  @Column({ default: 'user' })
  m_role: string;
}
