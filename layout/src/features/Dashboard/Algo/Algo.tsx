import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { getAlgorithmInfo } from './AlgoAPI'

interface IAlgo {
  mutation_rate: number
  cross_over_rate: number
  remove_creature_rate: number
  remove_stochastic_rate: number
  w_energy: number
  w_food: number
  w_fight: number
  w_rain: number
  w_pressure: number
  w_adverse: number
  num_saved_generation: number
}

const Algo = () => {
  const [infor, setInfor] = useState<IAlgo | null>(null)
  const retrieveInfor = () => {
    getAlgorithmInfo()
      .then((resp: any) => setInfor(resp))
      .catch((err) => {
        console.log(err)
        setInfor(null)
      })
  }

  useEffect(() => {
    if (infor === null) {
      retrieveInfor()
    }
  }, [infor])

  return (
    <>
      <Card className='text-dark shadow-sm mb-3 w-100'>
        <Card.Body>
          <Card.Title className='text-center'>
            Thông tin cài đặt thuật toán di truyền
          </Card.Title>

          <Card.Text>
            <strong>Tỉ lệ đột biến (%): </strong>
            <span className='text-primary'>
              {infor ? infor.mutation_rate * 100 : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>Tỉ lệ lai ghép (%): </strong>
            <span className='text-primary'>
              {infor ? infor.cross_over_rate * 100 : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>Tỉ lệ loại bỏ sinh vật (%): </strong>
            <span className='text-primary'>
              {infor ? infor.remove_creature_rate * 100 : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>Ngưỡng quyết định hành vi chọn lựa: </strong>
            <span className='text-primary'>
              {infor ? infor.remove_stochastic_rate : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>Số thế hệ lưu trữ: </strong>
            <span className='text-primary'>
              {infor ? infor.num_saved_generation : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Subtitle className='text-center'>
            Chỉnh thông tin nơi thư mục resources/database (những file đuôi json)
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <hr />
      <Card className='text-dark shadow-sm mb-3 w-100'>
        <Card.Body>
          <Card.Title className='text-center'>
            Thông tin cài đặt hàm thích nghi
          </Card.Title>

          <Card.Text>
            <strong>Tầm quan trọng của tiêu thụ năng lượng sinh vật: </strong>
            <span className='text-primary'>
              {infor ? infor.w_energy : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>
              Tầm quan trọng của tỉ lệ tồn tại thức ăn trong môi trường:{' '}
            </strong>
            <span className='text-primary'>
              {infor ? infor.w_food : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>Tầm quan trọng của việc chiến đấu: </strong>
            <span className='text-primary'>
              {infor ? infor.w_fight : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>Tầm quan trọng của mưa: </strong>
            <span className='text-primary'>
              {infor ? infor.w_rain : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>Tầm quan trọng của áp suất khí quyển: </strong>
            <span className='text-primary'>
              {infor ? infor.w_pressure : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Text>
            <strong>So với môi trường lí tưởng: </strong>
            <span className='text-primary'>
              {infor ? infor.w_adverse : 'Chưa có thông tin'}
            </span>
          </Card.Text>

          <Card.Subtitle className='text-center'>
            Chỉnh thông tin nơi thư mục resources/database/default_weight_fitness.json
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <hr />
      <Button
        className='w-100'
        variant='outline-success'
        onClick={() => retrieveInfor()}
      >
        Yêu cầu dữ liệu
      </Button>
    </>
  )
}

export default Algo
