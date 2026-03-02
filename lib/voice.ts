"use client";

export interface VoiceSearchOptions {
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export function useVoiceSearch() {
  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  function startListening(options: VoiceSearchOptions) {
    if (!isSupported) {
      options.onError?.("Voice search not supported in this browser");
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: typeof SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => options.onStart?.();
    recognition.onend = () => options.onEnd?.();
    recognition.onerror = (e) => options.onError?.(e.error);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      options.onResult(transcript);
    };

    recognition.start();
    return recognition;
  }

  return { isSupported, startListening };
}
