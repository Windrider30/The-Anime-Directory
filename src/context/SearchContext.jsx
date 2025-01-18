import React, { createContext, useState } from 'react'

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAnime = async (query = '') => {
    setLoading(true)
    try {
      const url = query
        ? `https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=20`
        : 'https://kitsu.io/api/edge/anime?page[limit]=20'
      
      const response = await fetch(url)
      const data = await response.json()
      setAnimeList(data.data)
    } catch (error) {
      console.error('Error fetching anime:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      animeList,
      loading,
      fetchAnime
    }}>
      {children}
    </SearchContext.Provider>
  )
}
