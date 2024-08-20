
import React, { useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import TeamForm from '../../components/form/teamForm';

const CreateTeam: React.FC = () => {

    const [teamData, setTeamData] = useState({});

    return (
        <div className='h-full w-full m-auto max-w-[750px] '>
            <div className='flex flex-col items-center justify-center pt-20'>
                <h1 className='text-3xl font-bold'>Create a Team </h1>
                <h4 className='opacity-50'>Complete the below fields to create a team</h4>
                <TeamForm />
            </div>
        </div>
    )
}

export default Hoc(CreateTeam);