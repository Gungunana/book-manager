import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000/',
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getAll () {
    return this.execute('get', '/books')
  },
  get (id) {
    return this.execute('get', `/books/${id}`)
  },
  create (data) {
    return this.execute('post', '/books', data)
  },
  update (id, data) {
    return this.execute('put', `/books/${id}`, data)
  },
  delete (id) {
    return this.execute('delete', `/books/${id}`)
  }
}