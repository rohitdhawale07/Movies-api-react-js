import React, { useState, useEffect } from "react";
import "./index.css"; // Import your main CSS file with Tailwind CSS imports

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = "https://imdb-top-100-movies.p.rapidapi.com";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "c16181903fmsh1033d4b795f17b4p107622jsnfd086ec0495b",
          "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        const moviesData = result.map((movie) => ({
          name: movie.title,
          release_year: movie.year,
          genre: movie.genre[0],
          description: movie.description,
          // You may need to replace this with the actual image URL field from the API
          image_url: movie.big_image,
        }));

        setMovies(moviesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-5 text-center underline">
        Top Movies
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-[70%] mx-auto">
        {movies.map((movie) => (
          <li key={movie.name} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{movie.name}</h2>
            <p className="text-gray-700">{movie.release_year}</p>
            <p className="text-gray-700">{movie.genre}</p>
            <p className="text-gray-700">{movie.description}</p>
            <img
              src={movie.image_url}
              alt={movie.name}
              className="mt-4 w-full h-auto max-w-full max-h-68"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
