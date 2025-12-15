let player;
let poweredOn = false;
let interacted = false;

const PLAYLIST_ID = "UUj0yQnbV9nNqgFjz5uQH0nA";

/* ---------- DEBUG ---------- */
console.log("TV script loaded");

/* ---------- HELPERS ---------- */
function randomIndex() {
  return Math.floor(Math.random() * 30);
}

function randomStart() {
  return Math.floor(Math.random() * 200);
}

function burstStatic() {
  const s = document.querySelector(".static");
  s.style.opacity = 0.35;
  setTimeout(() => s.style.opacity = 0, 300);
}

/* ---------- LOAD YOUTUBE ---------- */
window.onYouTubeIframeAPIReady = function () {
  console.log("YouTube API ready");

  player = new YT.Player("player", {
    width: "100%",
    height: "100%",
    videoId: null,
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: () => console.log("Player ready"),
      onError: e => console.error("YT error", e)
    }
  });
};

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

/* ---------- POWER ---------- */
function powerOn() {
  if (!player) {
    console.error("Player not ready");
    return;
  }

  document.getElementById("screen").classList.remove("off");
  burstStatic();

  player.loadPlaylist({
    list: PLAYLIST_ID,
    index: randomIndex(),
    startSeconds: randomStart()
  });

  poweredOn = true;
}

function changeChannel() {
  if (!poweredOn) return;

  burstStatic();
  player.loadPlaylist({
    list: PLAYLIST_ID,
    index: randomIndex(),
    startSeconds: randomStart()
  });
}

/* ---------- CLICK ANYWHERE ---------- */
document.body.addEventListener("click", () => {
  console.log("User interaction");

  if (!interacted && player) {
    player.unMute();
    interacted = true;
  }

  if (!poweredOn) {
    powerOn();
  } else {
    changeChannel();
  }
});
