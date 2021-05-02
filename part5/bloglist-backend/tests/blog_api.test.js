const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')

const api = supertest(app)

const getToken = (user) => {
  const user2 = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(user2, process.env.SECRET)
  return token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  const users = await User.find({})

  const pickedUser = users[Math.floor(Math.random() * 3)]

  await Blog.updateMany({}, { $set: { user: pickedUser } })
})

describe('when there is initially two blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have field named id', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    blogsAtEnd.every(blog => expect(blog.id).toBeDefined())
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a valid blog can be added with token', async () => {
      
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'Lastenkirja',
      author: 'Jukka Harju',
      url: 'http://www.kirjat.com',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${getToken(users[0])}`)
      .send(newBlog)
      .expect(201)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Lastenkirja'
    )
  })
    
  test('a valid blog cant be added without token', async () => {
    const newBlog = {
      title: 'Lastenkirja',
      author: 'Jukka Harju',
      url: 'http://www.kirjat.com',
      likes: 1,
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without likes gets value 0', async () => {
    const newBlog = {
      title: 'Satuja',
      author: 'Helena Koskinen',
      url: 'http://www.koskinen.com',
    }
    
    const users = await helper.usersInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${getToken(users[Math.floor(Math.random() * (users.length -1))])}`)
      .send(newBlog)
      .expect(201)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length -1].likes).toBe(0)    
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Jaana helikko',
      likes: 7,
    }

    const users = await helper.usersInDb()
    
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${getToken(users[Math.floor(Math.random() * (users.length -1))])}`)
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('deleting a blog if valid token is send', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const users = await helper.usersInDb()
    const blogToDelete = blogsAtStart[Math.floor(Math.random() * (blogsAtStart.length -1))]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${getToken(users.find(n => n.id === blogToDelete.user.toString()))}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'first', passwordHash })
  
    await user.save()
  })
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'fresh',
      name: 'This Should Work',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a too short username/password', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'te',
      name: 'testing too short',
      password: 'salainen',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(result.body.error).toContain('your username or password is too short')
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'first',
      name: 'Superuser',
      password: 'salainen',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body.error).toContain('`username` to be unique')
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})