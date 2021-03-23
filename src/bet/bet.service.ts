import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity'
import { v4 as uuid } from 'uuid'

@Injectable()
export class BetService {
    constructor(
        @InjectRepository(Bet)
        private betRepository: Repository<Bet>,
    ) { }

    /**
     * Create a new bet with status 'OPEN'.
     */
    async createBet(params: CreateBetParams) {
        const bet: Bet = {
            id: undefined, // will be auto-generated by the database
            status: 0,
            ...params,
        }
        return this.betRepository.save(bet)
    }

    /**
     * Return all bets for the provided `user_id`.
     */
    async getBets({ user_id, count }: GetBetsParams) {
        return this.betRepository.find({
            where: { user_id: user_id },
            take: count
        })
    }

    async settleBet({ selection_id, result }: SettleBetParams) {
        this.betRepository.createQueryBuilder().update().set({ status: result }).where({ selection_id }).execute()
    }
}

export interface CreateBetParams {
    user_id: number
    selection_id: number
    odd: number
    stake: number
}

export interface GetBetsParams {
    user_id: number
    count: number
}

export interface SettleBetParams {
    selection_id: number
    result: number
}
