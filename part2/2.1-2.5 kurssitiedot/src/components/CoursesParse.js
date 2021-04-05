import React from 'react'

const CoursesParse = ({courses}) => {
  return (
  <div>
    {courses.map(element => 
    <Course key={element.id} course={element}/> 
    )}
  </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(note => 
      <Part key={note.id} cont={note.name} num={note.exercises}/>
      )}
      <Total sum={parts.map(value => value.exercises).reduce((next, now) => next + now)}/>
    </div> 
    )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.cont} {props.num}</p>
    </div>
  )
}

const Total = ({sum}) => (<h4>total of {sum} exercises</h4>)

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

export default CoursesParse