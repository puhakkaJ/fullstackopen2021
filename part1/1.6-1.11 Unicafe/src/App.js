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

const Statistics = ({texts, values, all}) => {
  return (
    <tbody>
      <Display text={texts[0]} value={values[0]} all={all}/>
      <Display text={texts[1]} value={values[1]} all={all}/>
      <Display text={texts[2]} value={values[2]} all={all}/>
      <StatisticLine text={texts[3]} value={values[3]} all={all}/>
      <StatisticLine text={texts[4]} value={values[4]} all={all}/>
      <StatisticLine text={texts[5]} value={values[5]} all={all}/> 
    </tbody>)
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

  const texts = ['good', 'neutral', 'bad', 'all', 'average', 'positive']
  const values = [good, neutral, bad, all, av, pos]

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
      <Statistics texts={texts} values={values} all={allClicks}/>
      </tbody>
    </table>
    </div>
  )
}

export default App
