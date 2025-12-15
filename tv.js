const channels = [
  "https://www.youtube.com/embed/videoseries?list=PL8fVUTBmJhHJmpP8lzU3c6M1B-7V0eQ8Z&autoplay=1&mute=1",
  "https://www.youtube.com/embed/videoseries?list=PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-&autoplay=1&mute=1",
  "https://www.youtube.com/embed/videoseries?list=PLkLimRXN6NKzI1U4t4DgkXz_pH6QZK2n-&autoplay=1&mute=1"
];

let current = 0;
const player = document.getElementById("player");
const ch = document.getElementById("ch");

function loadChannel(i) {
  current = (i + channels.length) % channels.length;
  player.src = channels[current];
  ch.textContent = current + 1;
}

loadChannel(0);

/* Keyboard controls (temporary remote) */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") loadChannel(current + 1);
  if (e.key === "ArrowDown") loadChannel(current - 1);
});
