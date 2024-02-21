export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (
  args: string[]
): { daily_exercises: number[]; target: number } => {
  if (args[2].length < 4) throw new Error("Not enough arguments");

  const target = Number(args[3]);
  if (isNaN(target)) throw new Error("Target must be a number!");

  const daily_exercises = args[2].split(",").map((arg) => {
    const hour = Number(arg.trim());
    if (isNaN(hour)) {
      throw new Error("Weekly hours must be numbers!");
    }
    return hour;
  });

  return { daily_exercises, target };
};

export const calculateExercises = (
  daily_exercises: number[],
  target: number
): Result => {
  console.log(daily_exercises);
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((day) => day > 0).length;
  const sumHours = daily_exercises.reduce((acc, curr) => acc + curr, 0);
  const average = sumHours / daily_exercises.length;
  const success = average >= target;

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Great job, you met your target!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not bad, but could be better.";
  } else {
    rating = 1;
    ratingDescription = "You need to increase your training days or intensity.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { daily_exercises, target } = parseArguments(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (error) {
  console.log("Error:");
}
