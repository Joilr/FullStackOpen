import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    height: height,
    weight: weight,
    bmi: bmi,
  });
});

app.post("/exercises", (_req, res) => {
  const { daily_exercises, target } = _req.body;

  if (!target || isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((elem) => !isNaN(Number(elem)))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
