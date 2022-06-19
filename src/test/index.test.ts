import { IUser, TUsers } from 'src/models/user';
import supertest from 'supertest';
import { Paths } from '../constants';
import { server, close } from '../index';

afterEach(close);

describe('by creating a server', () => {
  it('get collections of users, which is empty!', async () => {
    await supertest(server)
      .get(Paths.getUsers)
      .set('Content-type', 'application/json')
      .expect(200)
      .expect(res =>
        expect((JSON.parse(res.text) as TUsers).length).toEqual(0)
      );
  });

  it('create a new user and return it!', async () => {
    const user = {
      name: 'TestUser',
      age: 25,
      hobbies: [],
    };

    await supertest(server)
      .post(Paths.getUsers)
      .set('Content-type', 'application/json')
      .send(user)
      .expect(201)
      .expect(res => {
        expect((JSON.parse(res.text) as IUser).age).toEqual(user.age);
      });
  });

  it('create a new user, then we read a created body by GET-method with id!', async () => {
    const user = {
      name: 'AnotherUser',
      age: 30,
      hobbies: ['React'],
    };

    let userId: IUser['id'] = '';

    await supertest(server)
      .post(Paths.getUsers)
      .set('Content-type', 'application/json')
      .send(user)
      .then(result => {
        userId = (JSON.parse(result.text) as IUser).id;
        return result;
      });

    await supertest(server)
      .get(`${Paths.getUsers}/${userId}`)
      .set('Content-type', 'application/json')
      .expect(200)
      .expect(result => {
        expect((JSON.parse(result.text) as IUser).id).toEqual(userId);
      });
  });
});
