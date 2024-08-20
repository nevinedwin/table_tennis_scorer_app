import React, { memo, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import Accordion from '../../components/accordian/accordian'
import Create from '../team/create'
import ListTeam from '../team/list'

const Options: React.FC = () => {

    const [component, setComponent] = useState<string>("create_team")

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex justify-center items-start'>
                <div className='w-[20%] p-3'>
                    <p className='text-center pt-4 pb-6 text-2xl font-bold'>Actions</p>
                    <Accordion setComponent={setComponent} component={component} />
                </div>
                <div className='w-[90%] border-l-[1px] border-borderColor h-full'>
                    {component === "create_team" && <Create />}
                    {component === "list_team" && <ListTeam />}
                </div>
            </div>
        </div>
    )
}

export default Hoc(memo(Options))