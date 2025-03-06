import React from 'react'
import { useAppDispatch, useAppSelector } from '@Hooks/redux.hook'
import { Button, Form } from 'react-bootstrap'
import { getSituations } from './GenerationAPI'
import { onSelectedSituation, onUpdateSituation } from './Generation.store'

const GenerationSituation = () => {
  const dispatch = useAppDispatch()
  const situations = useAppSelector(
    (state) => state.generation.infor.situations
  )

  return (
    <>
      {situations.length > 0 && (
        <Form>
          <Form.Group controlId='situation'>
            <Form.Select
              onChange={(e) => {
                dispatch(onSelectedSituation(e.target.value))
              }}
            >
              <option value=''>Chọn tình huống</option>
              {situations.map((situation, index) => (
                <option key={index} value={situation.name}>
                  {situation.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      )}
      {situations.length === 0 && (
        <h4 className='text-center'>Chưa có tình huống nào</h4>
      )}

      <hr />
      <Button
        className='w-100'
        variant='outline-success'
        onClick={() => {
          getSituations()
            .then((resp) => dispatch(onUpdateSituation(resp)))
            .catch((resp) => dispatch(onUpdateSituation([])))
        }}
      >
        Lấy tình huống
      </Button>
    </>
  )
}

export default GenerationSituation
