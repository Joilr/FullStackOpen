const parseArguments = (args: string[]): { height: number; weight: number } => {
  const height = Number(args[2]);
  if (isNaN(height)) throw new Error("height must be a number!");

  const weight = Number(args[3]);
  if (isNaN(weight)) throw new Error("weight must be a number!");

  return { height, weight };
};

export const calculateBmi = (height: number, weight: number): string => {
  const height_m = height / 100; //convert to meter
  const bmi = weight / height_m ** 2;

  if (bmi < 18.5) {
    return "Underweight (unhealthy weight)";
  } else if (bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight (unhealthy weight)";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log("Error:", e.message);
}
