import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/bet (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/bet')
      .query({ selection_id: '1234', odd: '1.8', stake: '500' })
      .set('Authorization', '1234')
      .expect(201)
      .expect(
        {
          "id": 1,
          "status": 0,
          "user_id": 1234,
          "selection_id": 1234,
          "odd": 1.8,
          "stake": 500
        }
      );
  })

  it('/api/v1/bet (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/bet')
      .query({ count: '2' })
      .set('Authorization', '1234')
      .expect(200)
      .expect([
        {
          "id": 1,
          "status": 0,
          "user_id": 1234,
          "selection_id": 1234,
          "odd": 1.8,
          "stake": 500
        }
      ]);
  });

  it('/api/v1/bet (PUT)', () => {
    return request(app.getHttpServer())
      .put('/api/v1/bet')
      .query({ selection_id: '1234', result: 1 })
      .expect(200)
      .expect('true');
  })
});
