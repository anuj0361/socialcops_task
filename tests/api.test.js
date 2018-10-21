const expect = require("expect");
const { app, server } = require("../server");
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe("POST /api/login", () => {
  after(function(done) {
    server.close();
    done();
  });

  it("should not login user with empty username & password", done => {
    request(app)
      .post("/api/login")
      .send({
        email: "",
        password: ""
      })
      .expect(400)
      .end(done);
  });

  it("should not login user with invalid email", done => {
    request(app)
      .post("/api/login")
      .send({
        email: "asdf",
        password: "123345"
      })
      .expect(400)
      .end(done);
  });

  it("should login user with valid email & password", done => {
    request(app)
      .post("/api/login")
      .send({
        email: "a@m.com",
        password: "123345"
      })
      .expect(200)
      .end(done);
  });

  it("should return auth token on successful login", done => {
    request(app)
      .post("/api/login")
      .send({
        email: "a@m.com",
        password: "123345"
      })
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeTruthy();
      })
      .end(done);
  });

  it("should not return auth token on invalid email/passwd", done => {
    request(app)
      .post("/api/login")
      .send({
        email: "am.com",
        password: "123345"
      })
      .expect(400)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeUndefined();
      })
      .end(done);
  });
});

describe("POST /api/patch/applyJSONPatch", () => {
  it("should return 401 if not authenticated", done => {
    request(app)
      .post("/api/patch/applyJSONPatch")
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  it("should return 400 if authenticated but body is empty", done => {
    request(app)
      .post("/api/patch/applyJSONPatch")
      .set(
        "x-auth",
        jwt.sign({ email: "a@m.com", access: "auth" }, "abc123").toString()
      )
      .send({
        jsonObject: "",
        patch: ""
      })
      .expect(400)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
