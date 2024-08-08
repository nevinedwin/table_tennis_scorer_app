import React from 'react'
import SetTable from './setTable'
import { IMatch } from '../../sampleData/match_data'

type DetailsPropTypes = {
    matchData: IMatch
}

const Details: React.FC<DetailsPropTypes> = ({ matchData }) => {
    return (
        <div className={``}>
            {/* sets table*/}
            <SetTable matchData={matchData} />

        </div>
    )
}

export default Details