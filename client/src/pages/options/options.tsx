import React, { memo, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import Accordion from '../../components/accordian/accordian'
import Create from '../team/create'
import ListTeam from '../team/list'
import CreateMatch from '../match/create'
import ListMatches from '../match/list'

const Options: React.FC = () => {

    const [component, setComponent] = useState<string>("")

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex items-start lg:flex-row flex-col'>
                <div className='lg:w-[20%] w-full px-7 lg:p-3'>
                    <p className='text-center pt-4 pb-6 text-xxl lg:text-2xl font-bold'>Actions</p>
                    <Accordion setComponent={setComponent} component={component} />
                </div>
                {
                    component && (
                        <div className='w-full lg:w-[90%] lg:border-l-[1px] lg:border-borderColor h-full p-2 lg:p-0'>
                            {component === "create_team" && <Create />}
                            {component === "list_team" && <ListTeam />}
                            {component === "create_match" && <CreateMatch />}
                            {component === "list_match" && <ListMatches />}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Hoc(memo(Options))