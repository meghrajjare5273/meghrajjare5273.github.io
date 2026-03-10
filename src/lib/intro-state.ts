/**
 * A shared singleton that tracks whether the page intro has completed.
 *
 * Because Astro's <ClientRouter /> preserves the JS module registry across
 * client-side navigations (no full reload), this module-level state correctly
 * persists across route changes — and gets reset at the right time.
 *
 * This solves the fundamental race condition between separate Astro islands
 * where one island (PageOrchestrator) dispatches a one-shot event before
 * another island (HeroSection) has attached its listener.
 */
export const introState = {
  complete: false,

  /** Called by PageOrchestrator just before dispatching the event. */
  markComplete() {
    this.complete = true;
  },

  /**
   * Called by PageOrchestrator's astro:before-preparation handler.
   * Resets the flag when navigating away from home so the next visit
   * to "/" starts with a clean state.
   */
  reset() {
    this.complete = false;
  },
};
