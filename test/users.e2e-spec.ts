import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection, QueryRunner } from 'typeorm';
import { AppModule } from '../src/app.module';

describe('UserController E2E ', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dbConnect = moduleFixture.get(Connection);
    queryRunner = dbConnect.createQueryRunner('master');
  });
  beforeEach(async () => {
    await queryRunner.startTransaction();
  });
  afterEach(async () => {
    await queryRunner.rollbackTransaction();
  });
  // it('CreateUser ', () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/signup')
  //     .send({
  //       email: 'asdfki@gmail.com',
  //       password: '123321',
  //     })
  //     .expect(201);
  // });
  it('Get User ', () => {
    return request(app.getHttpServer()).get('/user').expect(200);
  });
  it('Get Photo By User ', () => {
    return request(app.getHttpServer()).get('/user?email=lasdfki@gmail.com').expect(200);
  });
  it('Login Tetst ', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'asdfki@gmail.com',
        password: '123321',
      })
      .expect(200);
  });
});
