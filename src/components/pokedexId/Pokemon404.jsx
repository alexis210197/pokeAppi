import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import photo  from "../shared/poke.png"
import "./styles/pokemon404.css"
const Pokemon404 = () => {

    const navigate = useNavigate()
    const handleBack = e => {
      navigate("/pokedex")
    }
    return (
            <div className='container__error'>
            <img onClick={handleBack} className='byid__main-img' src={photo} alt="back" />
            {/* <Link to='/pokedex' >Return to Pokedex</Link> */}
        </div>
    )
}

export default Pokemon404 