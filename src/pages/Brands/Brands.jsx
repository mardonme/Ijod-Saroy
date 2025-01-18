import React from 'react'
import { useInfoContext } from '../../context/InfoContext'
import Card from '../../components/Card/Card'
import { useParams } from 'react-router-dom'

const Brands = () => {
    const {cars} = useInfoContext()
    const {id} = useParams()
    const result = cars.filter(car => car?.categoryId?._id === id)

  return (
    <div className="container">
        <div className='cars-box'>
            {result.length > 0 ? result.map(res => {
                return (
                    <Card key={res._id} car={res}/>
                )
            }): <h2>Cars not foud</h2>}
        </div>
    </div>
  )
}

export default Brands