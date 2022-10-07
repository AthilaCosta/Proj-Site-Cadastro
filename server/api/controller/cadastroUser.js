const uuidv4 = require("uuid/v4")
const cadastroUser = require("../routes/cadastroUser")

module.exports = app => {
  const cadastroUserDB = app.data.cadastroUser
  const controller = {}

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

    if (foundCadastroUserIdex === -1) {
      res.status(404).json({
        message: 'Usuario não encontrado',
        success: false,
        cadastroUser: cadastroUserMock
      })
    } else {
      const deleteUser = {
        id: id,
        ...req.body
      }
      cadastroUserMock.data.splice(foundCadastroUserIdex, 1, deleteUser)
      res.status(200).json({
        message: 'Usuario deletado',
        success: true,
        usuario: deleteUser
      })
    }
  }

  controller.update = (req, res) => {
    const { id } = req.params

    const foundCadastroUserIdex = cadastroUserMock.data.findIndex(cadastroUser => cadastroUser.id == id)

    if (foundCadastroUserIdex === -1) {
      res.status(404).json({
        message: 'Usuario não encontrado',
        success: false,
        cadastroUser: cadastroUserMock
      })
    } else {
      const newCadastroUser = {
        id: id,
        ...req.body
      }
      cadastroUserMock.data.splice(foundCadastroUserIdex, 1, newCadastroUser)
      res.status(200).json({
        message: 'Usuario atualizado',
        success: true,
        usuario: newCadastroUser

      })
    }

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