import React, { ReactNode, useContext, useState } from 'react';
import { AmplifyConfigType } from './amplifyContextType';
import setConfigAmplify from '../../utilities/amplifyConfig';


const AmplifyContext = React.createContext<{ config: AmplifyConfigType | null, setConfigValue: (awsConfig: AmplifyConfigType) => void } | undefined>(undefined)

const AmplifyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [config, setConfig] = useState<AmplifyConfigType | null>(null);

    const setConfigValue = (awsConfig: AmplifyConfigType) => {
        if(awsConfig){
            setConfig(awsConfig);
            setConfigAmplify(awsConfig as AmplifyConfigType);
        }
    }

    return (
        <AmplifyContext.Provider value={{ config, setConfigValue }}>
            {children}
        </AmplifyContext.Provider>
    )
};


export const useAmplifyContext = () => {
    const context = useContext(AmplifyContext);
    if (context === undefined) {
        throw new Error("Use Auth state must be within a auth provider");
    }
    return context;
}

export default AmplifyContextProvider;