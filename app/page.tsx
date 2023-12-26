"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

export default function Home() {
  const [movieTitle, setMovieTitle] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector(
    (state: {
      movies: { title: string; liked: boolean; inBasket: boolean }[];
    }) => state.movies,
  );
  const basket = useSelector((state: { basket: [] }) => state.basket);
  const likedMovies = useSelector(
    (state: { likedMovies: [] }) => state.likedMovies,
  );
  const handleAddMovie = () => {
    dispatch({
      type: "ADD_MOVIE",
      payload: { title: movieTitle, inBasket: false, liked: false },
    });
    setMovieTitle("");
  };

  const handleAddToBasket = (movie: string) =>
    dispatch({ type: "ADD_TO_BASKET", payload: movie });

  const handleAddToLikedMovies = (movie: string) =>
    dispatch({ type: "LIKE_MOVIE", payload: movie });

  const buttonClass = classnames(
    "ml-4 px-3 py-2 border shadow shadow-xl outline-none rounded-full bg-cyan-700 text-white font-bold hover:opacity-70 uppercase duration-500 hover:scale-110",
  );

  return (
    <main className="container mx-auto p-10">
      <div>
        <h1>My movie list</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Add a movie"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e?.target?.value)}
        />
        <button onClick={handleAddMovie} className={buttonClass}>
          Add Movie
        </button>
      </div>
      <h2>My Movies</h2>
      <ul>
        {movies?.map((movie) => (
          <li key={movie?.title}>
            {movie?.title}
            <button
              onClick={() => handleAddToBasket(movie?.title)}
              className={buttonClass}
            >
              {!movie?.inBasket ? "Add to Basket" : "Remove from Basket"}
            </button>
            <button
              onClick={() => handleAddToLikedMovies(movie?.title)}
              className={buttonClass}
            >
              {!movie?.liked ? "Like" : "Dislike"}
            </button>
          </li>
        ))}
      </ul>
      <h2>My Basket {basket.length}</h2>
      <ul>{basket?.map((title) => <li key={title}>{title}</li>)}</ul>
      <h2>Liked Movies {likedMovies.length}</h2>
      <div>{likedMovies?.map((title) => <li key={title}>{title}</li>)}</div>
    </main>
  );
}
