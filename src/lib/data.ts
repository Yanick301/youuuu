import type { Product, Testimonial } from './definitions';
import data from './placeholder-images.json';

export const products: Product[] = data.placeholderImages;

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "testimonial.lena.name",
    quote: "testimonial.lena.quote",
    avatar: "https://i.pravatar.cc/150?u=lena"
  },
  {
    id: "2",
    name: "testimonial.felix.name",
    quote: "testimonial.felix.quote",
    avatar: "https://i.pravatar.cc/150?u=felix"
  },
  {
    id: "3",
    name: "testimonial.hannah.name",
    quote: "testimonial.hannah.quote",
    avatar: "https://i.pravatar.cc/150?u=hannah"
  }
];
