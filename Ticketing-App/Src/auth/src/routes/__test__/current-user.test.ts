import Request from 'supertest'
import { app } from '../../app'

it('responds with details about the current user', async () => {
    const cookie = await global.signin()
    const response = await Request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)
    expect(response.body.currentUser.email).toEqual('test@gmail.com')
}
);

it('responds with null if not authenticated', async () => {
    const response = await Request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)
    expect(response.body.currentUser).toEqual(null)
}
);