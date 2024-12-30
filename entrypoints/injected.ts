import { sendMessage, setNamespace, onMessage } from 'webext-bridge/window'
import { NAMESPACE } from '@/constants'
export default defineUnlistedScript(async () => {
    setNamespace(NAMESPACE)
    console.log('Hello from the injected world');
    // 接收 popup 消息
    onMessage('Inject.generateCode', (message) => {
        console.log('success in injected --------------- ', message.data)
        sendMessage('Inject.generateCode.callback', { data: 'injected -> content' }, 'popup')   
    })
});