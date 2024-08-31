import React, { createContext, ReactNode, useContext, useMemo, useRef, useState } from 'react'
import ManageLocalStorage, { localStorageKeys } from '../../utilities/ManageLocalStorage';

const { token } = localStorageKeys;

interface WebSocketContextType {
    isConnected: boolean;
    onConnect: (url: string) => void;
    onDisconnect: () => void;
    onReconnect: ()=> void;
    newMessage: any;
}

export const WebSocketContext = createContext<WebSocketContextType>({
    isConnected: false,
    onConnect: () => { },
    onDisconnect: () => { },
    onReconnect: ()=> {},
    newMessage: null
});

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [newMessage, setNewMessage] = useState<any>(null);

    const socket = useRef<WebSocket | null>(null);

    const onSocketOpen = () => {
        setIsConnected(true);
        // debugger
        console.log("Web Socket Connected");
    };

    const onSocketClose = () => {
        setIsConnected(false);
    };

    const onSocketMessage = (data: any) => {
        // debugger
        const parseObj = JSON.parse(data);
        setNewMessage(parseObj?.payload?.data);
    }

    const onConnect = (socketUrl: string) => {
        const idToken = ManageLocalStorage.get(token);
        if (socket.current?.readyState !== WebSocket.OPEN) {
            socket.current = new WebSocket(`${socketUrl}?token=${idToken}`);
            socket.current.addEventListener('open', onSocketOpen);
            socket.current.addEventListener('close', onSocketClose);
            socket.current.addEventListener('message', (event: any) => {
                onSocketMessage(event.data);
            });
        }
        
        // debugger
        console.log("Web Socket Connection Established");
    };

    const onReconnect = () => {
        if (isConnected) {
            socket.current?.close();
            // onConnect();
        }
    };

    const onDisconnect = () => {
        if (isConnected) {
            socket.current?.close();
            // debugger
            console.log("Web Socket Connection Closed");
        }
    };

    const memoizedValue = useMemo<WebSocketContextType>(() => ({
        isConnected,
        onConnect,
        onDisconnect,
        onReconnect,
        newMessage
    }), [isConnected, newMessage]);

    return (
        <WebSocketContext.Provider value={memoizedValue}>
            {children}
        </WebSocketContext.Provider>
    )
}



export const useSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error("Use Socket state must be within a auth provider");
    }
    return context;
};
