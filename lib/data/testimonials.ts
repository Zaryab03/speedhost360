// PLACEHOLDER DATA — spec explicitly forbids shipping fake testimonials.
// This structure exists so the component is ready; it must stay empty (or
// contain only real, attributed quotes) in production. See
// content/placeholders/README.md.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  isPlaceholder: true;
};

export const testimonials: Testimonial[] = [
  {
    quote: "[Real client quote goes here — do not publish without written permission.]",
    name: "[Client name]",
    role: "[Client role, company]",
    isPlaceholder: true,
  },
];
