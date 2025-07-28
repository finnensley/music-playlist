
const playlist = [];

const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const linkInput = document.getElementById("link");
const moodDropdown = document.getElementById("mood");
const songForm = document.getElementById("songForm");
const playlistContainer = document.getElementById("playlist");
const filterDropdown = document.getElementById("filterMood");
const shuffleBtn = document.getElementById("shuffleBtn");
const darkModeBtn = document.getElementById("toggleModeBtn");
console.log(titleInput, artistInput, linkInput, moodDropdown, songForm, playlistContainer, filterDropdown, shuffleBtn, darkModeBtn);


function loadPlaylist() {
    let customPlaylist = JSON.parse(localStorage.getItem("customPlaylist"));
    playlist.push(customPlaylist);
}
// console.log(playlist);

function savePlaylist() {
    localStorage.setItem("customPlaylist", JSON.stringify(playlist));
}
// console.log(playlist);


function renderPlaylist(songsToRender) {
    playlistContainer.innerHTML = "";
    songsToRender.forEach((song, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("song-card");
    newDiv.innerHTML = `<strong>${song.title}</strong><br>
  <em>Artist:</em> ${song.artist}<br>
  <em>Mood:</em> ${song.mood}<br>
  <a href="${song.link}" target="_blank">🎧 Listen</a><br>
  <button class="delete-btn" data-index="${index}">🗑️ Delete</button>`;
    
    playlistContainer.appendChild(newDiv);
    // console.log(song);
 });
  
const deleteBtn = document.querySelectorAll(".delete-btn");
deleteBtn.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", () => {
  const index = Number(deleteBtn.dataset.index);
    playlist.splice(index, 1);
    // console.log(playlist);
    savePlaylist();
    renderPlaylist(playlist);
})
});
};

// Looked up:
// const deleteBtn = document.querySelectorAll(".delete-btn");
// deleteBtn.forEach(function (deleteBtn) {
//   deleteBtn.addEventListener("click", function() {
//     //Get the song index from data-index ?
//     const index = parseInt(this.getAttribute("data-index"));
//     playlist.splice(index, 1);
//     savePlaylist();
//     renderPlaylist(playlist);
//   })
// });
// };

function addSong(e) {
    e.preventDefault();
    const newSong = {
        title: titleInput.value,
        artist: artistInput.value,
        mood: moodDropdown.value,
        link: linkInput.value,
    };
    playlist.push(newSong);
    savePlaylist();
    renderPlaylist(playlist);
    songForm.reset();
};


function filterPlaylist() {
    if (filterDropdown.value === "all") {
        renderPlaylist(playlist);
    } else {
      const filtered = playlist.filter(song => song.mood === filterDropdown.value);
    //   console.log(filtered);
      renderPlaylist(filtered);
    }
    //   console.log(filtered);
    }


    // 🔀 Step 8: Shuffle the playlist using Fisher-Yates algorithm
// 👉 Define a function called shufflePlaylist()
// Inside the function:
// - Loop from the end of the array to the beginning (i = length - 1; i > 0; i--)
// - Create a random index j: Math.floor(Math.random() * (i + 1))
// - Swap playlist[i] and playlist[j] using destructuring
// - After the loop, save and render the playlist again
// 🧪 Console log to confirm the playlist was shuffled

function shufflePlaylist() {
    for (let i = playlist.length - 1; i > 0; i--) {
       let j = Math.floor(Math.random() * (i + 1)); 
        [playlist[i], playlist[j]] = [playlist[j],playlist[i]]
        }
    
    savePlaylist();
    renderPlaylist(playlist);
    // console.log(playlist);
};


// 🌙 Step 9: Toggle between Dark Mode and Light Mode
// 👉 Define a function called toggleDarkMode()
// Inside the function:
// - Use classList.toggle("dark") on the body
// - Use contains("dark") to check if dark mode is active
// - Update toggle button text accordingly ("Light Mode" or "Dark Mode")
// - Save the theme preference in localStorage (key = "theme")
// 🧪 Console log to confirm dark mode toggle state
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkModeBtn.textContent = "Dark Mode";
        let theme = localStorage.getItem("dark" ? "Dark Mode" : "Light Mode");
        localStorage.setItem("theme", theme);
        // console.log(theme);
    }
}

// 💡 Step 10: Load the saved theme from localStorage
// 👉 Define a function called loadTheme()
// Inside the function:
// - Use getItem("theme") from localStorage
// - If it’s "dark", add the "dark" class to body and update toggle button text
// 🧪 Console log to confirm dark theme was loaded
// 🧪 Console log to confirm light/default theme
function loadTheme() {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        darkModeBtn.textContent = "Light Mode";
    };
}

songForm.addEventListener("submit", addSong);
filterDropdown.addEventListener("change", filterPlaylist);
shuffleBtn.addEventListener("click", shufflePlaylist);
darkModeBtn.addEventListener("click", toggleDarkMode);

loadPlaylist();
renderPlaylist(playlist);
loadTheme();
console.log(playlist);