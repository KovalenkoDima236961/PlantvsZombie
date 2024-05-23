// Create audio elements for shooting sound and movement sound
let shootingSound = new Audio("./DOM/Game/Music/9mm-pistol-shot-6349.mp3");
let movementSound = new Audio('./DOM/Game/Music/zombie-growl-3-6863.mp3');
// Export the shooting sound and movement sound for external use
export { shootingSound, movementSound };
// Get the music element by its ID
const music = document.getElementById('my-audio');
/**
 * Sets up the game's audio settings and controls.
 * @function sett
 */
export function sett() {
    // Get DOM elements
    const musicBtn = document.getElementById('music-btn');
    const soundBtn = document.getElementById('sound-btn');
    const musicVolume = document.getElementById('music-volume');
    const soundVolume = document.getElementById('sound-volume');
  
    // Music management
    musicBtn.addEventListener('click', () => {
      if (music.paused) {
        music.play();
        musicBtn.textContent = 'Pause music';
      } else {
        music.pause();
        musicBtn.textContent = 'Play music';
      }
    });
  
// Switch off sounds
soundBtn.addEventListener('click', () => {
    if (!shootingSound.muted) {
      shootingSound.muted = true;
      movementSound.muted = true;
      soundBtn.textContent = 'Switch on sounds';
    } else {
      shootingSound.muted = false;
      movementSound.muted = false;
      soundBtn.textContent = 'Switch off sounds';
    }
});
  
    // Adjust music volume
    musicVolume.addEventListener('input', () => {
      music.volume = musicVolume.value;
    });
  
    // Adjust sound volume
    soundVolume.addEventListener('input', () => {
      shootingSound.volume = soundVolume.value;
    });
}
// Get the elements for music and sound control by their IDs
const musics = document.getElementById('musics');
const sounds = document.getElementById('soundv');
// Add click event listeners to control music and sounds
musics.addEventListener('click', () => {
  if(music.paused){
    music.play();
    musics.textContent = 'Pause music';
  }else {
    music.pause();
    musics.textContent = 'Play music';
  }
});
sounds.addEventListener('click', () => {
  if (!shootingSound.muted) {
    shootingSound.muted = true;
    movementSound.muted = true;
    sounds.textContent = 'Switch on sounds';
  } else {
    shootingSound.muted = false;
    movementSound.muted = false;
    sounds.textContent = 'Switch off sounds';
  }
});