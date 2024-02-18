const calculateBmi = (height: number, weight: number) => {
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

console.log(calculateBmi(180, 74));
