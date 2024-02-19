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
): { weeklyHours: number[]; target: number } => {
  if (args[2].length < 4) throw new Error("Not enough arguments");

  const target = Number(args[3]);
  if (isNaN(target)) throw new Error("Target must be a number!");

  const weeklyHours = args[2].split(",").map((arg) => {
    const hour = Number(arg.trim());
    if (isNaN(hour)) {
      throw new Error("Weekly hours must be numbers!");
    }
    return hour;
  });

  return { weeklyHours, target };
};

export const calculateExercises = (
  weeklyHours: number[],
  target: number
): Result => {
  const periodLength = weeklyHours.length;
  const trainingDays = weeklyHours.filter((day) => day > 0).length;
  const sumHours = weeklyHours.reduce((acc, curr) => acc + curr, 0);
  const average = sumHours / weeklyHours.length;
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
  const { weeklyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(weeklyHours, target));
} catch (e) {
  console.log("Error:", e.message);
}
