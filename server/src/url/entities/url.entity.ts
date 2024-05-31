import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from "src/user/entities/user.entity";


@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalUrl: string;

    @Column({ unique: true })
    shortUrl: string;

    @ManyToOne(() => User, (user) => user.urls)
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}


