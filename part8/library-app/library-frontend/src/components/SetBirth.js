import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Notification from './Notification'


const SetBirth = (props) => {
    const [selectedOption, setSelectedOption] = useState('')
    const [errorMessage, setError] = useState(null)
    const [born, setBorn] = useState('')
    const authors = useQuery(ALL_AUTHORS)

    const options = authors.data.allAuthors.map(author => { return { value: author.name, label: author.name } })

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            setError(error.message)
        }
    })

    useEffect(() => {
        if (!authors.data) {
            setError('author not found')
        }
    }, [authors.data])

    if (authors.loading) {
        return <div>loading...</div>
    }

    if (!props.show) {
        return null
    }

    const submit = (event) => {
        event.preventDefault()
        console.log('update birthdate...')
        const name = selectedOption.value

        editAuthor({ variables: { name, "born": parseInt(born) } })
        setSelectedOption('')
        setBorn('')
    }

    return (
        <div>
            <Notification errorMessage={errorMessage} />
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    Choose name:
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                </div>
                <div>
                    born:
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(parseInt(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )

}

export default SetBirth
