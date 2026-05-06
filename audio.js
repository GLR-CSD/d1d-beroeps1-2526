const audio = document.getElementById('bgAudio');
const muteBtn = document.createElement('button');
muteBtn.className = 'mute-btn';
muteBtn.setAttribute('aria-label', 'Geluid aan/uit');
document.body.appendChild(muteBtn);

const iconMuted = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/><\/svg>`;
const iconUnmuted = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/><\/svg>`;

let muted = true;
muteBtn.innerHTML = iconMuted;

muteBtn.addEventListener('click', () => {
  muted = !muted;
  if (muted) {
    audio.pause();
    muteBtn.innerHTML = iconMuted;
  } else {
    audio.play();
    muteBtn.innerHTML = iconUnmuted;
  }
});