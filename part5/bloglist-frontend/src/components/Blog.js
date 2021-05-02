import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ user, blog, updateLikes, removeBlog }) => {
  const [viewAll, setView] = useState(false)

  Blog.propTypes = {
    user: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired,
    updateLikes: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid Violet',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {viewAll === false
        ? (<div id='blog1'>
          <span>
            <div> {blog.title}
              <b> {blog.author}</b>
              <button type="button" onClick={() => setView(true)}>view</button></div>
          </span>
        </div>)
        : (<div id='blog1'>
          <span>
            <div> {blog.title}
              <b> {blog.author}</b>
              <button type="button" onClick={() => setView(false)}>hide</button>
              <div>
                <u>{blog.url}</u>
                <br></br>
                <div id='likes'>
                likes {blog.likes}
                  <button id='like' type="button" onClick={updateLikes}>like</button>
                </div>
                {blog.user.name}
              </div>
              {user.name === blog.user.name
                ? (<div>
                  <button className={'remove_button'} type="button" onClick={removeBlog}>remove</button>
                </div>)
                : (<div></div>)}
            </div>
          </span>
        </div>)}
    </div>
  )
}

export default Blog