import React from 'react'
import { Container } from 'react-bootstrap'
import ShowElements from './ShowElements'
import { useAppDispatch, useAppSelector } from '@Hooks/redux.hook'
import EditEnvironment from './EditEnvironment'
import { onChangeShowModal } from './Environment.store'

const Environment = () => {
  const show = useAppSelector((state) => state.environment.showEditModal)
  const dispatch = useAppDispatch()

  const onHide = () => {
    dispatch(onChangeShowModal(false))
  }

  return (
    <>
      <Container className='mt-5'>
        <h3 className='text-center'>Các thông số môi trường</h3>
        <ShowElements />
        <EditEnvironment show={show} onHide={onHide} />
      </Container>
    </>
  )
}

export default Environment
