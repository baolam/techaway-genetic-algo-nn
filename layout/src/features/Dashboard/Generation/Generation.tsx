import React from 'react'
import GenerationSituation from './GenerationSituation'
import { useAppSelector } from '@Hooks/redux.hook'
import EnvironmentOverall from './EnvironmentOverall'
import ShowFitness from './ShowFitness'

const Generation = () => {
  const situation = useAppSelector(
    (state) => state.generation.selectedSituation
  )

  return (
    <>
      <h4 className='text-center'>Tình huống</h4>
      <GenerationSituation />
      <hr />
      {situation !== '' && (
        <>
          <h4 className='text-center'>Thông tin môi trường</h4>
          <EnvironmentOverall />
          <hr />
          <h4 className='text-center'>Biểu đồ điểm thích nghi qua thế hệ</h4>
          <ShowFitness />
        </>
      )}
    </>
  )
}

export default Generation
