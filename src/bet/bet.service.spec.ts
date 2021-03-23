import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';

// Mock for database ORM
export const mockBetRepository = jest.fn(() => ({
  save: jest.fn(),
  find: jest.fn()
}));

describe('BetService', () => {
  let service: BetService;
  let repo: Repository<Bet>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: getRepositoryToken(Bet), useClass: mockBetRepository }, BetService],
    }).compile();

    service = module.get<BetService>(BetService);
    repo = module.get<Repository<Bet>>(getRepositoryToken(Bet))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBet', () => {
    it("must call repository's save method'", () => {
      const spy = jest.spyOn(repo, 'save')

      service.createBet({
        user_id: 1234,
        odd: 1.8,
        selection_id: 1234,
        stake: 500
      })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({
        id: undefined,
        status: 0,
        user_id: 1234,
        odd: 1.8,
        selection_id: 1234,
        stake: 500
      })
    })
  })

  describe('getBets', () => {
    it("must call repository's find method'", () => {
      const spy = jest.spyOn(repo, 'find')

      service.getBets({
        user_id: 1234,
        count: 5
      })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({
        where: { user_id: 1234 },
        take: 5
      })
    })
  })
});
