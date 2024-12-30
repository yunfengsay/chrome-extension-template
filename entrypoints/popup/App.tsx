import { sendMessage, onMessage } from 'webext-bridge/popup'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// 成功图标SVG组件
const CheckIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17L4 12" />
  </svg>
);

function App() {
  const [count, setCount] = useState(0);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleClick = async () => {
    if (buttonState !== 'idle') return;
    sendMessage('Inject.generateCode', { data: 'hi' }, 'window')


    setButtonState('loading');
    // 模拟异步操作
    setTimeout(() => {
      setCount(count => count + 1);
      setButtonState('success');
      
      // 2秒后重置状态
      setTimeout(() => {
        setButtonState('idle');
      }, 2000);
    }, 1500); // 加载动画持续1.5秒
  };

  return (
    <>
      <h1>WXT + React</h1>
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative' }}
      >
        <motion.button
          initial={{ opacity: 0.8, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            backgroundColor: buttonState === 'success' ? 'rgb(72, 187, 120)' : '#1a1a1a',
          }}
          transition={{
            backgroundColor: { duration: 0.3 }
          }}
          onClick={handleClick}
          style={{
            position: 'relative',
            width: '120px',
            height: '40px',
            borderRadius: '20px',
            border: 'none',
            outline: 'none',
            color: 'white',
            cursor: 'pointer',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            '&:focus': {
              boxShadow: '0 0 0 2px rgba(72, 187, 120, 0.2)',
            }
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* 加载动画 */}
          {buttonState === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                rotate: 360
              }}
              transition={{
                rotate: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                border: '2px solid #ffffff',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                transform: 'translate(0, 0)'
              }}
            />
          )}

          {/* 成功图标 */}
          {buttonState === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}  // 降低不透明度
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                color: 'white',
                transform: 'translate(0, 0)'
              }}
            >
              <CheckIcon />
            </motion.div>
          )}

          {/* 按钮文字 */}
          <motion.span
            animate={{
              opacity: buttonState === 'idle' ? 1 : 0,
              scale: buttonState === 'idle' ? 1 : 0.5
            }}
          >
            count is {count}
          </motion.span>
        </motion.button>
      </motion.div>
    </>
  );
}

export default App;
