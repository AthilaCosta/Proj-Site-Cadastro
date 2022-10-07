import { api } from './Api'


export function deleteUser(id) {
    return api
        .delete('cadastroUser/' + id)
        .then()
}

export function listUser() {
    return api
        .get('/cadastroUser')
        .then()
}

export function getUser(id) {
    return api
        .get('/cadastroUser/' + id)

}

export function postUser(user) {
    return api
        .post('/cadastroUser', user)
        .then()
}

export function putUser(user) {
    return api
        .put('/cadastroUser/' + user.id, user)
        .then()
}
