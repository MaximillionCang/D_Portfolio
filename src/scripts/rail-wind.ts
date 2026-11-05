export function attachRailWind(track: HTMLElement, cards: HTMLElement[]) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const springs = cards.flatMap((card, index) => {
    const element = card.querySelector<HTMLElement>('.project-art');
    if (!element) return [];
    return [{
      card,
      element,
      angle: 0,
      velocity: 0,
      strength: .84 + (index % 4) * .09,
      stiffness: 72 + (index % 4) * 8,
      damping: 8.2 + (index % 3) * .4,
    }];
  });
  let frame = 0;
  let previousPosition = track.scrollLeft;
  let previousInput = performance.now();
  let previousFrame = 0;
  let target = 0;

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    target = 0;
    previousPosition = track.scrollLeft;
    previousInput = performance.now();
    track.classList.remove('is-swaying');
    springs.forEach(spring => {
      spring.angle = spring.velocity = 0;
      spring.element.style.removeProperty('--wind-angle');
    });
  }

  function tick(now: number) {
    const elapsed = Math.min((now - previousFrame) / 1000, 1 / 30);
    previousFrame = now;
    if (now - previousInput > 45) target *= Math.exp(-elapsed * 8);
    let moving = Math.abs(target) > .02;
    for (const spring of springs) {
      if (spring.card.hidden) continue;
      const force = (target * spring.strength - spring.angle) * spring.stiffness - spring.velocity * spring.damping;
      spring.velocity += force * elapsed;
      spring.angle = Math.max(-7.5, Math.min(7.5, spring.angle + spring.velocity * elapsed));
      spring.element.style.setProperty('--wind-angle', `${spring.angle.toFixed(3)}deg`);
      moving ||= Math.abs(spring.angle) > .025 || Math.abs(spring.velocity) > .04;
    }
    if (moving && !preference.matches) frame = requestAnimationFrame(tick);
    else reset();
  }

  function onScroll() {
    const position = track.scrollLeft;
    const now = performance.now();
    const distance = position - previousPosition;
    previousPosition = position;
    if (preference.matches || document.hidden || Math.abs(distance) < .1) return;
    const elapsed = Math.max(8, Math.min(64, now - previousInput));
    previousInput = now;
    target = Math.max(-5.2, Math.min(5.2, -distance / elapsed * 4.5));
    if (!frame) {
      track.classList.add('is-swaying');
      previousFrame = now;
      frame = requestAnimationFrame(tick);
    }
  }

  function onVisibility() { if (document.hidden) reset(); }
  function destroy() {
    reset();
    track.removeEventListener('scroll', onScroll);
    preference.removeEventListener('change', reset);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', destroy);
  }
  track.addEventListener('scroll', onScroll, { passive: true });
  preference.addEventListener('change', reset);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', destroy, { once: true });
  return { reset, destroy };
}
