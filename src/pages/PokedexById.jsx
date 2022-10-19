import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/shared/Header'
import Pokemon404 from '../components/pokedexId/Pokemon404'
import './styles/pokedexById.css'
import Pokeball from '../components/pokedexId/Pokeball'
import Line from '../components/pokedexId/Line'
import photo  from "../assets/poke.png"

const PokedexById = () => {

  const { id } = useParams()

  const [pokemon, setPokemon] = useState()
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then(res => setPokemon(res.data))
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
  }, [])

  
  const colorType = pokemon?.types[0].type.name
  const navigate = useNavigate()
  const handleBack = e => {
    navigate("/pokedex")
  }
  
  if (hasError) {
    return <Pokemon404 />
  }
  return (
    <article className='byid' >
      <header>
        <Header />
        <img className='pokedexred__img' src='/images/pokedex/pokedexred.jpg' alt='pokedex' />
      </header>
      <img onClick={handleBack} className='byid__main-img' src={photo} alt="back" />
      <main className='byid__main' >
        <section className='byid__section-1' >
          <div className={`byid__container-img bg-${colorType} `}  >
            <img className='byid__img' src={pokemon?.sprites.other['official-artwork'].front_default} />
          </div>
          <div className={`byid__id letter-${colorType} `}>
            <p  >#{pokemon?.id}</p>
          </div>
          <div className={`byid__name letter-${colorType}`}>
            <h2 className="byid__name-lines">{pokemon?.name}</h2>
          </div>
          <div className='p__container'>
          
            <p className='byid__p' ><span className='byid__p-span' >Weight</span>{pokemon?.weight}</p>
            <p className='byid__p' ><span className='byid__p-span' >Height</span>{pokemon?.height}</p>
          </div>
          <div className='byid__list' >
            <h4 className='byid__list-type' >Type</h4>
            <ul className='byid__ul-type'>
              {
                pokemon?.types.map(type => (
                  <li key={type.type.url} className={`byid__list-item item__type bg-${type.type.name} `} >{type.type.name}</li>
                ))
              }
            </ul>
            <h4 className='byid__list-ability' >Abilities</h4>
            <ul className='byid__ul-ability' >
              {
                pokemon?.abilities.map(ability => (
                  <li key={ability.ability.url} className='byid__list-item' >{ability.ability.name}</li>
                ))
              }
            </ul>
          </div>
          <div className='byid__section1-container' >
            <h3>Stats</h3>
            <Line />
            <Pokeball />
          </div>
          <div>
            <ul className='byid__bar-progress'>
              {
                pokemon?.stats.map(stat => (
                  <>
                    <div className="progress__value">
                      <p>{stat.stat.name}</p>
                      <p>{`${stat.base_stat}/150`}</p>
                    </div>
                    <li className="progress">
                      <div className="progress-bar" style={{ width: `${stat.base_stat * 100 / 150}%` }}></div>
                    </li>
                  </>
                ))
              }
            </ul>
          </div>
        </section>
        <section className='byid__section-2' >
          <div className='byid__section2-container' >
            <h3 className='byid__move' >Movements</h3>
            <Line />
            <Pokeball />
          </div>
          <ul className='byid__move-container' >
            {
              pokemon?.moves.map(move => (
                <li className='move__item' >{move.move.name}</li>
              ))
            }
          </ul>
        </section>
      </main>
    </article>
  )
}

export default PokedexById