import React, { useEffect, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { useAppSelector } from '@Hooks/redux.hook'
import { getTotalGenerations } from '../Generation/GenerationAPI'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { getCreatureInfo } from './CreatureAPI'

interface IResultDisplay {
  situation: string
  generation: number
}

const ResultDisplay: React.FC<IResultDisplay> = ({ situation, generation }) => {
  return (
    <Card className='text-dark shadow-sm mb-3 w-100'>
      <Card.Body>
        <Card.Title className='fw-bold'>Kết quả</Card.Title>
        <Card.Text>
          <strong>Tình huống:</strong>{' '}
          <span className='text-primary'>{situation}</span>
        </Card.Text>
        <Card.Text>
          <strong>Số thế hệ:</strong>{' '}
          <span className='text-success'>{generation}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

interface INode {
  id: string
  name: string
  generation: number
  target?: boolean
}

interface IEdge {
  source: string
  target: string
}

const organizeAncestor = (result: any, rootInfor: INode) => {
  const nodes: INode[] = [rootInfor]
  const links: IEdge[] = []

  const organize = (node: any, parentId: string) => {
    const infor = Object.keys(node)
    if (infor.length === 0) return

    const ids: string[] = []
    for (let i = 0; i <= 1; i++) {
      const id = `gen_${node.generation}_${infor[i]}`
      nodes.push({ id, name: infor[i], generation: node.generation })
      links.push({ source: id, target: parentId })
      ids.push(id)
    }

    if (infor.length > 0) {
      organize(node[infor[0]], ids[0])
      organize(node[infor[1]], ids[1])
    }
  }

  organize(result, rootInfor.id)
  return {
    nodes,
    links,
  }
}

interface ResultScreen {
  ancestor: {
    nodes: INode[]
    links: IEdge[]
  }
}

const Creature = () => {
  const situation = useAppSelector(
    (state) => state.generation.selectedSituation
  )
  const [numGenerations, setNum] = useState(0)
  const [creatureId, setCreatureId] = useState('0')
  const [creatureInfor, setResult] = useState<ResultScreen | null>(null)

  useEffect(() => {
    getTotalGenerations(situation)
      .then((num: any) => setNum(num))
      .catch((err) => setNum(0))
  }, [situation])

  if (situation === '') {
    return <>Chưa có tình huống nào được chọn</>
  }

  return (
    <>
      <h3 className='text-center'>Sinh vật</h3>
      <ResultDisplay situation={situation} generation={numGenerations} />
      <hr />
      <h3 className='text-center'>Nhập ID sinh vật</h3>
      <Form>
        <Form.Group>
          <Form.Control
            type='number'
            value={parseInt(creatureId)}
            onChange={(e) => setCreatureId(e.target.value)}
            placeholder='Nhập ID cá thể'
            min={1}
            max={numGenerations}
          />
        </Form.Group>
      </Form>
      <hr />
      <Button
        className='w-100'
        variant='outline-success'
        onClick={() => {
          getCreatureInfo(situation, creatureId)
            .then((resp: any) => {
              const ancestorsData = organizeAncestor(resp.ancestors, {
                id: `gen_${numGenerations}_${creatureId}`,
                name: creatureId,
                generation: numGenerations,
                target: true,
              })
              setResult({
                ancestor: ancestorsData,
              })
            })
            .catch((err) => console.log(err))
        }}
      >
        Yêu cầu dữ liệu
      </Button>
      <hr />
      {creatureInfor && (
        <>
          <h3 className='text-center'>Sơ đồ phả hệ</h3>
          <Container style={{ border: '1px solid gray' }}>
            <ForceGraph2D
              graphData={creatureInfor.ancestor}
              nodeAutoColorBy='generation'
              linkDirectionalArrowLength={10}
              nodeLabel={(node) => `Thế hệ: ${node.generation}`}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                const label = node.name
                const fontSize = 10 / globalScale
                ctx.font = `${fontSize}px Sans-Serif`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle = 'black'
                ctx.fillText(label, node.x, node.y + 20)

                ctx.beginPath()
                if (node.target) {
                  ctx.rect(node.x - 10, node.y - 10, 20, 20) // Vẽ hình vuông cho node mục tiêu
                } else {
                  ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false) // Vẽ hình tròn cho các node khác
                }
                ctx.fillStyle = node.color || 'blue'
                ctx.fill()
                ctx.strokeStyle = 'black'
                ctx.lineWidth = 1
                ctx.stroke()
              }}
            />
          </Container>
          <hr />
        </>
      )}
    </>
  )
}

export default Creature
