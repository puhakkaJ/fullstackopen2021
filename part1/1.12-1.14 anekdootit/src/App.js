import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({text, value, all}) => {
  if (all.length !== 0) {
    return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr> )
  }
  if (all.length === 0 & text === 'good') {
    return (
      <tr>
        <td>No feedback given</td>
      </tr> )
  }
  return <tr></tr>
}

const StatisticLine = ({text, value, all}) => {
  if (all.length !== 0) {
    if (text === 'positive') {
      return (
        <tr>
          <td>{text}</td>
          <td>{value} {'%'}</td>
        </tr> )
    }
    return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr> )
  }
  return <tr></tr>
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const all = good + bad + neutral
  const av = (good + bad * -1) / all
  const pos = (good / all) * 100

  const handleG = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleN = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleB = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleG} text="good" />
      <Button handleClick={handleN} text="neutral" />
      <Button handleClick={handleB} text="bad" />
      <h1>statistics</h1>
    <table>
      <tbody>
      <Display text={'good'} value={good} all={allClicks}/>
      <Display text={'neutral'} value={neutral} all={allClicks}/>
      <Display text={'bad'} value={bad} all={allClicks}/>
      <StatisticLine text={'all'} value={all} all={allClicks}/>
      <StatisticLine text={'average'} value={av} all={allClicks}/>
      <StatisticLine text={'positive'} value={pos} all={allClicks}/>
      </tbody>
    </table>
    </div>
  )
}

export default App
