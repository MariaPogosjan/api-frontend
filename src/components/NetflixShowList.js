import React, { useState, useEffect } from 'react'
import { API_URL } from '../reusable/urls'

const NetflixShowList = () => {
  const [movieList, setMovieList] = useState([])
  const [id, setId] = useState([])
  const [visble, setVisble] = useState(8)

  useEffect(() => {
    fetch(API_URL(id))
      .then((response) => response.json())
      .then((data) => setMovieList(data))
  }, [id])

  const loadMore = () => {
    setVisble(visble + 8)
  }

  return (
    <section className="main-container">
      <h1 className="header-title">Netflix Movies and TV-shows </h1>
      <div className="btn-container">
        <button className="btn" onClick={() => setId('')}>All</button>
        <button className="btn" onClick={() => setId('/?show=movie')}>Movie</button>
        <button className="btn" onClick={() => setId('/?show=tv show')}>TV-show</button>
      </div>
      <div className="movie-wrapper">
        {movieList.slice(0, visble).map((movie) => {
          return (
            <div className="item-card" key={movie.show_id}>
              <h3>{movie.title}</h3>
              <p>{movie.type}</p>
              <p>Release year {movie.release_year}</p>
            </div>
          )
        })}
      </div>
      {visble < movieList.length && (
        <div className="btn-container">
          <button className="btn" onClick={loadMore}>Load More</button>
        </div>
      )}
    </section>
  )
}

export default NetflixShowList