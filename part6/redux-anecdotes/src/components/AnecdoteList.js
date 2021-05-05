import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import Filter from '../components/Filter'
import Notification from '../components/Notification'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      {anecdote.content}
      <div> has {anecdote.votes} votes 
      <button onClick={handleClick} >vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  return(
    <div>
      <Notification/>
      <br></br>
      <Filter/>
      {anecdotes.sort((a,b)=> a.votes-b.votes).reverse().map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(vote(anecdote))
            dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
          }
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList