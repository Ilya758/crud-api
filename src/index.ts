/* eslint-disable quotes */
/* eslint-disable indent */
import dotenv from 'dotenv';
import { v4 } from 'uuid';
import http from 'http';
import { resolve } from 'path';
import { cwd } from 'process';
import { Method, Paths, StatusCode } from './constants';
import { IUser } from './models/user';
import UserService from './services/userService/index';
import { checkUserFieldsExistence } from './utils/checkUserFieldsExistence';
import { findUserById } from './utils/findUserById';

dotenv.config({ path: resolve(cwd(), '.env') });

export const server = http.createServer((request, response) => {
  switch (request.method) {
    case Method.GET: {
      if (request.url === Paths.getUsers) {
        response.statusCode = StatusCode.success;
        response.end(JSON.stringify(UserService.users, null, 2));
        break;
      }

      if (request.url?.split('/')[3]) {
        const userId = request.url?.split('/')[3];

        const user = findUserById(userId, UserService.users);

        if (!userId || userId.length !== 36) {
          response.statusCode = StatusCode.badRequest;
          response.end(
            JSON.stringify({
              code: StatusCode.badRequest,
              message: 'Invalid userId',
            })
          );
        } else if (!user) {
          response.statusCode = StatusCode.notFound;
          response.end(
            JSON.stringify({
              code: StatusCode.notFound,
              message: 'User not found!',
            })
          );

          break;
        }

        response.statusCode = StatusCode.success;
        response.end(JSON.stringify(user, null, 2));
      } else {
        response.statusCode = StatusCode.notFound;
        response.end(
          JSON.stringify({
            code: StatusCode.notFound,
            message: 'This url does not exist!',
          })
        );

        break;
      }

      break;
    }

    case Method.POST: {
      switch (request.url) {
        case Paths.getUsers: {
          let data = '';

          request.on('data', (chunk: Buffer) => {
            data += chunk;
          });

          request.on('end', () => {
            const user = JSON.parse(data) as IUser;
            user.id = v4();

            const isUserFieldsValid = checkUserFieldsExistence(
              Object.keys(user)
            );

            if (isUserFieldsValid) {
              response.statusCode = StatusCode.successfullyCreated;

              UserService.setNewUser(user);

              response.end(JSON.stringify(user, null, 2));
            } else {
              response.statusCode = StatusCode.badRequest;

              response.end(
                JSON.stringify({
                  code: StatusCode.badRequest,
                  error:
                    "body doesn't contain valid fields or there're not exist",
                })
              );
            }
          });

          break;
        }

        default:
          break;
      }

      break;
    }

    case Method.PUT: {
      if (request.url?.split('/')[3]) {
        let data = '';

        request.on('data', (chunk: Buffer) => {
          data += chunk;
        });

        request.on('end', () => {
          const user = JSON.parse(data) as IUser;

          const isUserFieldsValid = checkUserFieldsExistence(Object.keys(user));

          if (isUserFieldsValid) {
            const userId = request.url?.split('/')[3] as string;

            if (!userId || userId.length !== 36) {
              response.statusCode = StatusCode.badRequest;

              response.end(
                JSON.stringify({
                  code: StatusCode.badRequest,
                  message: 'Invalid userId',
                })
              );
            } else if (!user) {
              response.statusCode = StatusCode.notFound;
              response.end(
                JSON.stringify({
                  code: StatusCode.notFound,
                  message: 'User not found!',
                })
              );
            }

            UserService.updateUserById(userId, user);

            const updatedUser = { ...user, id: userId };

            response.statusCode = StatusCode.success;
            response.end(JSON.stringify(updatedUser, null, 2));
          }
        });
      } else {
        response.statusCode = StatusCode.notFound;
        response.end(
          JSON.stringify({
            code: StatusCode.notFound,
            message: 'This url does not exist!',
          })
        );
      }

      break;
    }

    case Method.DELETE: {
      if (request.url?.split('/')[3]) {
        let data = '';

        request.on('data', (chunk: Buffer) => {
          data += chunk;
        });

        request.on('end', () => {
          const user = JSON.parse(data) as IUser;

          const isUserFieldsValid = checkUserFieldsExistence(Object.keys(user));

          if (isUserFieldsValid) {
            const userId = request.url?.split('/')[3] as string;

            if (!userId || userId.length !== 36) {
              response.statusCode = StatusCode.badRequest;

              response.end(
                JSON.stringify({
                  code: StatusCode.badRequest,
                  message: 'Invalid userId',
                })
              );
            } else if (!user) {
              response.statusCode = StatusCode.notFound;
              response.end(
                JSON.stringify({
                  code: StatusCode.notFound,
                  message: 'User not found!',
                })
              );
            }

            UserService.deleteUserById(userId);

            response.statusCode = StatusCode.noContent;
            response.end();
          }
        });
      } else {
        response.statusCode = StatusCode.notFound;
        response.end(
          JSON.stringify({
            code: StatusCode.notFound,
            message: 'This url does not exist!',
          })
        );
      }

      break;
    }

    default:
      break;
  }
});

export const listen = () => {
  server.listen(process.env.PORT);
};

export const close = () => server.close();

listen();
