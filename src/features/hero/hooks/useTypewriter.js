import { useState, useEffect } from 'react';

export function useTypewriter(titles, speed = { type: 70, delete: 35, pause: 2200 }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!titles || titles.length === 0) return;

    const targetText = titles[titleIndex] || '';
    let timeoutSpeed = isDeleting ? speed.delete : speed.type;

    if (!isDeleting && currentText === targetText) {
      timeoutSpeed = speed.pause;
      const timer = setTimeout(() => setIsDeleting(true), timeoutSpeed);
      return () => clearTimeout(timer);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText(
        isDeleting
          ? targetText.substring(0, currentText.length - 1)
          : targetText.substring(0, currentText.length + 1)
      );
    }, timeoutSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, titles, speed.delete, speed.type, speed.pause]);

  return currentText;
}
