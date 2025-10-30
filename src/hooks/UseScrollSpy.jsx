import { useEffect, useState } from 'react';

export default function useScrollSpy(ids, options = {}) {
  const [activeId, setActiveId] = useState(ids?.[0] ?? null);

  useEffect(() => {
    if (!Array.isArray(ids) || ids.length === 0) return;

    const targets = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      {
        root: null,
        rootMargin: options.rootMargin ?? '-40% 0px -55% 0px',
        threshold: options.threshold ?? [0, 0.5, 1],
      }
    );

    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join('|')]);

  return activeId;
}