import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bet {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ type: 'int' })
    status: number

    @Column({ type: 'int8' })
    user_id: number

    @Column({ type: 'int8' })
    selection_id: number

    @Column({ type: 'real' })
    odd: number

    @Column({ type: 'int8' })
    stake: number
}