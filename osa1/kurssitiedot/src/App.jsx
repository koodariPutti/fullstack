const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
 
const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map(part => (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.part} {props.exercises} </p>
    </div>
    )
}

const Total = (props) => {
  let totalExercises = 0;
  for (const part of props.parts) {
    totalExercises += part.exercises
  }
  console.log(props)
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

export default App

