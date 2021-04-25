const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'Vankila',
    author: 'Harry Potter',
    url: 'http://www.cs.utexas',
    likes: 45,
  },
]

const initialUsers = [
  {
    username: 'jakka',
    name: 'Tiina',
    password: 'salainen'
  },
  {
    username: 'toiken',
    name: 'Jala',
    password: 'salai55'
  },
  {
    username: 'Jennin käyttis',
    name: 'Jenni',
    password: 'salainen'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, 
  initialUsers,
  blogsInDb,
  usersInDb,
}