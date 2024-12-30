import { onMessage, allowWindowMessaging, sendMessage } from 'webext-bridge/content-script'
import { NAMESPACE } from '@/constants'
export default defineContentScript({
  matches: ['*://*/*'],
  // world: 'MAIN',
  async main() {
    allowWindowMessaging(NAMESPACE)
    console.log('Injecting script...');
    await injectScript('/injected.js', {});
    console.log('Done!');  
    onMessage('Inject.generateCode', (message) => {
      console.log(message.data)
    })
  }
});
