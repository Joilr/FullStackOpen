const Course = ({ course }) => {

  const Header = ({ name }) => <h1>{name}</h1>

  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  );

  const Total = ({ total }) => {
    const sum = total.reduce((total, part) => total + part.exercises, 0);
    return <h3>total of {sum} exercises </h3>;
  };

    return (
      <div>
        <Header name={course[0].name} />
        <Content parts={course[0].parts} />
        <Total total={course[0].parts} />
        <Header name={course[1].name} />
        <Content parts={course[1].parts} />
        <Total total={course[1].parts} />
      </div>
    )

}

export default Course