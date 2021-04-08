import React from 'react'

const Notification = ({ message, num}) => {
    if (message === null) {
      return null
    }
    const string = `error${num}`
    return (
      <div className={string}>
        {message}
      </div>
    )
  }

  export default Notification