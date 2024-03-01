import { useState, useEffect } from "react";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiary({
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    })
      .then((data) => {
        setDiaries(diaries.concat(data));
        setNewDate("");
        setNewVisibility("");
        setNewWeather("");
        setNewComment("");
      })
      .catch((error: Error) => {
        if (axios.isAxiosError<string>(error)) {
          // Check if error.response exists before trying to access error.response.data
          if (error.response) {
            const errorMessage =
              error.response.data || "An unknown error occurred";
            console.log(error.response);
            setErrorMessage(errorMessage);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          }
        }
      });
  };

  return (
    <div>
      {
        <form onSubmit={diaryCreation}>
          <h1>Add new entry</h1>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "1.25rem", // Responsive font size
              color: "red", // Dark grey color for better readability
              padding: "8px", // Adds spacing around the text
              fontFamily: "Arial, sans-serif", // Custom font family
            }}
          >
            {ErrorMessage}
          </h2>
          <div>
            Date:
            <input
              type="date"
              value={newDate}
              onChange={(event) => setNewDate(event.target.value)}
            />
          </div>
          <div>
            Visibility:
            <input
              type="radio"
              id="great"
              name="visibility"
              value="great"
              onChange={(event) => setNewVisibility(event.target.value)}
            />
            <label htmlFor="great">great</label>
            <input
              type="radio"
              id="good"
              name="visibility"
              value="good"
              onChange={(event) => setNewVisibility(event.target.value)}
            />
            <label htmlFor="good">good</label>
            <input
              type="radio"
              id="ok"
              name="visibility"
              value="ok"
              onChange={(event) => setNewVisibility(event.target.value)}
            />
            <label htmlFor="ok">ok</label>
            <input
              type="radio"
              id="poor"
              name="visibility"
              value="poor"
              onChange={(event) => setNewVisibility(event.target.value)}
            />
            <label htmlFor="poor">poor</label>
          </div>

          <div>
            Weather:
            <input
              type="radio"
              id="sunny"
              name="weather"
              value="sunny"
              onChange={(event) => setNewWeather(event.target.value)}
            />
            <label htmlFor="sunny">Sunny</label>
            <input
              type="radio"
              id="rainy"
              name="weather"
              value="rainy"
              onChange={(event) => setNewWeather(event.target.value)}
            />
            <label htmlFor="rainy">Rainy</label>
            <input
              type="radio"
              id="cloudy"
              name="weather"
              value="cloudy"
              onChange={(event) => setNewWeather(event.target.value)}
            />
            <label htmlFor="cloudy">Cloudy</label>
            <input
              type="radio"
              id="stormy"
              name="weather"
              value="stormy"
              onChange={(event) => setNewWeather(event.target.value)}
            />
            <label htmlFor="stormy">Stormy</label>
            <input
              type="radio"
              id="windy"
              name="weather"
              value="windy"
              onChange={(event) => setNewWeather(event.target.value)}
            />
            <label htmlFor="windy">Windy</label>
          </div>

          <div>
            Comment:
            <input
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
          </div>
          <button type="submit">add</button>
        </form>
      }
      <h1>Diary Entries</h1>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem", // Responsive font size
                color: "#333", // Dark grey color for better readability
                padding: "8px", // Adds spacing around the text
                fontFamily: "Arial, sans-serif", // Custom font family
              }}
            >
              {diary.date}
            </div>
            <br />
            <div>Visibility: {diary.visibility}</div>{" "}
            <div>Weather: {diary.weather}</div>{" "}
            <div>Comment: {diary.comment}</div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
