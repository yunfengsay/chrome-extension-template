import { allowWindowMessaging, onMessage, sendMessage } from 'webext-bridge/content-script'
import { NAMESPACE } from '@/constants'
export default defineContentScript({
  matches: ['*://*/*'],
  // world: 'MAIN',
  async main() {
    allowWindowMessaging(NAMESPACE)
    console.log('Injecting script...');
    await injectScript('/injected.js', {});
    console.log('Done!');
  }
});
