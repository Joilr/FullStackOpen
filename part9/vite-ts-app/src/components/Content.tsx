import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

function Content({ courseParts }: ContentProps) {
  return (
    <div>
      {courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
}

export default Content;
