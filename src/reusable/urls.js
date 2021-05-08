//export const API_URL = 'https://netflix-show.herokuapp.com/movies'

export const API_URL = (filter) => `https://netflix-show.herokuapp.com/movies${filter}`
