import { BetService } from './bet.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BetController } from './bet.controller';
import { Bet } from './bet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

// Mock for database ORM
export const mockBetRepository = jest.fn();

describe('BetController', () => {
  let controller: BetController;
  let service: BetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetController],
      providers: [{ provide: getRepositoryToken(Bet), useClass: mockBetRepository }, BetService]
    }).compile();

    controller = module.get<BetController>(BetController);
    service = module.get<BetService>(BetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('postBet', () => {
    it('must reject calls when parameters are missing', () => {
      expect(() => controller.postBet(undefined)).toThrow(UnauthorizedException)
      expect(() => controller.postBet("1234")).toThrow(BadRequestException)
    })

    it('must parse query parameters and call the appropriate service method', async () => {
      const mockResult: Bet = {
        id: 1234,
        status: 0,
        user_id: 1234,
        selection_id: 1234,
        odd: 1.8,
        stake: 500
      }
      const spy = jest.spyOn(service, 'createBet').mockImplementation(async () => mockResult);

      const result = await controller.postBet('1234', '1234', '1.8', '500')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ odd: 1.8, selection_id: 1234, stake: 500, user_id: 1234 })
      expect(result).toBe(mockResult)

      spy.mockClear()
    })
  })

  describe('getBets', () => {
    it('must reject calls when parameters are missing', () => {
      expect(() => controller.getBets()).toThrow(UnauthorizedException)
    })

    it('must parse query parameters and call the appropriate service method', async () => {
      const mockResult: Bet[] = [{
        id: 1234,
        status: 0,
        user_id: 1234,
        selection_id: 1234,
        odd: 1.8,
        stake: 500
      }]
      const spy = jest.spyOn(service, 'getBets').mockImplementation(async () => mockResult);

      const result = await controller.getBets('1234', '10')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ count: 10, user_id: 1234 })
      expect(result).toBe(mockResult)
    })

    it('must apply default count parameter when missing', async () => {
      const mockResult: Bet[] = [{
        id: 1234,
        status: 0,
        user_id: 1234,
        selection_id: 1234,
        odd: 1.8,
        stake: 500
      }]
      const spy = jest.spyOn(service, 'getBets').mockImplementation(async () => mockResult);

      const result = await controller.getBets('1234')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ count: 5, user_id: 1234 })
      expect(result).toBe(mockResult)
    })
  })

  describe('settleBets', () => {

    it('must parse query parameters and call the appropriate service method', async () => {
      const spy = jest.spyOn(service, 'settleBet').mockImplementation(async () => null);

      const result = await controller.settleBet('1234', '1')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ selection_id: 1234, result: 1 })
      expect(result).toBe(true)

      spy.mockClear()
    })

    it('must return false when an error occurs when calling the service', async () => {
      const spy = jest.spyOn(service, 'settleBet').mockImplementation(async () => { throw new Error() });

      const result = await controller.settleBet('1234', '10')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(result).toBe(false)
    })
  })
});
