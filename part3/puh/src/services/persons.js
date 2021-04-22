import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
    return (
        axios.post(baseUrl, newObject).then(response => response.data)
      )
  }

const clear = id => {
    return (
        axios.delete(`${baseUrl}/${id}`).then(response => response.data)
    )
}

const load = setPersons => {
    return (
        axios.get(baseUrl).then(response => {setPersons(response.data)})
      )
}

const update = (id, newObject) => {
    return (
        axios.put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
    )
  }

  const logger = { 
    getAll,
    create,
    load,
    clear,
    update
  }

  export default logger;