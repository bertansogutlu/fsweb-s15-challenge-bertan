// testleri buraya yazın
const db = require('../data/dbConfig');
const supertest = require('supertest');
const server = require('./server');

beforeAll(async()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async()=>{
  await db.seed.run()
})

test('[0] Testler çalışır durumda]', () => {
  expect(true).toBe(true)
})

describe('Server test',()=>{
  test("[1] Register payload dolu başarılı sonuç",async ()=>{
    let sampleUser = {"username":"veysel12",password:"1234","rolename":"admin"};
    const res = await supertest(server).post("/api/auth/register").send(sampleUser);
    expect(res.status).toBe(201);
    expect(res.body.user_id).toBeGreaterThan(0)
  })
})