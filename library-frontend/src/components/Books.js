import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { useQuery, useApolloClient } from '@apollo/client'
import Notification from './Notification'


const Books = (props) => {
  const client = useApolloClient(BOOKS_BY_GENRE)
  const books = useQuery(ALL_BOOKS)
  const [booksByGenre, setBooksByGenre] = useState([])
  const [genre, setGenre] = useState('')
  const [allGenres, setAllGenres] = useState([])

  useEffect(() => {
    if (books.data) {
      let genres = []
      books.data.allBooks.forEach(b => { return genres = genres.concat(b.genres) })
      setAllGenres([...new Set(genres)])
    }
  }, [books])

  useEffect(() => {
    const findBooks = async (genre) => {
      const { data } = await client.query({
        query: BOOKS_BY_GENRE,
        variables: { genre: genre },
        fetchPolicy: 'no-cache'
      })
      setBooksByGenre(data.allBooks)
      setGenre(genre)
    }
    findBooks(genre)
  }, [genre, books, client])

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notification errorMessage={props.errorMessage} />
      <h2>books</h2>
      {genre !== '' ? <p>in genre {genre}</p> : <p>All books are shown - choose a filter</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>

          {booksByGenre.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br></br>
      genres: <button onClick={() => setGenre('')}>all</button> {allGenres.map((g) => <button onClick={() => setGenre(g)}>{g}</button>)}
    </div>
  )
}

export default Books