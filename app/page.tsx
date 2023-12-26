"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { addMovie, addToBasket, addToLikedMovies } from "../store";

interface RootState {
  movies: { title: string; liked: boolean; inBasket: boolean }[];
  basket: string[];
  likedMovies: string[];
}
export default function Home() {
  const [movieTitle, setMovieTitle] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);
  const basket = useSelector((state: RootState) => state.basket);
  const likedMovies = useSelector((state: RootState) => state.likedMovies);
  const handleAddMovie = () => {
    const newMove = { title: movieTitle, inBasket: false, liked: false };
    dispatch(addMovie(newMove));
    setMovieTitle("");
  };

  const handleAddToBasket = (movie: string) => dispatch(addToBasket(movie));

  const handleAddToLikedMovies = (movie: string) =>
    dispatch(addToLikedMovies(movie));

  const buttonClass = classnames(
    "flex justify-center items-center ml-4 px-2 py-2 w-sm border shadow text-xs shadow-xl outline-none rounded-full bg-cyan-700 text-white font-bold hover:opacity-70 uppercase duration-500 hover:scale-105",
  );

  const liClass = classnames(
    "flex flex-col md:flex-row space-y-3 text-center font-bold md:space-y-0 md: space-x-2 bg-white rounded-lg shadow-xl px-4 py-10",
  );

  const ulClass = classnames(
    "mb-6 flex w-6xl flex-col space-y-6 md:space-y-0 md:space-x-4 md:flex-row",
  );

  return (
    <main className="flex flex-col items-center container-full p-10 bg-gray-100 min-h-screen m-0 w-6xl">
      <div className="mb-2">
        <h1>My movie list</h1>
      </div>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4 mb-4">
        <input
          type="text"
          className="p-2 text-gray-800 outline-none placeholder:text-gray-800 placehoder:uppercase placeholder:font-bold rounded-lg shadow-xl bg-white-100"
          placeholder="Add a movie"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e?.target?.value)}
        />
        <button onClick={handleAddMovie} className={buttonClass}>
          <img src="images/movie.svg" alt="add movie" />{" "}
          <span className="ml-2">Add Movie</span>
        </button>
      </div>
      <h2 className="mb-2">My Movies</h2>
      <ul className={ulClass}>
        {movies?.map((movie) => (
          <li key={movie?.title} className={liClass}>
            <h2>{movie?.title}</h2>
            <div className="flex flex-col lg:flex-row space-y-3 md:space-y-0">
              <button
                onClick={() => handleAddToBasket(movie?.title)}
                className={buttonClass}
              >
                {!movie?.inBasket ? (
                  <>
                    <img
                      src="images/cart.svg"
                      alt="add movie"
                      className="w-6 h-6"
                    />{" "}
                  </>
                ) : (
                  <>
                    <img
                      src="images/remove-cart.svg"
                      alt="add movie"
                      className="w-6 h-6"
                    />{" "}
                  </>
                )}
              </button>
              <button
                onClick={() => handleAddToLikedMovies(movie?.title)}
                className={buttonClass}
              >
                {!movie?.liked ? (
                  <>
                    <img src="images/like.svg" alt="Like" className="w-6 h-6" />{" "}
                  </>
                ) : (
                  <>
                    <img
                      src="images/dislike.svg"
                      alt="add movie"
                      className="w-6 h-6"
                    />{" "}
                  </>
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="mb-2">My Basket {basket.length}</h2>
      <ul className={ulClass}>
        {basket?.map((title) => (
          <li className={liClass} key={title}>
            {title}
          </li>
        ))}
      </ul>
      <h2 className="mb-2">Liked Movies {likedMovies.length}</h2>
      <ul className={ulClass}>
        {likedMovies?.map((title) => (
          <li className={liClass} key={title}>
            {title}
          </li>
        ))}
      </ul>
    </main>
  );
}
