import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          {part.name} {part.exerciseCount} - {part.description}
        </p>
      );
    case "group":
      return (
        <p>
          {part.name} {part.exerciseCount} - group projects:{" "}
          {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {part.name} {part.exerciseCount} - {part.description} (Background
          material: {part.backgroundMaterial})
        </p>
      );
    case "special":
      return (
        <p>
          {part.name} {part.exerciseCount} - {part.description} - Required
          skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      return <p>Unknown part type</p>;
  }
};

export default Part;
