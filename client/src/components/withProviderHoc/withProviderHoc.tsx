import React, { ComponentType } from 'react'

type ProviderPropType = {
    children: React.ReactNode;
}

type WithProviderHocType = <P extends Object>(
    Provider: ComponentType<ProviderPropType>
) => (WrappedComponent: ComponentType<P>) => React.FC<P>;

const WithProviderHoc: WithProviderHocType = (Provider) => (WrappedComponent) => (props) => {
    return (
        <Provider>
            <WrappedComponent {...props} />
        </Provider>
    )
};

export default WithProviderHoc;