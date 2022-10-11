const uuidv4 = require("uuid/v4")
const cadastroUser = require("../routes/cadastroUser")

module.exports = app => {
  const cadastroUserDB = app.data.cadastroUser
  const controller = {}

  function sendResponse({ message, res, status, data }) {
    const success = status === 200 || status === 201
    let resStatus = res.status(status).json({ message, data })
    if (success) {
      resStatus
    } else {
      resStatus
    }
  }

  const {
    cadastroUser: cadastroUserMock,
  } = cadastroUserDB

  const { data } = cadastroUserMock

  controller.list = (req, res) => {
    res.status(200).json(data)
  }

  controller.getUser = (req, res) => {
    const filtered = req.params
    const filterUser = data.find(user => user.id == filtered.id)
    res.status(200).json(filterUser)
  };

  controller.save = (req, res) => {
    const user = {
      id: uuidv4(),
      name: req.body.name,
      age: parseInt(req.body.age),
      email: req.body.email,
      password: req.body.password,
    }
    cadastroUserMock.data.push(user)


    res.status(201).json(user)
  }

  controller.remove = (req, res) => {
    const { id } = req.params
    const foundCadastroUserIdex = cadastroUserMock.data.findIndex(cadastroUser => cadastroUser.id == id)
    let notFound = foundCadastroUserIdex === -1
    let message = !notFound ? "Usuario deletado" : "Usuario não encontrado"
    let data;
    let status;

    if (notFound) {
      data = { cadastroUser: cadastroUserMock }
      status = 404
    } else {
      const deleteUser = {
        id: id,
        ...req.body
      }
      cadastroUserMock.data.splice(foundCadastroUserIdex, 1, newCadastroUser)
      data = { usuario: deleteUser }
      status = 200
    }
    sendResponse({ message, status, data, res })
  }

  controller.update = (req, res) => {

    const { id } = req.params
    const foundCadastroUserIdex = cadastroUserMock.data.findIndex(cadastroUser => cadastroUser.id == id)
    let notFound = foundCadastroUserIdex === -1
    let message = !notFound ? "Usuario atualizado" : "Usuario não encontrado"
    let data;
    let status;
    if (notFound) {
      data = { cadastroUser: cadastroUserMock }
      status = 404
    } else {
      const newCadastroUser = {
        id: id,
        ...req.body
      }
      cadastroUserMock.data.splice(foundCadastroUserIdex, 1, newCadastroUser)
      data = { usuario: newCadastroUser }
      status = 200
    }
    sendResponse({ message, status, data, res })

  }
  return controller
}





// const filter = req.query
//     const filterUser = data.filter(user => {
//       let isValid = true;
//       for (id in filter) {
//         isValid = isValid && user[id]==filter[id]
//       }
//     })