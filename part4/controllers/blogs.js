const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.post('/', middleware.userExtractor,async (request, response, next) => {
  const body = request.body

  const user = request.user

  if (body.url=== undefined && body.title === undefined) {
    return response.status(400).send({ error: error.message })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	  const blogToRemove = await Blog.findById(request.params.id)
	  if (!blogToRemove) {
    return response.status(204).end()
  }
	  
  if (blogToRemove.user.toString() !== request.user.id) {
		  return response.status(401).json({ error: 'you didnt create this blog' })
  }
    
  await Blog.findByIdAndRemove(blogToRemove.id)
  request.user.blogs = request.user.blogs.filter(b => b.id !== blogToRemove.id)
  await request.user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON)
})

module.exports = blogsRouter