// Instant Text-to-Speech (Web Speech API)
// This runs locally on the device, requires no network, no API key, and is instant.
export const speakInstant = (text: string, lang: 'en' | 'zh' = 'en', rate: number = 0.85) => {
  if (!('speechSynthesis' in window)) {
    console.warn("Web Speech API not supported");
    return;
  }

  // Cancel any currently playing speech to ensure responsiveness
  window.speechSynthesis.cancel();

  // CRITICAL FIX: Remove underscores completely to prevent "Underscore" sound
  // We replace them with a space to ensure words don't merge weirdly
  const safeText = text.replace(/[_]+/g, ' ');

  const utterance = new SpeechSynthesisUtterance(safeText);
  
  // Set language (English US or Chinese Taiwan)
  utterance.lang = lang === 'zh' ? 'zh-TW' : 'en-US';
  
  // Adjust for a kid-friendly voice
  utterance.rate = rate; // Default 0.85, can be slower (0.5)
  utterance.pitch = 1.1; // Slightly higher pitch
  utterance.volume = 1.0;

  window.speechSynthesis.speak(utterance);
};