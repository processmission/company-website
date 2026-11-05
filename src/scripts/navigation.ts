function initializeNavigation() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;

  const listeners = new AbortController();
  const { signal } = listeners;
  const mobileViewport = window.matchMedia('(max-width: 900px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const links = [...header.querySelectorAll<HTMLAnchorElement>('nav a')];
  const container = header.querySelector<HTMLElement>('.header-inner')!;
  const disclosures = new Map([...header.querySelectorAll<HTMLDetailsElement>('details')].map((disclosure) => {
    const state = {
      panel: disclosure.querySelector<HTMLElement>(':scope > .navigation-panel, :scope > nav')!,
      open: disclosure.open,
      animation: undefined as Animation | undefined,
      name: disclosure.getAttribute('name'),
    };
    // Native exclusivity would hide the previous panel before its exit animation.
    disclosure.removeAttribute('name');
    disclosure.dataset.navigationOpen = String(state.open);
    return [disclosure, state] as const;
  }));

  function positionPanel(disclosure: HTMLDetailsElement, panel: HTMLElement) {
    if (mobileViewport.matches || !disclosure.closest('.main-nav')) return;
    const bounds = container.getBoundingClientRect();
    const trigger = disclosure.querySelector('summary')!.getBoundingClientRect();
    const width = panel.getBoundingClientRect().width;
    const left = Math.max(0, Math.min(trigger.left - bounds.left, bounds.width - width));
    panel.style.setProperty('--navigation-panel-left', `${left}px`);
  }

  function setOpen(disclosure: HTMLDetailsElement, open: boolean, immediate = false) {
    const state = disclosures.get(disclosure)!;
    if (!immediate && state.open === open) return;
    if (open && disclosure.classList.contains('navigation-disclosure')) {
      disclosure.closest('.navigation-items')?.querySelectorAll<HTMLDetailsElement>(':scope > li > details').forEach((sibling) => {
        if (sibling !== disclosure) setOpen(sibling, false);
      });
    }
    const wasOpen = disclosure.open;
    const currentStyle = state.animation ? getComputedStyle(state.panel) : null;
    const from = {
      opacity: currentStyle?.opacity ?? (wasOpen ? '1' : '0'),
      transform: currentStyle?.transform ?? (wasOpen ? 'translateY(0)' : 'translateY(-4px)'),
    };
    state.animation?.cancel();
    state.animation = undefined;
    state.open = open;
    disclosure.dataset.navigationOpen = String(open);
    const summary = disclosure.querySelector<HTMLElement>(':scope > summary');
    summary?.setAttribute('aria-expanded', String(open));
    if (!open && state.panel.contains(document.activeElement)) summary?.focus({ preventScroll: true });
    state.panel.inert = !open;
    if (open) {
      disclosure.open = true;
      positionPanel(disclosure, state.panel);
    }

    const settle = () => {
      disclosure.open = open;
      if (!open) {
        disclosure.querySelectorAll<HTMLDetailsElement>('details').forEach((child) => setOpen(child, false, true));
      }
    };
    if (immediate || reducedMotion.matches || !state.panel.animate || (!wasOpen && !open)) {
      settle();
      return;
    }
    disclosure.open = true;
    const animation = state.panel.animate([
      from,
      { opacity: open ? '1' : '0', transform: open ? 'translateY(0)' : 'translateY(-4px)' },
    ], { duration: open ? 180 : 140, easing: 'ease-out', fill: 'both' });
    state.animation = animation;
    animation.onfinish = () => {
      if (state.animation !== animation) return;
      state.animation = undefined;
      settle();
      animation.cancel();
    };
  }

  function closeAll(immediate = false) {
    disclosures.forEach((_, disclosure) => setOpen(disclosure, false, immediate));
  }

  header.querySelectorAll<HTMLElement>('.main-nav > .navigation-items > li').forEach((item) => {
    const disclosure = item.querySelector<HTMLDetailsElement>(':scope > details');
    item.addEventListener('pointerenter', (event) => {
      if (mobileViewport.matches || !hoverPointer.matches || event.pointerType === 'touch') return;
      if (disclosure) setOpen(disclosure, true);
      else closeAll();
    }, { signal });
    item.addEventListener('pointerleave', (event) => {
      if (mobileViewport.matches || !hoverPointer.matches || event.pointerType === 'touch') return;
      if (disclosure && !item.querySelector(':focus-visible')) setOpen(disclosure, false);
    }, { signal });
  });
  hoverPointer.addEventListener('change', () => closeAll(true), { signal });

  function updateCurrentLinks() {
    const { pathname, hash } = window.location;
    const hasCurrentHash = hash && links.some((link) => link.getAttribute('href') === pathname + hash);
    links.forEach((link) => {
      const href = link.getAttribute('href');
      const state = hasCurrentHash && href === pathname + hash ? 'location' : !hasCurrentHash && href === pathname ? 'page' : null;
      if (state) link.setAttribute('aria-current', state);
      else link.removeAttribute('aria-current');
    });
  }

  header.addEventListener('focusout', (event) => {
    disclosures.forEach((state, disclosure) => {
      // Do not shift a sibling summary between pointerdown focus and its click.
      const region = disclosure.classList.contains('navigation-disclosure') ? disclosure.closest('nav') : disclosure;
      if (state.open && !(event.relatedTarget instanceof Node && region?.contains(event.relatedTarget))) setOpen(disclosure, false);
    });
  }, { signal });

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.key !== 'Escape') return;
    const focused = document.activeElement;
    const disclosure = focused instanceof Element ? focused.closest<HTMLDetailsElement>('details[data-navigation-open="true"]') : null;
    const openDisclosure = disclosure && disclosures.has(disclosure) ? disclosure : header.querySelector<HTMLDetailsElement>('details[data-navigation-open="true"]');
    if (!openDisclosure) return;
    event.preventDefault();
    openDisclosure.querySelector<HTMLElement>(':scope > summary')?.focus();
    setOpen(openDisclosure, false);
  }, { signal });

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    if (!(event.target instanceof Node) || !header.contains(event.target)) {
      closeAll();
      return;
    }
    const target = event.target instanceof Element ? event.target : null;
    const summary = target?.closest('summary');
    const disclosure = summary?.parentElement;
    if (disclosure instanceof HTMLDetailsElement && disclosures.has(disclosure)) {
      event.preventDefault();
      const mouseHover = !mobileViewport.matches && hoverPointer.matches && event.detail > 0
        && (!('pointerType' in event) || event.pointerType !== 'touch');
      const open = mouseHover || !disclosures.get(disclosure)!.open;
      setOpen(disclosure, open);
      return;
    }
    if (!target?.closest('a')) return;
    const parent = target.closest('.mobile-navigation') ?? target.closest('.navigation-disclosure');
    parent?.querySelector<HTMLElement>(':scope > summary')?.focus({ preventScroll: true });
    closeAll(true);
  }, { signal });

  mobileViewport.addEventListener('change', () => {
    const focusedNavigation = document.activeElement instanceof Element && document.activeElement.closest('.main-nav, .mobile-navigation');
    closeAll(true);
    if (focusedNavigation) header.querySelector<HTMLElement>(mobileViewport.matches ? '.mobile-navigation > summary' : '.brand')?.focus({ preventScroll: true });
  }, { signal });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) disclosures.forEach((state, disclosure) => setOpen(disclosure, state.open, true));
  }, { signal });

  window.addEventListener('resize', () => {
    disclosures.forEach((state, disclosure) => {
      if (state.open) positionPanel(disclosure, state.panel);
    });
  }, { signal });

  window.addEventListener('pageshow', () => {
    const focused = document.activeElement;
    const disclosure = focused instanceof Element ? focused.closest('.mobile-navigation') ?? focused.closest('.navigation-disclosure') : null;
    closeAll(true);
    disclosure?.querySelector<HTMLElement>(':scope > summary')?.focus({ preventScroll: true });
    updateCurrentLinks();
  }, { signal });
  window.addEventListener('hashchange', updateCurrentLinks, { signal });
  document.addEventListener('astro:before-preparation', () => closeAll(true), { signal });
  updateCurrentLinks();

  return () => {
    listeners.abort();
    closeAll(true);
    disclosures.forEach((state, disclosure) => {
      if (state.name !== null) disclosure.setAttribute('name', state.name);
      state.panel.inert = false;
      state.panel.style.removeProperty('--navigation-panel-left');
      delete disclosure.dataset.navigationOpen;
      disclosure.querySelector(':scope > summary')?.removeAttribute('aria-expanded');
    });
  };
}

let cleanupNavigation: (() => void) | undefined;
function setupNavigation() {
  cleanupNavigation?.();
  cleanupNavigation = initializeNavigation();
}
document.addEventListener('astro:page-load', setupNavigation);
document.addEventListener('astro:before-swap', () => {
  cleanupNavigation?.();
  cleanupNavigation = undefined;
});
setupNavigation();
