// main.js
import './components/file-browser.js';
import { model } from './model.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const browser = document.createElement('file-browser');
  app.appendChild(browser);
});