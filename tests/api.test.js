const expect = require('expect')
const { app, server } = require('../server')
const request = require('supertest')

var token = ''

describe('POST /api/login', () => {
  after(function (done) {
    server.close()
    done()
  })

  it('should not login user with empty username & password', done => {
    request(app)
      .post('/api/login')
      .send({
        email: '',
        password: ''
      })
      .expect(400)
      .end(done)
  })

  it('should not login user with invalid email', done => {
    request(app)
      .post('/api/login')
      .send({
        email: 'asdf',
        password: '123345'
      })
      .expect(400)
      .end(done)
  })

  it('should login user with valid email & password', done => {
    request(app)
      .post('/api/login')
      .send({
        email: 'a@m.com',
        password: '123345'
      })
      .expect(200)
      .end(done)
  })

  it('should not return auth token on invalid email/passwd', done => {
    request(app)
      .post('/api/login')
      .send({
        email: 'am.com',
        password: '123345'
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeUndefined()
      })
      .end(done)
  })

  it('should return auth token on successful login', done => {
    request(app)
      .post('/api/login')
      .send({
        email: 'a@m.com',
        password: '123345'
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy()
        token = res.headers['x-auth']
      })
      .end(done)
  })
})

describe('POST /api/patch/applyJSONPatch', () => {
  it('should return 401 if not authenticated', done => {
    request(app)
      .post('/api/patch/applyJSONPatch')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })

  it('should return 400 if authenticated but body is empty', done => {
    request(app)
      .post('/api/patch/applyJSONPatch')
      .set('auth', token)
      .send({
        jsonObject: '',
        patch: ''
      })
      .expect(400)

      .end(done)
  })

  it('should return 200 if authenticated & data is valid', done => {
    request(app)
      .post('/api/patch/applyJSONPatch')
      .set('auth', token)
      .send({
        jsonObject: { foo: [1, 3] },
        patch: [{ op: 'add', path: '/foo/1', value: 2 }]
      })
      .expect(200)
      .end(done)
  })
})

describe('POST /api/thumbnail/createThumbnail', () => {
  it('should return 401 if not authenticated', done => {
    request(app)
      .post('/api/thumbnail/createThumbnail')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })

  it('should return 400 if authenticated but body is empty', done => {
    request(app)
      .post('/api/thumbnail/createThumbnail')
      .set('auth', token)
      .send({
        imageURL: ''
      })
      .expect(400)
      .end(done)
  })

  it('should return 200 if authenticated & data is valid', done => {
    request(app)
      .post('/api/thumbnail/createThumbnail')
      .set('auth', token)
      .send({
        imageURL: 'https://wallpaperbrowse.com/media/images/750814.jpg'
      })
      .expect(200)
      .end(done)
  })
})
