import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        },
        edit: {
            name: string
            url: string
        }
    };
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);


    const handelNavigate = (url: string): void => {
        navigate(url)
    };


    return (
        <div className="border-b border-borderColor bg-black w-full hover:bg-borderColor cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <button
                className="h-24 flex justify-between items-center w-full py-4 px-6 text-left  focus:outline-none"
            >
                <span className="font-bold text-3xl">{title}</span>
                <svg
                    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-custom ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                <div className="py-4 px-6">
                    <div className="text-white">
                        <div className='flex justify-start items-center gap-11'>
                            {content.create && <button onClick={() => handelNavigate(content.create.url)} className='bg-white text-black p-3 w-40 font-medium rounded-md' >{content.create.name}</button>}
                            {content.list && <button onClick={() => handelNavigate(content.list.url)} className='bg-white text-black p-3 w-40 font-medium rounded-md' >{content.list.name}</button>}
                            {content.edit && <button onClick={() => handelNavigate(content.edit.url)} className='bg-white text-black p-3 w-40 font-medium rounded-md' >{content.edit.name}</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Accordion: React.FC = () => {

    return (
        <div className="w-full bg-white shadow-md rounded-md">
            {items.map((item, index) => (
                <AccordionItem key={index} title={item.title} content={item.content} />
            ))}
        </div>
    );
};

export default memo(Accordion);