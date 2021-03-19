const player = document.querySelector(".player");
const video = document.querySelector("video");

const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");

const volumeIcon = document.getElementById("change-volume");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");

const currentTime = document.querySelector(".time-elapsed");
const currentDuration = document.querySelector(".time-duration");

const selectSpeed = document.querySelector("select");

const playBtn = document.getElementById("play-btn");
const fullScreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //
const replaceIcon = (a, b) => {
  playBtn.classList.replace(a, b);
};
const pauseUtil = () => {
  video.pause();
  replaceIcon("fa-pause", "fa-play");
};
const playUtil = () => {
  video.play();
  replaceIcon("fa-play", "fa-pause");
};
const togglePlay = () => {
  video.paused ? playUtil() : pauseUtil();
};

// Progress Bar ---------------------------------- //
const displayTime = (timeInSeconds) => {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = Math.floor(timeInSeconds % 60);
  minutes = minutes < 9 ? `0${minutes}` : minutes;
  seconds = seconds < 9 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  //  update the progress-bar
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  //  update the current-time and duration
  currentTime.textContent = displayTime(video.currentTime);
  currentDuration.textContent = displayTime(video.duration);
};

const seekProgress = (e) => {
  const newTimePercent = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTimePercent * 100}%`;
  video.currentTime = newTimePercent * video.duration;
};

// Volume Controls --------------------------- //

const volumeUtil = (vol) => {
  // set the volume of video
  video.volume = vol;
  // update Volume bar
  volumeBar.style.width = `${vol * 100}%`;
  // this will reset the classlist
  volumeIcon.className = "";
  if (vol === 0) {
    volumeIcon.classList.add("fas", "fa-volume-mute");
  }
  if (vol > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  }
  if (vol > 0.2 && vol < 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  }
  if (vol > 0 && vol < 0.2) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
};
const setVolume = (e) => {
  let volume = e.offsetX / volumeRange.offsetWidth;
  volumeUtil(volume);
  window.localStorage.setItem("videoVolume", volume);
  console.log(volume);
};

const muteVolume = () => {
  previousVol = window.localStorage.getItem("videoVolume");
  video.volume === 0 ? volumeUtil(previousVol) : volumeUtil(0);
};
// Change Playback Speed -------------------- //
const changePlaybackSpeed = () => {
  video.playbackRate = selectSpeed.value;
};

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }

  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }

  video.classList.remove("video-fullscreen");
}

let fullscreen = false;
const toggleFullscreen = () => {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
};

// Event listeners------------------------------- //

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", () => replaceIcon("fa-pause", "fa-play"));
video.addEventListener("canplay", updateProgress);
video.addEventListener("timeupdate", updateProgress);
progressRange.addEventListener("click", seekProgress);
volumeRange.addEventListener("click", setVolume);
volumeIcon.addEventListener("click", muteVolume);
selectSpeed.addEventListener("change", changePlaybackSpeed);
fullScreenBtn.addEventListener("click", toggleFullscreen);
