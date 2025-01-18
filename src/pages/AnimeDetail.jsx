import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SearchContext } from '../context/SearchContext'
import './AnimeDetail.css'

function AnimeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [anime, setAnime] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const { searchQuery, fetchAnime } = useContext(SearchContext)

  React.useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`)
        const { data } = await response.json()
        setAnime(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching anime details:', error)
      }
    }

    fetchAnimeDetails()
  }, [id])

  if (loading) return <div>Loading...</div>

  return (
    <div className="anime-detail">
      <Helmet>
        <title>{anime.attributes.canonicalTitle} - Anime Website</title>
        <meta name="description" content={anime.attributes.synopsis} />
      </Helmet>

      {/* Home Button */}
      <button 
        className="home-button"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>

      <div className="detail-header">
        <img
          src={anime.attributes.posterImage?.large}
          alt={anime.attributes.canonicalTitle}
        />
        <div className="header-content">
          <h1>{anime.attributes.canonicalTitle}</h1>
          <p>{anime.attributes.synopsis}</p>
        </div>
      </div>
      <div className="detail-info">
        <h2>Details</h2>
        <p>Status: {anime.attributes.status}</p>
        <p>Episodes: {anime.attributes.episodeCount}</p>
        <p>Rating: {anime.attributes.averageRating}</p>
        <p>Age Rating: {anime.attributes.ageRatingGuide}</p>
        <div className="streaming-links">
          <h3>Where to Watch:</h3>
          <p>
            Check availability on: {' '}
            <a
              href={`https://www.justwatch.com/us/search?q=${encodeURIComponent(
                anime.attributes.canonicalTitle
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              JustWatch
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetail
