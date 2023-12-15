import { db } from './firebase.js';
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

//adds movie to the database, checks if input fields have a value.
function initiateMovieAddSection() {
  const movieAddBtn = document.querySelector('#movie-add-list');
  movieAddBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('#movie-search-add');
    const formData = new FormData(form);
    const title = formData.get('title');
    const genre = formData.get('genre');
    const releaseDate = formData.get('date');

    if (!title.trim() || !genre.trim() || !releaseDate) {
      alert('Fill in the Title, Genre and Date');
    } else {
      movieAddDatabase(title, genre, releaseDate);
      clearMovieAddSection();
    }
  });
}

//Add a new movie to database
async function movieAddDatabase(title, genre, releaseDate) {
  try {
    const exist = await movieExistDatabase(title);

    if (exist) {
      alert('Movie exists');
      return;
    }

    await addDoc(collection(db, 'movies'), {
      title: title,
      genre: genre,
      release: releaseDate,
      watched: false,
    });
  } catch (error) {
    console.error('Problem adding document', error);
  }
}

//checks if movie exist in database
async function movieExistDatabase(title) {
  const queryTitle = query(
    collection(db, 'movies'),
    where('title', '==', title.trim())
  );

  const movieExist = await getDocs(queryTitle);
  return !movieExist.empty;
}

// Clear input fields value.
function clearMovieAddSection() {
  document.querySelector('#movie-title-add').value = '';
  document.querySelector('#movie-genre-add').value = '';
  document.querySelector('#release-date-add').value = '';
}

export { initiateMovieAddSection };
