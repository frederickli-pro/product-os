/**
 * Unit tests for animation helper utilities.
 * Owner: Scenario 10 - Interactive Animations and Transitions
 */

import {
  easings,
  springs,
  pageTransitionVariants,
  fadeVariants,
  slideVariants,
  transformationVariants,
  progressBarVariants,
  hoverRevealVariants,
  collapseVariants,
  getStaggerDelay,
  createTransition,
  createHoverAnimation,
  createTapAnimation,
  prefersReducedMotion,
  ANIMATION_DURATIONS,
  STAGGER_DELAYS,
} from '@/lib/utils/animation-helpers';

describe('Animation Helpers', () => {
  describe('Easing Curves', () => {
    it('provides smooth easing curve values', () => {
      expect(easings.smooth).toEqual([0.4, 0, 0.2, 1]);
    });

    it('provides bounce easing curve values', () => {
      expect(easings.bounce).toEqual([0.68, -0.55, 0.265, 1.55]);
    });

    it('provides sharp easing curve values', () => {
      expect(easings.sharp).toEqual([0.4, 0, 0.6, 1]);
    });

    it('provides linear easing curve values', () => {
      expect(easings.linear).toEqual([0, 0, 1, 1]);
    });

    it('provides anticipate easing curve values', () => {
      expect(easings.anticipate).toEqual([0.36, 0, 0.66, -0.56]);
    });
  });

  describe('Spring Configurations', () => {
    it('provides gentle spring configuration', () => {
      expect(springs.gentle).toEqual({
        type: 'spring',
        stiffness: 120,
        damping: 20,
      });
    });

    it('provides snappy spring configuration', () => {
      expect(springs.snappy).toEqual({
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    });

    it('provides bouncy spring configuration', () => {
      expect(springs.bouncy).toEqual({
        type: 'spring',
        stiffness: 400,
        damping: 25,
      });
    });

    it('provides stiff spring configuration', () => {
      expect(springs.stiff).toEqual({
        type: 'spring',
        stiffness: 500,
        damping: 35,
      });
    });
  });

  describe('Page Transition Variants', () => {
    it('has initial state with opacity 0 and blur', () => {
      expect(pageTransitionVariants.initial).toEqual({
        opacity: 0,
        y: 20,
        filter: 'blur(4px)',
      });
    });

    it('has enter state with full opacity', () => {
      expect(pageTransitionVariants.enter).toMatchObject({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      });
    });

    it('has exit state with opacity 0', () => {
      expect(pageTransitionVariants.exit).toMatchObject({
        opacity: 0,
        y: -20,
      });
    });
  });

  describe('Fade Variants', () => {
    it('has initial state with opacity 0', () => {
      expect(fadeVariants.initial).toEqual({ opacity: 0 });
    });

    it('has enter state with opacity 1', () => {
      expect(fadeVariants.enter).toMatchObject({ opacity: 1 });
    });

    it('has exit state with opacity 0', () => {
      expect(fadeVariants.exit).toMatchObject({ opacity: 0 });
    });
  });

  describe('Slide Variants', () => {
    it('has fromRight variant with positive x offset', () => {
      expect(slideVariants.fromRight.initial).toMatchObject({ x: 100 });
    });

    it('has fromLeft variant with negative x offset', () => {
      expect(slideVariants.fromLeft.initial).toMatchObject({ x: -100 });
    });

    it('has fromTop variant with negative y offset', () => {
      expect(slideVariants.fromTop.initial).toMatchObject({ y: -50 });
    });

    it('has fromBottom variant with positive y offset', () => {
      expect(slideVariants.fromBottom.initial).toMatchObject({ y: 50 });
    });
  });

  describe('Transformation Variants', () => {
    it('has initial state with scale 1', () => {
      expect(transformationVariants.initial).toMatchObject({
        scale: 1,
        opacity: 1,
      });
    });

    it('has morphing state with scale animation', () => {
      expect(transformationVariants.morphing).toHaveProperty('scale');
      expect(transformationVariants.morphing).toHaveProperty('rotateY');
      expect(transformationVariants.morphing).toHaveProperty('transition');
    });

    it('has completed state returning to scale 1', () => {
      expect(transformationVariants.completed).toMatchObject({
        scale: 1,
        opacity: 1,
      });
    });
  });

  describe('Progress Bar Variants', () => {
    it('has initial state with width 0', () => {
      expect(progressBarVariants.initial).toEqual({
        width: 0,
        opacity: 0,
      });
    });

    it('animate function returns correct width', () => {
      const animate = progressBarVariants.animate as (custom: number) => object;
      const result = animate(75);
      expect(result).toMatchObject({
        width: '75%',
        opacity: 1,
      });
    });
  });

  describe('Hover Reveal Variants', () => {
    it('has initial state with opacity 0', () => {
      expect(hoverRevealVariants.initial).toMatchObject({
        opacity: 0,
        y: 10,
      });
    });

    it('has hover state with opacity 1', () => {
      expect(hoverRevealVariants.hover).toMatchObject({
        opacity: 1,
        y: 0,
      });
    });
  });

  describe('Collapse Variants', () => {
    it('has collapsed state with height 0', () => {
      expect(collapseVariants.collapsed).toMatchObject({
        height: 0,
        opacity: 0,
      });
    });

    it('has expanded state with auto height', () => {
      expect(collapseVariants.expanded).toMatchObject({
        height: 'auto',
        opacity: 1,
      });
    });
  });

  describe('Utility Functions', () => {
    describe('getStaggerDelay', () => {
      it('calculates correct delay for index 0', () => {
        expect(getStaggerDelay(0)).toBe(0);
      });

      it('calculates correct delay with default base', () => {
        expect(getStaggerDelay(5)).toBe(0.25);
      });

      it('calculates correct delay with custom base', () => {
        expect(getStaggerDelay(3, 0.1)).toBeCloseTo(0.3);
      });
    });

    describe('createTransition', () => {
      it('creates CSS transition string for single property', () => {
        const result = createTransition(['opacity']);
        expect(result).toContain('opacity');
        expect(result).toContain('300ms');
      });

      it('creates CSS transition string with custom duration', () => {
        const result = createTransition(['transform'], 500);
        expect(result).toContain('500ms');
      });

      it('creates CSS transition string for multiple properties', () => {
        const result = createTransition(['opacity', 'transform']);
        expect(result).toContain('opacity');
        expect(result).toContain('transform');
      });
    });

    describe('createHoverAnimation', () => {
      it('creates hover animation with default scale', () => {
        const result = createHoverAnimation();
        expect(result.whileHover).toMatchObject({
          scale: 1.02,
        });
      });

      it('creates hover animation with custom scale', () => {
        const result = createHoverAnimation(1.05);
        expect(result.whileHover).toMatchObject({
          scale: 1.05,
        });
      });

      it('creates hover animation with shadow when enabled', () => {
        const result = createHoverAnimation(1.02, true);
        expect(result.whileHover).toHaveProperty('boxShadow');
      });

      it('creates hover animation without shadow when disabled', () => {
        const result = createHoverAnimation(1.02, false);
        expect(result.whileHover).not.toHaveProperty('boxShadow');
      });
    });

    describe('createTapAnimation', () => {
      it('creates tap animation with default scale', () => {
        const result = createTapAnimation();
        expect(result.whileTap).toEqual({ scale: 0.98 });
      });

      it('creates tap animation with custom scale', () => {
        const result = createTapAnimation(0.95);
        expect(result.whileTap).toEqual({ scale: 0.95 });
      });
    });

    describe('prefersReducedMotion', () => {
      it('returns false when window is undefined (SSR)', () => {
        // In Jest environment, window.matchMedia is not defined
        const originalWindow = global.window;
        delete (global as any).window;
        expect(prefersReducedMotion()).toBe(false);
        global.window = originalWindow;
      });
    });
  });

  describe('Animation Timing Constants', () => {
    it('has correct duration values', () => {
      expect(ANIMATION_DURATIONS.instant).toBe(100);
      expect(ANIMATION_DURATIONS.fast).toBe(200);
      expect(ANIMATION_DURATIONS.normal).toBe(300);
      expect(ANIMATION_DURATIONS.slow).toBe(500);
      expect(ANIMATION_DURATIONS.verySlow).toBe(800);
      expect(ANIMATION_DURATIONS.transformation).toBe(1200);
    });

    it('has correct stagger delay values', () => {
      expect(STAGGER_DELAYS.tight).toBe(0.03);
      expect(STAGGER_DELAYS.normal).toBe(0.05);
      expect(STAGGER_DELAYS.relaxed).toBe(0.1);
      expect(STAGGER_DELAYS.lazy).toBe(0.15);
    });
  });
});
