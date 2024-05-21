import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Url {
    @PrimaryGeneratedColumn({name: 'url_id'})
    id: number

    @Column()
    title: string

    @ManyToOne(() => User, (user) => user.urls)
    @JoinColumn({name: 'user_id'})
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}