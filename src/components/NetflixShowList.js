import React, { useState, useEffect } from 'react'
import { API_URL } from '../reusable/urls'

const NetflixShowList = () => {
  const [movieList, setMovieList] = useState([])
  const [id, setId] = useState([])
  const [visble, setVisble] = useState(9)
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(API_URL(id))
      .then((response) => response.json())
      .then((data) => setMovieList(data))
  }, [id])

  const loadMore = () => {
    setVisble(visble + 9)
  }

  const search = () => {
    if (input) {
      setMovieList(Object.values(movieList)
        .filter((show) => show.title === input || show.release_year === Number(input)))
    }
    setInput('')
  }

  return (
    <section className="main-container">
      <h1 className="header-title">Netflix Movies and TV-shows </h1>
      <div className="btn-container">
        <button type="button" className="btn" onClick={() => setId('')}>All</button>
        <button type="button" className="btn" onClick={() => setId('/?show=movie')}>Movie</button>
        <button type="button" className="btn" onClick={() => setId('/?show=tv show')}>TV-show</button>
      </div>
      <div className="btn-container">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="button" className="btn" onClick={search}>Search</button>
      </div>
      <div className="movie-wrapper">
        {movieList.slice(0, visble).map((movie) => {
          return (
            <div className="item-card" key={movie.show_id}>
              <div className="item-card-content">
                <h3>{movie.title} / {movie.release_year}</h3>
                <p className="item-card-listed-in">{movie.listed_in}</p>
                <p>{movie.description}</p>
              </div>
            </div>
          )
        })}
      </div>
      {visble < movieList.length && (
        <div className="btn-container">
          <button type="button" className="btn" onClick={loadMore}>More</button>
        </div>
      )}
    </section>
  )
}

export default NetflixShowList