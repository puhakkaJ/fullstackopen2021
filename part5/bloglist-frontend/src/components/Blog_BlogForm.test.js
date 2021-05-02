import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('<Blog />', () => {
  test('renders first only title and author', () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'www.url.fi',
      likes: 4,
      user: {
        username: 'user',
        name: 'Tester',
        id: '123'
      },
      id: '1234'
    }

    const removeBlog = jest.fn()
    const updateLikes = jest.fn()

    const component = render(
      <Blog user={'user'} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog}/>
    )

    component.debug()

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(component.container).not.toHaveTextContent('www.url.fi')
    expect(component.container).not.toHaveTextContent('4')
  })

  test('clicking the show button url and likes are showing', async () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'www.url.fi',
      likes: 4,
      user: {
        username: 'user',
        name: 'Tester',
        id: '123'
      },
      id: '1234'
    }

    const removeBlog = jest.fn()
    const updateLikes = jest.fn()

    const component = render(
      <Blog user={'user'} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(`${blog.title}`)
    expect(component.container).toHaveTextContent(`${blog.author}`)
    expect(component.container).toHaveTextContent(`${blog.url}`)
    expect(component.container).toHaveTextContent(`${blog.likes}`)
  })

  test('clicking the like button calling event handlerer twice', async () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'www.url.fi',
      likes: 4,
      user: {
        username: 'user',
        name: 'Tester',
        id: '123'
      },
      id: '1234'
    }

    const removeBlog = jest.fn()
    const updateLikes = jest.fn()

    const component = render(
      <Blog user={'user'} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog}/>
    )

    //Opening first the view
    const button1 = component.getByText('view')
    fireEvent.click(button1)

    const button2 = component.getByText('like')
    fireEvent.click(button2)
    fireEvent.click(button2)

    expect(updateLikes.mock.calls).toHaveLength(2)
  })

  describe('<AddBlogForm />', () => {
    test('form calling a given eventhandlerer with right inputs when blog is created', async () => {
      const createBlog = jest.fn()

      const component = render(
        <BlogForm createBlog={createBlog}/>
      )

      const title = component.container.querySelector('#title')
      const author = component.container.querySelector('#author')
      const url = component.container.querySelector('#url')
      const send = component.container.querySelector('#send')

      fireEvent.change(title, {
        target: { value: 'Title' }
      })
      fireEvent.change(author, {
        target: { value: 'Author' }
      })
      fireEvent.change(url, {
        target: { value: 'www.url.fi' }
      })

      fireEvent.submit(send)

      expect(createBlog.mock.calls[0][0].title).toBe('Title' )
      expect(createBlog.mock.calls[0][0].author).toBe('Author' )
      expect(createBlog.mock.calls[0][0].url).toBe('www.url.fi' )
    })
  })

})