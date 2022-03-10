import React, { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MDSpinner from 'react-md-spinner'
import MainContext from '../contexts/MainContext'

import { usePagination, useTitle } from '../utils/hooks'
import { usePokemonData } from '../utils/dataHooks'
import { isIndexInBounds, calculateCount } from '../utils/utilFunctions.js'
import CIndex from '../components/components.index.js'

const Home = ({ title }) => {
  // simple hooks
  const { currentPage } = useParams()
  let navigate = useNavigate()
  useTitle(title)

  // pagination hooks
  const {
    pageLimit,
    activePageNumber,
    setActivePageNumber,
    urlLimit,
    imageStyle,
    setImageStyle,
  } = useContext(MainContext)
  const { pageCount, offset } = usePagination(currentPage)
  const [filteredPageCount, setFilteredPageCount] = useState(0)
  const [searchPageCount, setSearchPageCount] = useState(null)

  // pokemon data hook
  const [pokemonObject, urlsMap, dataProcessed] = usePokemonData()

  // filter state
  const [filterType, setFilterType] = useState('none')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // set active page from url param
    setActivePageNumber(currentPage)
    localStorage.setItem('activePageNumber', currentPage)
  }, [dataProcessed, currentPage])

  const handleFilter = (e) => {
    const targetType = e.target.attributes.value.value
    setFilterType(targetType)
    const filteredLength = urlsMap.filter((url) =>
      pokemonObject[url.url]?.types.some((type) => type.name == targetType)
    ).length

    navigate('/1', {
      replace: true,
    })

    setFilteredPageCount(calculateCount(filteredLength, pageLimit))
  }

  const handleSearch = (e) => {
    const localSearchQuery = e.target.value
    setSearchQuery(localSearchQuery)

    const filteredLength = !localSearchQuery
      ? urlLimit
      : urlsMap.filter(
          (url) =>
            pokemonObject[url.url]?.name
              .toLowerCase()
              .indexOf(localSearchQuery) == 0
        ).length

    navigate('/1', {
      replace: true,
    })

    setSearchPageCount(calculateCount(filteredLength, pageLimit))
  }

  const handleUpdateImage = (e) => {
    const value = e.target.attributes.value.value
    setImageStyle(value)
  }

  const { Pagination, RenderFromType, Dropdown } = CIndex

  return (
    <div className="flex flex-col justify-center items-center px-10 py-8 w-full text-white">
      {!dataProcessed ? (
        <MDSpinner />
      ) : (
        <>
          <Dropdown className="mb-12" handler={handleFilter} type="filter" />
          <Dropdown
            className="mb-12"
            handler={handleUpdateImage}
            type="image"
          />
          <input
            className="text-black w-32"
            type="search"
            name="search"
            onChange={handleSearch}
          />

          <Pagination
            className={`mb-7`}
            pageCount={pageCount}
            filteredPageCount={filteredPageCount}
            searchPageCount={searchPageCount}
            activePage={activePageNumber}
          />
          <div className="w-full grid gap-y-14 gap-x-5 place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {urlsMap
              .filter((url) =>
                filterType == 'none'
                  ? true
                  : pokemonObject[url.url]?.types.some(
                      (type) => type.name == filterType
                    )
              )
              .filter((url) =>
                !searchQuery
                  ? true
                  : pokemonObject[url.url]?.name
                      .toLowerCase()
                      .indexOf(searchQuery) == 0
              )
              .map((url, i) =>
                isIndexInBounds(offset, pageLimit, i) ? (
                  <RenderFromType
                    render="card"
                    name={pokemonObject[url.url]?.name}
                    sprites={pokemonObject[url.url]?.sprites}
                    types={pokemonObject[url.url]?.types}
                    key={i}
                  />
                ) : null
              )}
          </div>
          <Pagination
            className="mt-7"
            pageCount={pageCount}
            filteredPageCount={filteredPageCount}
            searchPageCount={searchPageCount}
            activePage={activePageNumber}
          />
        </>
      )}
    </div>
  )
}

export default Home
