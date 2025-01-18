import React from 'react'
    import { Link } from 'react-router-dom'

    function AnimeCard({ anime }) {
      return (
        <Link to={`/anime/${anime.id}`} className="anime-card">
          <img
            src={anime.attributes.posterImage?.medium}
            alt={anime.attributes.canonicalTitle}
          />
          <div className="card-content">
            <h3>{anime.attributes.canonicalTitle}</h3>
            <p>{anime.attributes.synopsis?.substring(0, 100)}...</p>
          </div>
        </Link>
      )
    }

    export default AnimeCard
