import { useEffect, useState } from 'react';

const useTypingEffect = (phrases, typingSpeed = 120, deletingSpeed = 60, pause = 1200) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[index % phrases.length];
    const timeout = setTimeout(() => {
      if (typing) {
        setText(currentPhrase.slice(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          setTyping(false);
        }
      } else {
        if (text.length === 0) {
          setTyping(true);
          setIndex((prev) => prev + 1);
        } else {
          setText(currentPhrase.slice(0, text.length - 1));
        }
      }
    }, typing ? typingSpeed : deletingSpeed);

    return () => clearTimeout(timeout);
  }, [text, typing, index, phrases, typingSpeed, deletingSpeed]);

  useEffect(() => {
    if (!typing && text.length === phrases[index % phrases.length].length) {
      const pauseTimeout = setTimeout(() => setTyping(false), pause);
      return () => clearTimeout(pauseTimeout);
    }
    return undefined;
  }, [text, typing, index, pause, phrases]);

  return text;
};

export default useTypingEffect;
