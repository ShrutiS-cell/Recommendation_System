import { Movie } from '@/types/recommendation';

// Import poster images
import matrixPoster from '@/assets/posters/matrix.jpg';
import inceptionPoster from '@/assets/posters/inception.jpg';
import pulpFictionPoster from '@/assets/posters/pulp-fiction.jpg';
import godfatherPoster from '@/assets/posters/godfather.jpg';
import darkKnightPoster from '@/assets/posters/dark-knight.jpg';
import forrestGumpPoster from '@/assets/posters/forrest-gump.jpg';
import interstellarPoster from '@/assets/posters/interstellar.jpg';
import shawshankPoster from '@/assets/posters/shawshank-redemption.jpg';
import goodfellasPoster from '@/assets/posters/goodfellas.jpg';
import fightClubPoster from '@/assets/posters/fight-club.jpg';
import titanicPoster from '@/assets/posters/titanic.jpg';
import avatarPoster from '@/assets/posters/avatar.jpg';

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Matrix",
    genre: ["Sci-Fi", "Action"],
    year: 1999,
    rating: 8.7,
    description: "A computer programmer discovers reality as he knows it is actually a simulation.",
    poster: matrixPoster,
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  },
  {
    id: 2,
    title: "Inception",
    genre: ["Sci-Fi", "Thriller"],
    year: 2010,
    rating: 8.8,
    description: "A thief who enters dreams to steal secrets is given the inverse task of planting an idea.",
    poster: inceptionPoster,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
  },
  {
    id: 3,
    title: "Pulp Fiction",
    genre: ["Crime", "Drama"],
    year: 1994,
    rating: 8.9,
    description: "The lives of two mob hitmen, a boxer, and others intertwine in violent and comedic ways.",
    poster: pulpFictionPoster,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"]
  },
  {
    id: 4,
    title: "The Godfather",
    genre: ["Crime", "Drama"],
    year: 1972,
    rating: 9.2,
    description: "The patriarch of an organized crime dynasty transfers control to his reluctant son.",
    poster: godfatherPoster,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"]
  },
  {
    id: 5,
    title: "The Dark Knight",
    genre: ["Action", "Crime", "Drama"],
    year: 2008,
    rating: 9.0,
    description: "Batman must accept one of the greatest psychological and physical tests of his heroism.",
    poster: darkKnightPoster,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    id: 6,
    title: "Forrest Gump",
    genre: ["Drama", "Romance"],
    year: 1994,
    rating: 8.8,
    description: "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.",
    poster: forrestGumpPoster,
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
  },
  {
    id: 7,
    title: "Interstellar",
    genre: ["Sci-Fi", "Drama"],
    year: 2014,
    rating: 8.6,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: interstellarPoster,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    genre: ["Drama"],
    year: 1994,
    rating: 9.3,
    description: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.",
    poster: shawshankPoster,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
  },
  {
    id: 9,
    title: "Goodfellas",
    genre: ["Crime", "Drama"],
    year: 1990,
    rating: 8.7,
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen.",
    poster: goodfellasPoster,
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
  },
  {
    id: 10,
    title: "Fight Club",
    genre: ["Drama", "Thriller"],
    year: 1999,
    rating: 8.8,
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
    poster: fightClubPoster,
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
  },
  {
    id: 11,
    title: "Titanic",
    genre: ["Romance", "Drama"],
    year: 1997,
    rating: 7.9,
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious Titanic.",
    poster: titanicPoster,
    director: "James Cameron",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"]
  },
  {
    id: 12,
    title: "Avatar",
    genre: ["Sci-Fi", "Action", "Adventure"],
    year: 2009,
    rating: 7.8,
    description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between two worlds.",
    poster: avatarPoster,
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"]
  }
];