type RevealOptions = {
  delay?: number;
  threshold?: number;
  y?: number;
};

export function reveal(
  node: HTMLElement,
  { delay = 0, threshold = 0.12, y = 20 }: RevealOptions = {}
) {
  node.style.opacity = '0';
  node.style.transform = `translateY(${y}px)`;
  node.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`;

  if (!('IntersectionObserver' in window)) {
    node.style.opacity = '1';
    node.style.transform = 'none';
    return {};
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.style.opacity = '1';
        node.style.transform = 'translateY(0)';
        observer.disconnect();
      }
    },
    { threshold }
  );

  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}
