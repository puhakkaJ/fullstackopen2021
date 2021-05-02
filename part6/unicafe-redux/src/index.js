import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK',
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  const all = store.getState().good + store.getState().ok + store.getState().bad
  const average = all === 0
      ? 0
      : (store.getState().good - store.getState().bad) / all
  const positive = all === 0
      ? 0
      : store.getState().good / all


  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset starts</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <br></br>
      <div>all {all}</div>
      <div>average {average }</div>
      <div>positive {positive} %</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)