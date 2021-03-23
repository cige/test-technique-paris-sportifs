import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';
import { BetController } from './bet.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bet])
    ],
    providers: [BetService],
    controllers: [BetController]
})
export class BetModule { }
