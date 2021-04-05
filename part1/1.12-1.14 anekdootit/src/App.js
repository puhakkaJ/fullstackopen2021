import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Votes = ({num}) => {
  return <div>has {num} votes</div>
}

const MaxDisp = ({ane, max, votes}) => {
  if (votes.every(vote => vote === 0) === true) {
    return <p>No votes yet</p>
  }
  return (
    <div>
      <div>{ane[max]}</div>
      <div>has {votes[max]} votes</div>
    </div> )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const [maximum, setMax] = useState(0)
  const [current, setCurrent] = useState(0)

  const handleC = () => {
    const rand = Math.floor(Math.random() * 6)
    setSelected(rand)
    setCurrent(votes[rand])
  }

  const handleV = () => {
    let votes2 = votes
    votes2[selected] += 1
    setMax(votes.indexOf(Math.max(...votes)))
    setVotes(votes2)
    setCurrent(votes2[selected])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Votes num={current} />
      <Button handleClick={handleV} text="vote" />
      <Button handleClick={handleC} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MaxDisp ane={anecdotes} max={maximum} votes={votes}/>
    </div>
  )
}

export default App