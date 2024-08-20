import React, { memo } from 'react'
import Hoc from '../../components/hoc/hoc'
import Accordion from '../../components/accordian/accordian'

const Options: React.FC = () => {
    return (
        <div className='w-full'>
            <Accordion />
        </div>
    )
}

export default Hoc(memo(Options))