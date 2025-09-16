const Course = ({ course }) => {
  return (
    <section>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </section>
  )
}

const Header = ({ courseName }) => <h2>{courseName}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part
        key={part.id}
        partName={part.name}
        exerciseCount={part.exercises}
      />
    ))}
  </div>
)

const Part = ({ partName, exerciseCount }) => (
  <p>
    {partName} {exerciseCount}
  </p>
)

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Total of {totalExercises} exercises</strong></p>
}

export default Course
