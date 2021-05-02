import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddBlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [num, setNum] = useState(1)

  const blogFormRef = useRef()

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <AddBlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  useEffect(() => {
    const all = async() => {
      await blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
    }
    all()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      setNum(3)
      setErrorMessage(`welcome ${username}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)
      setNum(1)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedNoteappUser')

      setNum(3)
      setErrorMessage('you logged out... See you next time')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)
      setNum(1)
      setErrorMessage('logout failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => a.likes + b.likes))
      })

    setNum(2)

    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const updateLikes = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const blogObject = { ...blog, likes: (blog.likes +1) }

    await blogService
      .update(id, { ...blogObject, id: id })
      .catch(() => {
        setNum(1)
        setErrorMessage(
          `Blog '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    setBlogs(blogs.map(blog1 => blog1.id !== id ? blog1 : { ...{ ...blogObject, id: id }, user: blog.user }))
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {

      await blogService
        .remove(id)
        .catch(() => {
          setNum(1)
          setErrorMessage(
            `Blog '${blog.title}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

      setNum(2)
      setErrorMessage(
        `Blog '${blog.title}' was succesfully deleted`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} num={num}/>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login' type="login">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} num={num}/>
      <div>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>logout</button>
      </div>
      {addBlogForm()}
      <br></br>
      <div id='blogs'>
        {blogs.sort((a, b) => a.likes - b.likes).reverse().map(blog => {
          return <Blog key={blog.id} user={user} blog={blog} updateLikes={() => updateLikes(blog.id)} removeBlog={() => removeBlog(blog.id)}/>
        }
        )}
      </div>
    </div>

  )
}

export default App