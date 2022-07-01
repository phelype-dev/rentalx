import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

let connection: Connection;

describe('Create category controllers', async () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuid;
    const password = await hash('admin', 8);
    await connection.query(`
    INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at)
    VALUES (
      '${id}',
      'admin',
      'admin@rentx.com.br',
      '${password}',
      true,
      '0123456789',
      NOW()
    )
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });
    const { token } = responseToken.body;
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Super Test',
        description: 'Categoru SuperTest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(201);
  });

  it('should be able to create new category with the name existing', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });
    const { token } = responseToken.body;
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Super Test',
        description: 'Categoru SuperTest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(400);
  });
});
