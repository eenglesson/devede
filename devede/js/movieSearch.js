import { db } from './firebase.js';
import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

//search for the title in database
async function movieSearchDatabase() {
  try {
    movieDisplaySectionClear();
    const title = document.querySelector('#search-movie-name').value;

    const queryTitle = query(
      collection(db, 'movies'),
      where('title', '==', title.trim())
    );
    const movieTitle = await getDocs(queryTitle);

    if (movieTitle.empty) {
      document.querySelector('.movie-display-section').style.display = 'none';
      return alert('not yet in library');
    }
    document.querySelector('#search-movie-name').value = '';
    movieTitle.forEach((movie) => {
      displayMovie(movie.id, movie.data());
    });

    document.querySelector('.movie-display-section').style.display = 'block';
  } catch (error) {
    console.error('Problem finding movie in firebase', error);
  }
}

//create elements for html from Database, updates in Database if watched is true or false, delete the whole movie.
function displayMovie(id, movie) {
  const aside = document.createElement('aside');
  const titleElement = document.createElement('h2');
  const genreElement = document.createElement('h3');
  const dateElement = document.createElement('p');
  const checkbox = document.createElement('input');
  const deleteBtn = document.createElement('button');
  const watchedText = document.createTextNode('Watched: ');

  checkbox.type = 'checkbox';
  checkbox.checked = movie.watched;

  checkbox.addEventListener('click', (e) => {
    updateDoc(doc(db, 'movies', id), { watched: e.currentTarget.checked });
  });

  deleteBtn.innerHTML = 'Delete';

  deleteBtn.addEventListener('click', () => {
    if (confirm('Do you want to delete this movie?')) {
      deleteDoc(doc(db, 'movies', id));
      document.querySelector('.movie-display-section').style.display = 'none';
    }
  });

  titleElement.innerHTML = firstLetterCapitalize(movie.title);
  genreElement.innerHTML = movie.genre.toUpperCase();
  dateElement.innerHTML = movie.release;
  checkbox.innerHTML = movie.watched;

  aside.appendChild(titleElement);
  aside.appendChild(genreElement);
  aside.appendChild(dateElement);
  aside.appendChild(watchedText);
  aside.appendChild(checkbox);
  aside.appendChild(deleteBtn);

  document.querySelector('.movie-display-section').appendChild(aside);
}

//clear the Previous movie Displayed.
function movieDisplaySectionClear() {
  const displayMovieSection = document.querySelector('.movie-display-section');
  if (displayMovieSection != null) {
    while (displayMovieSection.firstChild) {
      displayMovieSection.removeChild(displayMovieSection.firstChild);
    }
  }
}

//Capitalize the first letter in a string
function firstLetterCapitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function initiateMovieDisplay() {
  document.querySelector('#movie-search-list').addEventListener('click', () => {
    movieSearchDatabase();
  });
}

export { initiateMovieDisplay };
