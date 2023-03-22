// =================================================================================
// Login middleware test
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../app");

mongoose.set("strictQuery", false);
const { CONNECTION_STRING, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(async () => {
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it("test login route", async () => {
    const mEmail = "1olgasuchok@example.com";
    const mPassword = "1234567";

    const response = await request(app).get("/api/users/login").send({
      email: mEmail,
      password: mPassword,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});

// =================================================================================
// GetOneContactById middleware test
// const { getOneContactById } = require("../service/contacts");
// const Contact = require("../db/schemas/contacts");

// describe("Contacts servise getOneContactById test", () => {
//   it("Should return post data by providen ID", async () => {
//     const mContactId = "1";
//     const mUserId = "2";

//     const contact = {
//       _id: mContactId,
//       name: "name",
//       email: "email",
//       phone: "phone",
//       favorite: true,
//       userId: mUserId,
//     };

//     jest.spyOn(Contact, "findOne").mockImplementationOnce(async () => contact);

//     const result = await getOneContactById(mContactId, mUserId);

//     expect(result._id).toEqual(mContactId);
//     expect(result.name).toBeDefined();
//     expect(result.email).toBeDefined();
//     expect(result.phone).toBeDefined();
//     expect(result.favorite).toBeDefined();
//     expect(result.userId).toEqual(mUserId);
//   });
// });

// =================================================================================
// Auth middleware test
// const jsonwebtoken = require("jsonwebtoken");
// require("dotenv").config();
// const { authMiddleware } = require("../middlewares/authMiddleware");
// const { NotAuthorizedError } = require("../helpers/errors");

// describe("Auth middleware test", () => {
//   it("Should call next() and add user and token properties to req object", () => {
//     const user = {
//       _id: "1",
//     };

// const token = jsonwebtoken.sign(
//   {
//     _id: user._id,
//   },
//   process.env.JWT_SECRET,
//   { expiresIn: "23h" }
// );

// const mReq = {
//   headers: {
//     authorization: `Bearer ${token}`,
//   },
// };
// const mRes = {};
// const mockNext = jest.fn();

// authMiddleware(mReq, mRes, mockNext);

// expect(mReq.token).toEqual(token);
//     expect(mReq.user._id).toEqual(user._id);
//     expect(mockNext).toHaveBeenCalled();
//   });

//   it("Should call next() with error in case authorization header is absent", () => {
//     const mReq = {
//       headers: {},
//     };
//     const mRes = {};
//     const mockNext = jest.fn();

//     authMiddleware(mReq, mRes, mockNext);

//     expect(mockNext).toHaveBeenCalledWith(
//       new NotAuthorizedError("Please, provade a token in request authorization")
//     );
//   });
// });

// =================================================================================
// Simple test
// const addTwoNumbers = (a, b) => {
//   if (!a || !b) {
//     throw new Error();
//   }

//   try {
//     return a + b;
//   } catch (error) {
//     throw new Error("Please, provide valid numbers");
//   }
// };

// describe("Addition service test", () => {
//   it("Add two valid positive numbers", () => {
//     const firstNumber = 1;
//     const secondNumber = 1;
//     const addTwoNumbersResult = addTwoNumbers(firstNumber, secondNumber);

//     expect(addTwoNumbersResult).toEqual(firstNumber + secondNumber);
//   });

//   it("AddTwoNumbers returns error in case of invalid params", () => {
//     const firstNumber = 4;

//     expect(() => addTwoNumbers(firstNumber)).toThrow(
//       "Please, provide valid numbers"
//     );
//   });
// });
