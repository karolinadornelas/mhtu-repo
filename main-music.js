const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const songName = document.getElementById("songName");
const songArtist = document.getElementById("songArtist");


/*revisar isso pq ta confuso e baixar as musicas???*/
const songs = [
    "./scr/img/music/audio/just-for-me.mp3",
    "./scr/img/music/audio/say-ok.mp3",
    "./scr/img/music/audio/supernatural.mp3",
    "./scr/img/music/audio/make-you-mine.mp3",
    "./scr/img/music/audio/passion.mp3",
];

const covers = [
    "./scr/img/music/icons/just-for-me.jpg",
    "./scr/img/music/icons/say-ok.jpg",
    "./scr/img/music/icons/supernatural.jpg",
    "./scr/img/music/icons/make-you-mine.jpg",
    "./scr/img/music/icons/passion.jpg",
];

const songNames = [
    "just for me",
    "say ok",
    "supernatural",
    "make you mine",
    "passion",
];
const songArtists = [
    "pinkpantheress",
    "vanessa hudgens",
    "new jeans",
    "madison beer",
    "pinkpantheress",
];


let currentSongIndex = 0;

function loadSong() {
    audioPlayer.src = songs[currentSongIndex];
    cover.src = covers[currentSongIndex];
    songName.textContent = songNames[currentSongIndex];
    songArtist.textContent = songArtists[currentSongIndex];
}

function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

playBtn.addEventListener("click", togglePlay);

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
    if (!audioPlayer.paused) audioPlayer.play();
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; /*?*/
    loadSong();
    if (!audioPlayer.paused) audioPlayer.play();
});

audioPlayer.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audioPlayer;
    progressBar.value = (currentTime / duration) * 100;
});

progressBar.addEventListener("change", () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

loadSong();