import { createStore } from "redux";

type Movie = {
  title: string;
  inBasket: boolean;
  liked: boolean;
};

type State = { movies: Movie[]; basket: string[]; likedMovies: string[] };

type Action =
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "ADD_TO_BASKET"; payload: string }
  | { type: "LIKE_MOVIE"; payload: string };

const initialState: State = {
  movies: [
    { title: "The Godfather", inBasket: false, liked: false },
    { title: "The Terminator", inBasket: false, liked: false },
    { title: "The Professional", inBasket: false, liked: false },
  ],
  basket: [],
  likedMovies: [],
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.title === action.payload
            ? { ...movie, inBasket: !movie.inBasket }
            : { ...movie },
        ),
        basket: state.basket.includes(action.payload)
          ? [...state.basket].filter((movie) => movie !== action.payload)
          : [...state.basket, action.payload],
      };
    case "LIKE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.title === action.payload
            ? { ...movie, liked: !movie.liked }
            : { ...movie },
        ),
        likedMovies: state.likedMovies.includes(action.payload)
          ? [...state.likedMovies].filter((movie) => movie !== action.payload)
          : [...state.likedMovies, action.payload],
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
