import http from "../http-common";

const getAll = () => {
    return http.get('/exercises')
}

const create = data => {
    return http.post('/exercises', data)
}

const getAllTrainers = () => {
    return http.get('/trainers')
}

const createTrainer = data => {
    return http.post('/trainers', data)
}

const getAllUsers = () => {
    return http.get('/users')
}

const createUser = data => {
    return http.post('/users', data)
}

const stayFitDataService = {
    getAll,
    create,
    getAllTrainers,
    createTrainer,
    getAllUsers,
    createUser
}

export default stayFitDataService; 