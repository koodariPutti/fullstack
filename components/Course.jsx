const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => (
          <Part key={part.name} part={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.part} {props.exercises} </p>
      </div>
      )
  }
  
  const Total = (props) => {
    const initialValue = 0
    const sumWithInitial = props.parts.reduce(
      (s, p) => s + p.exercises,
      initialValue,
    )
    console.log(props)
    return (
      <p><strong>Number of exercises {sumWithInitial}</strong></p>
    )
  }

  export default Course