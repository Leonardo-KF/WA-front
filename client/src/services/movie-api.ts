const baseUrl = "http://localhost:3333/movies/";

export const movieApi = {
  getMovies: async (page: number) => {
    const response = await fetch(baseUrl + "find/page/" + page);
    const movies = await response.json();
    return movies;
  },
  updateMovies: async () => {
    const response = await fetch(baseUrl + "update");
    const movies = await response.json();
    return movies;
  },
};
