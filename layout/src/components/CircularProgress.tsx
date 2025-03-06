import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface CircularProgressProps {
  value: number
  label: string
  text: string
  color?: string
  min: number
  max: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  text,
  label,
  min = 0,
  max = 100,
  color = '#3498db',
}) => {
  const clampedValue = Math.max(min, Math.min(value, max))

  // Chuyển đổi giá trị sang phần trăm so với min - max
  const percentage = ((clampedValue - min) / (max - min)) * 100

  return (
    <div style={{ width: 150, margin: 5, textAlign: 'center' }}>
      <CircularProgressbar
        value={percentage}
        text={text}
        circleRatio={0.75} // Chỉ hiển thị 3/4 vòng tròn
        strokeWidth={12} // Tăng độ dày đường vẽ
        styles={buildStyles({
          textSize: '16px',
          pathColor: color,
          textColor: '#333',
          trailColor: '#ddd',
          rotation: 0.625, // Xoay để bắt đầu từ góc mong muốn
          strokeLinecap: 'butt', // Đầu nét vẽ không bị tròn
        })}
      />
      <p style={{ marginTop: 8, fontWeight: 'bold' }}>{label}</p>
    </div>
  )
}

export default CircularProgress
