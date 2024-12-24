export default defineContentScript({
  matches: ['*://*/*'],
  // world: 'MAIN',
  async main() {
    console.log('Injecting script...');
    // @ts-ignore
    await injectScript('/main-world-content.js', {
    });
    console.log('Done!');  },
});
