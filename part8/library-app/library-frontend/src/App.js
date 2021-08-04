
import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import SetBirth from './components/SetBirth'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { BOOK_ADDED, ALL_BOOKS } from './queries'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} added`)
      console.log(subscriptionData)
    }
  })


  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'} setError={notify}
        />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          errorMessage={errorMessage}
        />

      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={logout}>
          logout
        </button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <SetBirth
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'} setError={notify} errorMessage={errorMessage}
      />

      <NewBook
        show={page === 'add'} setError={notify} errorMessage={errorMessage} updateCacheWith={updateCacheWith}
      />

      <Recommended
        show={page === 'recommended'}
      />

    </div>
  )
}

export default App