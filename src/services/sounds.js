import { Audio } from 'expo-av';

let correctSound = null;
let incorrectSound = null;
let initialized = false;

/**
 * SOUND_URLS - URLs de los sonidos de la aplicación.
 */
const SOUND_URLS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  incorrect: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
};

/**
 * loadSound - Carga un sonido desde una URL.
 * 
 * @param {string} uri - URL del sonido a cargar
 * @returns {Promise<Audio.Sound>} - Sonido cargado
 */
async function loadSound(uri) {
  const { sound } = await Audio.Sound.createAsync(
    { uri },
    { shouldPlay: false, volume: 0.6 }
  );
  return sound;
}

/**
 * initSounds - Inicializa los sonidos de la aplicación.
 */
export async function initSounds() {
  if (initialized) return;

  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });
    [correctSound, incorrectSound] = await Promise.all([
      loadSound(SOUND_URLS.correct),
      loadSound(SOUND_URLS.incorrect),
    ]);
    initialized = true;
  } catch {
    initialized = false;
  }
}

/**
 * playSound - Reproduce un sonido.
 * 
 * @param {Audio.Sound} sound - Sonido a reproducir
 */
async function playSound(sound) {
  if (!sound) return;

  try {
    await sound.replayAsync();
  } catch {
    // Ignorar si el audio no está disponible
  }
}

/**
 * playCorrectSound - Reproduce el sonido de respuesta correcta.
 */
export function playCorrectSound() {
  playSound(correctSound);
}

/**
 * playIncorrectSound - Reproduce el sonido de respuesta incorrecta.
 */
export function playIncorrectSound() {
  playSound(incorrectSound);
}
