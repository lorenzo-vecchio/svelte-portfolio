const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

type ScrambleOptions = {
  delay?: number;
  speed?: number;
};

export function scramble(
  node: HTMLElement,
  { delay = 0, speed = 2 }: ScrambleOptions = {}
) {
  const original = node.textContent ?? '';
  let frame = 0;
  let rafId: number;
  let timeoutId: ReturnType<typeof setTimeout>;

  function tick() {
    const revealed = Math.floor(frame / speed);

    if (revealed >= original.length) {
      node.textContent = original;
      return;
    }

    // Only update scrambled chars every 3 frames to slow the noise down
    if (frame % 6 === 0) {
      let result = '';
      for (let i = 0; i < original.length; i++) {
        if (i < revealed) {
          result += original[i];
        } else if (original[i] === ' ') {
          result += ' ';
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      node.textContent = result;
    }

    frame++;
    rafId = requestAnimationFrame(tick);
  }

  timeoutId = setTimeout(() => {
    rafId = requestAnimationFrame(tick);
  }, delay);

  return {
    destroy() {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    },
  };
}
