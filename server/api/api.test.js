

const request = require("supertest")
const app = require("../api/controller/cadastroUser")

describe('teste controller', () => {

    it("status code 200", async () => {
       const res = await request(app)
       .post('/api/v1/cadastroUser')
       .send({
        "name":"jonas"
       })
        expect(res.status).toBe(201)
      })
    
})