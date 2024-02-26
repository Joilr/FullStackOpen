interface HeaderProps {
  exercises: number;
}

function Total({ exercises }: HeaderProps) {
  return (
    <div>
      <p>Number of exercises {exercises}</p>
    </div>
  );
}

export default Total;
