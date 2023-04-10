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
    const user = {"username":"Pasa",password:"1234"};
    const res = await supertest(server).post("/api/auth/register").send(user);
    expect(res.status).toBe(200);
    expect(res.body.password).not.toBeNull();
    expect(res.body).toMatchObject({
      "user_id": 3,
      "username": "Pasa",
  })
  })

  test("[2] Register payload eksik başarılı sonuç",async ()=>{
    const user = {"username":"Pasa"};
    const res = await supertest(server).post("/api/auth/register").send(user);
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ message: "username ve password gereklidir" })
  })

  test("[3] Register payload eksik başarılı sonuç",async ()=>{
    const user = {password:"1234"};
    const res = await supertest(server).post("/api/auth/register").send(user);
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ message: "username ve password gereklidir" })
  })

  test("[3] Register alinmis isim başarılı sonuç",async ()=>{
    const user = {username: 'Defne', password: '1234'};
    const res = await supertest(server).post("/api/auth/register").send(user);
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ message: "username alınmış" })
  })

  test("[4] Login payload dolu başarılı sonuç",async ()=>{
    const user = {username: 'Defne', password: '1234'};
    const res = await supertest(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBeNull();
    expect(res.body).toMatchObject({"message": "welcome, Defne"})
  })

  test("[5] Login payload eksik başarılı sonuç",async ()=>{
    const user = {username: 'Defne'};
    const res = await supertest(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({"message": "username ve password gereklidir"})
  })

  test("[6] Login payload eksik başarılı sonuç",async ()=>{
    const user = {password: '1234'};
    const res = await supertest(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({"message": "username ve password gereklidir"})
  })

  test("[7] Login payload eksik başarılı sonuç",async ()=>{
    const user = {username: 'Def', password: '1234'};
    const res = await supertest(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({"message": "geçersiz kriterler"})
  })

  test("[8] Login payload eksik başarılı sonuç",async ()=>{
    const user = {username: 'Defne', password: '12345'};
    const res = await supertest(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({"message": "geçersiz kriterler"})
  })
  
  test("[9] Login doğru payload başarılı token",async ()=>{
    const user = {username: 'Defne', password: '1234'};
    const res = await supertest(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBeNull();
  })

  test("[10] Bilmeceler tokensiz açılmaz",async ()=>{
    const res = await supertest(server).get("/api/bilmeceler");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("token gereklidir");
  })

  test("[6] Bilmeceler token ile listeleniyor",async ()=>{
    const user = {username: 'Defne', password: '1234'};
    const login = await supertest(server).post("/api/auth/login").send(user);
    const res = await supertest(server).get("/api/bilmeceler").set("authorization",login.body.token);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  })

})