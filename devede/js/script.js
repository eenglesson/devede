import { initiateMovieAddSection } from './movieAdd.js';
import { initiateMovieDisplay } from './movieSearch.js';

document.addEventListener('DOMContentLoaded', () => {
  initiateMovieAddSection();
  initiateMovieDisplay();
});
