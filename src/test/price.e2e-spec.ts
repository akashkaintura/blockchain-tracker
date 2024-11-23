import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Price Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/price/history (GET)', () => {
    return request(app.getHttpServer())
      .get('/price/history?chain=ethereum')
      .expect(200)
      .expect((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });
});
