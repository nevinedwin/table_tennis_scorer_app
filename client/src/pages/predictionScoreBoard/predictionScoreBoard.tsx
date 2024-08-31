import React from 'react'
import Hoc from '../../components/hoc/hoc'
import LiveBoard from '../../components/dashboard/liveBoard'

const PredictionScoreBoard: React.FC = () => {
  return (
    <div>
      <LiveBoard/>
    </div>
  )
}

export default Hoc(PredictionScoreBoard)