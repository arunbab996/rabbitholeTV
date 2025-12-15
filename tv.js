let player;
let poweredOn = false;
let interacted = false;

/* Kurzgesagt Uploads playlist */
const PLAYLIST_ID = "UUj0yQnbV9nNqgFjz5uQH0nA";

function randomIndex() {
  return Math.floor(Math.random() * 50);
}

function randomStart() {
  return Math.floor(Math.random() * 300);
}

/* Load YouTube API */
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      modestbranding: 1,
      rel: 0,
      listType: "playlist",
      list: PLAYLIST_ID,
      index: randomIndex(),
      start: randomStart()
    }
  });
}

/* Static effect */
function burstStatic() {
  const s = document.querySelector(".static");
  s.style.opacity = 0.35;
  setTimeout(() => s.style.opacity = 0, 300);
}

/* Power toggle */
function togglePower() {
  const screen = document.getElementById("screen");

  if (!poweredOn) {
    screen.classList.remove("off");
    burstStatic();
    poweredOn = true;
    setTimeout(() => player.playVideo(), 300);
  } else {
    player.stopVideo();
    screen.classList.add("off");
    poweredOn = false;
  }
}

/* Channel change */
function changeChannel() {
  if (!poweredOn) return;

  burstStatic();
  player.loadPlaylist({
    list: PLAYLIST_ID,
    index: randomIndex(),
    startSeconds: randomStart()
  });
}

/* Knob click */
document.getElementById("knob").addEventListener("click", () => {
  if (!interacted) {
    player.unMute();
    interacted = true;
  }

  if (!poweredOn) {
    togglePower();
  } else {
    changeChannel();
  }
});
