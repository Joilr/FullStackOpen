interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (weeklyHours: number[], target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
