import { BetService } from './bet.service';
import { Controller, Get, Post, Query, Headers, UnauthorizedException, Put, BadRequestException } from '@nestjs/common';
import { Bet } from './bet.entity';

@Controller('api/v1/bet')
export class BetController {

    constructor(private readonly betService: BetService) { }

    @Post()
    postBet(@Headers('Authorization') user_id?: string,
        @Query('selection_id') selection_id?: string,
        @Query('odd') odd?: string,
        @Query('stake') stake?: string): Promise<Bet> {
        if (!user_id)
            throw new UnauthorizedException()

        if (selection_id === undefined
            || odd === undefined
            || stake === undefined)
            throw new BadRequestException('You must provide these query parameters: selection_id, odd, stake.')

        return this.betService.createBet({
            user_id: parseInt(user_id),
            selection_id: parseInt(selection_id),
            odd: parseFloat(odd),
            stake: parseInt(stake),
        })
    }

    @Get()
    getBets(@Headers('Authorization') user_id?: string, @Query('count') count?: string): Promise<Bet[]> {
        if (!user_id)
            throw new UnauthorizedException()

        const count_or_default = (count === undefined) ? 5 : parseInt(count)

        return this.betService.getBets({
            user_id: parseInt(user_id),
            count: count_or_default
        })
    }

    @Put()
    async settleBet(@Query('selection_id') selection_id?: string, @Query('result') result?: string): Promise<boolean> {

        if (result === undefined || selection_id === undefined)
            throw new BadRequestException('You must provide both result and selection_id query parameters')
        try {
            await this.betService.settleBet({ selection_id: parseInt(selection_id), result: parseInt(result) })
            return true
        } catch (error) {
            return false
        }
    }

}
