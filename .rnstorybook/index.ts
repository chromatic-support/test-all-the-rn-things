import { view } from './storybook.requires';

// In-memory storage fallback. @react-native-async-storage/async-storage v3
// fails Android release builds (storage-android:1.0.0 is not published to
// Maven Central or JitPack). If real persistence is needed, use v2 instead.
const store = new Map<string, string>();
const storage = {
  getItem: async (key: string) => store.get(key) ?? null,
  setItem: async (key: string, value: string) => { store.set(key, value); },
};

const StorybookUIRoot = view.getStorybookUI({
  storage,

  // Required for Chromatic capture
  enableWebsockets: true,
  host: 'react-native.capture.chromatic.com',
  port: 7007,
  secured: true,

  // Disabled for Chromatic capture; enabled for local development
  onDeviceUI: __DEV__,
  shouldPersistSelection: false,
});

export default StorybookUIRoot;
