import React, { useState, useEffect, useCallback } from 'react'
import { ALL_BOOKS, ME, BOOKS_BY_GENRE } from '../queries'
import { useQuery, useApolloClient } from '@apollo/client'


const Recommended = (props) => {
    const client = useApolloClient(BOOKS_BY_GENRE)
    const books = useQuery(ALL_BOOKS)
    const me = useQuery(ME)
    const [booksByGenre, setBooksByGenre] = useState([])

    const findBooks = useCallback(async (genre) => {
        const { data } = await client.query({
            query: BOOKS_BY_GENRE,
            variables: { genre: genre },
            fetchPolicy: 'no-cache'
        })
        setBooksByGenre(data.allBooks)
    }, [client])

    useEffect(() => {
        const findMe = async () => {
            const { data } = await client.query({
                query: ME,
            })
            findBooks(data.me.favoriteGenre)
        }
        findMe()
    }, [books, findBooks, client])

    if (!props.show) {
        return null
    }

    if (books.loading || me.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>books</h2>
            <p>books in your favorite genre <b>{me.data.me.favoriteGenre}</b></p>
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
        </div>
    )
}

export default Recommended