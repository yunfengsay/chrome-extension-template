import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface MessageProps {
    message: string;
    type: 'success' | 'error' | 'info';
}

const MessageContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;
const TypedMessageStyle = {
    success: {
        backgroundColor: 'rgb(72, 187, 120)',
    },
    error: {
        backgroundColor: 'rgb(255, 64, 64)',
    },
    info: {
        backgroundColor: 'rgb(255, 255, 255)',
    },
}

const Message: React.FC<MessageProps> = ({ message, type }) => {
    return <MessageContainer>
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            style={{
                backgroundColor: TypedMessageStyle[type].backgroundColor,
            }}
        >{message}</motion.div>
    </MessageContainer>;
};

// function call message.show(options: {message: string, duration: number})

function show(options: { message: string, duration: number, type: 'success' | 'error' | 'info' }) {
    const { message, duration, type } = options;
    const messageElement = <Message message={message} type={type} />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    // react 18
    createRoot(container).render(messageElement);
    setTimeout(() => {
        createRoot(container).unmount();
        container.remove();
    }, duration);
}

export default Message;
export { show };