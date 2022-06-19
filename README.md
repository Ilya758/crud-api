# crud-api

## Here is your instruction!

### Installation steps:

- clone repo
- type `npm install`
- create `.env` file in the ROOT of the project (near the src folder, NOT INSIDE!)
- type `PORT=5000` //or another value

---

##### There're few types to start an app:

- [x] dev: `npm run start:dev`
- [x] prod: `npm run start:prod`

---

##### To run the tests type to the terminal

- `npm test`

---

##### How to work with?

1. download and install the Postman-client
2. run program

---

##### GET requests

An app can read requests from the user.
- endpoint: /api/users - to get all users
- body: none
- result: collection of users 200 OK

---

###### Get particular user by ID

- endpoint: /api/users/userId - to get a particular user
- body: none
- result: particular user 200 OK or 404 Not Found

---

###### POST requests

Create new user
- endpoint: /api/users
- body: {id: string, age: number, hobbies: string[]};
- result: newly created user with code 201 or 400 Bad Request

---

###### PUT requests

Update user
- endpoint: /api/users/userId
- body: {id: string, age: number, hobbies: string[]};
- result: updated user with code 200 or 400 Bad Request, or 404 NotFound with bad userId

---

###### DELETE requests

Delete particular user by userId
- endpoint: /api/users/userId
- body: {id: string, age: number, hobbies: string[]};
- result: code 200 or 400 Bad Request, or 404 NotFound with bad userId
