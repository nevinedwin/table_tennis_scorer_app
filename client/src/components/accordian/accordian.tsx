import React, { memo, useState } from 'react';
import { items } from './accordianItems';

interface AccordionItemProps {
    title: string;
    content: {
        create: {
            name: string
            url: string
        },
        list: {
            name: string
            url: string
        }
    };
    setComponent: React.Dispatch<React.SetStateAction<string>>;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, setComponent }) => {


    const [isOpen, setIsOpen] = useState(false);


    const handelNavigate = (url: string): void => {
        setComponent(url);
    };


    return (
        <div className="border-b border-borderColor bg-bgColor w-full cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <button
                className="h-18 flex justify-between items-center w-full py-4 px-6 text-left  focus:outline-none"
            >
                <span className="font-bold text-md lg:text-xl text-center">{title}</span>
                <svg
                    className={`w-6 h-4 lg:h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-custom ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
                <div className="py-4 px-6">
                    <div className="text-white text-md lg:text-xl">
                        <div className='flex flex-col justify-start items-center gap-2'>
                            {content.create && <button onClick={() => handelNavigate(content.create.url)}
                                className='text-white border-[1px] hover:bg-white hover:text-black border-borderColor p-3 w-full lg:w-80 font-medium rounded-md' >{content.create.name}</button>}
                            {content.list && <button onClick={() => handelNavigate(content.list.url)} className=' text-white border-[1px] border-borderColor hover:bg-white hover:text-black p-3 w-full lg:w-80 font-medium rounded-md' >{content.list.name}</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


type AccordianPropTypes = {
    component: string;
    setComponent: React.Dispatch<React.SetStateAction<string>>;
};

const Accordion: React.FC<AccordianPropTypes> = ({ setComponent }) => {

    return (
        <div className="w-full rounded-md border-[1px] border-borderColor">
            {items.map((item, index) => (
                <AccordionItem key={index} title={item.title} content={item.content} setComponent={setComponent} />
            ))}
        </div>
    );
};

export default memo(Accordion);