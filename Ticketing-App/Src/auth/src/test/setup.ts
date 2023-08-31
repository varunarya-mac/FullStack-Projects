import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import Request from 'supertest';

declare global {
           var signin : () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
   
    process.env.JWT_KEY = 'asdfasdf';
    // process.env.NODE_ENV = 'test';
    
   mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});

});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) await mongo.stop();
    await mongoose.connection.close();
});

export const signin = async () => {
    const email = 'test@gmail.com';
    const password = 'password';
    const response = await Request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .expect(201);
    const cookie = response.get('Set-Cookie');
    return cookie;
}


