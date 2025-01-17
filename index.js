const COHORT = "2410-FTB-ET-WEB-ABM";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

// === State ===

const state = {
  artists: [],
};

/** Updates state with artists from API */
async function getArtists() {
  // console.log(API_URL);
  try {
    const response = await fetch(API_URL);
    // console.log(`RESPONSE => ${response}`);
    const data = await response.json();
    // console.log(`DATA => ${data}`);
    state.artists = data.data;
    // console.log(`state.artists => ${state.artists}`);
  } catch (error) {
    console.error(error);
  }
}

/** Asks the API to create a new artist based on the given `artist` */
async function addArtist(artist) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artist),
    });
    const json = await response.json();

    if (json.error) {
      throw new Error(json.error.message);
    }
  } catch (error) {
    console.error(error);
  }
}

// === Render ===

/** Renders artists from state */
function renderArtists() {
  const artistElements = state.artists.map((artist) => {
    const artistElement = document.createElement('li');
    artistElement.innerHTML = 
      `<h2>${artist.name}</h2>
      <img src="${artist.imageUrl}" />
      <p>${artist.description}</p>`;
    console.log(artistElement.textContent);
    return artistElement;
  })
  const content = document.querySelector('#artists');
  content.replaceChildren(...artistElements);
}

/** Syncs state with the API and rerender */
async function render() {
  await getArtists();
  renderArtists();
}

// === Script ===

render();

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Assign the values from user input
  const artist = {
    name: form.artistName.value,
    description: form.description.value,
    imageUrl: form.imageUrl.value,
  };
  
  // Call addArtist function
  await addArtist(artist);

  // Re render
  render();
});