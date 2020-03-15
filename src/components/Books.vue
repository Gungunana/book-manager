<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Book Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.description }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateForEdit(book)">Edit</a> -
                <a href="#" @click.prevent="deleteBook(book.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Book ID#' + model.id : 'New Book')">
          <form @submit.prevent="save">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Author">
              <b-form-input type="text" v-model="model.author"></b-form-input>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-textarea rows="4" v-model="model.description"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save book</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/users-api'
export default {
  data () {
    return {
      loading: false,
      books: [],
      model: {}
    }
  },
  async created () {
    this.refresh()
  },
  methods: {
    async refresh () {
      this.loading = true
      this.books = await api.getAll()
      this.loading = false
    },
    async populateForEdit (book) {
      this.model = Object.assign({}, book)
    },
    async save () {
      if (this.model.id) {
        await api.update(this.model.id, this.model)
      } else {
        await api.create(this.model)
      }
      this.model = {}
      await this.refresh()
    },
    async deleteBook (id) {
      if (confirm('Are you sure you want to delete this book?')) {
        if (this.model.id === id) {
          this.model = {}
        }
        await api.delete(id)
        await this.refresh()
      }
    }
  }
}
</script>