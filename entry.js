import 'expo/build/Expo.fx';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import { Platform } from 'react-native';
import App from './App';
import 'react-native-gesture-handler';

// @see https://github.com/expo/expo/issues/18485
if ('web' === Platform.OS) {
  const rootTag = createRoot(document.getElementById('root') ?? document.getElementById('main'));
  rootTag.render(createElement(App));
} else {
  registerRootComponent(App);
}