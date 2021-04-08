import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

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
    create,
    load,
    clear,
    update
  }

  export default logger;