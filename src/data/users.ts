import { User } from '@/types/recommendation';

export const sampleUsers: User[] = [
  {
    id: 'user1',
    name: 'Current User',
    ratings: []
  },
  {
    id: 'user2',
    name: 'Alex Johnson',
    ratings: [
      { movieId: 1, rating: 5, userId: 'user2' }, // The Matrix
      { movieId: 2, rating: 4, userId: 'user2' }, // Inception
      { movieId: 5, rating: 5, userId: 'user2' }, // The Dark Knight
      { movieId: 7, rating: 4, userId: 'user2' }, // Interstellar
      { movieId: 10, rating: 4, userId: 'user2' }, // Fight Club
    ]
  },
  {
    id: 'user3',
    name: 'Sarah Chen',
    ratings: [
      { movieId: 3, rating: 5, userId: 'user3' }, // Pulp Fiction
      { movieId: 4, rating: 5, userId: 'user3' }, // The Godfather
      { movieId: 8, rating: 5, userId: 'user3' }, // The Shawshank Redemption
      { movieId: 9, rating: 4, userId: 'user3' }, // Goodfellas
      { movieId: 10, rating: 4, userId: 'user3' }, // Fight Club
    ]
  },
  {
    id: 'user4',
    name: 'Mike Rodriguez',
    ratings: [
      { movieId: 6, rating: 5, userId: 'user4' }, // Forrest Gump
      { movieId: 8, rating: 5, userId: 'user4' }, // The Shawshank Redemption
      { movieId: 11, rating: 4, userId: 'user4' }, // Titanic
      { movieId: 12, rating: 3, userId: 'user4' }, // Avatar
    ]
  },
  {
    id: 'user5',
    name: 'Emma Wilson',
    ratings: [
      { movieId: 1, rating: 4, userId: 'user5' }, // The Matrix
      { movieId: 2, rating: 5, userId: 'user5' }, // Inception
      { movieId: 7, rating: 5, userId: 'user5' }, // Interstellar
      { movieId: 12, rating: 4, userId: 'user5' }, // Avatar
    ]
  },
  {
    id: 'user6',
    name: 'David Park',
    ratings: [
      { movieId: 3, rating: 4, userId: 'user6' }, // Pulp Fiction
      { movieId: 4, rating: 5, userId: 'user6' }, // The Godfather
      { movieId: 5, rating: 4, userId: 'user6' }, // The Dark Knight
      { movieId: 9, rating: 5, userId: 'user6' }, // Goodfellas
      { movieId: 10, rating: 3, userId: 'user6' }, // Fight Club
    ]
  }
];