const uuidv4 = require("uuid/v4")

module.exports = app => {
  const cadastroUserDB = app.data.cadastroUser
  const controller = {}

  const sendResponse = ({ message, res, status, BD }) => res.status(status).json({ message, BD });

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
   
  }

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
    let BD, status;

    if (notFound) {
      BD = { cadastroUser: cadastroUserMock }
      status = 404
    } else {
      const deleteUser = {
        id: id,
        ...req.body
      }
      cadastroUserMock.data.splice(foundCadastroUserIdex, 1, deleteUser)
      BD = { usuario: deleteUser }
      status = 200
    }
    sendResponse({ message, status, BD, res })
  }

  controller.update = (req, res) => {

    const { id } = req.params
    const foundCadastroUserIdex = cadastroUserMock.data.findIndex(cadastroUser => cadastroUser.id == id)
    let notFound = foundCadastroUserIdex === -1
    let message = !notFound ? "Usuario atualizado" : "Usuario não encontrado"
    let BD, status;
    if (notFound) {
      BD = { cadastroUser: cadastroUserMock }
      status = 404
    } else {
      const newCadastroUser = {
        id: id,
        ...req.body
      }
      cadastroUserMock.data.splice(foundCadastroUserIdex, 1, newCadastroUser)
      BD = { usuario: newCadastroUser }
      status = 200
    }
    sendResponse({ message, status, BD, res })

  }
  return controller
}
