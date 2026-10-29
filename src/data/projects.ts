import type { ImageMetadata } from 'astro';
import walkingTruck from '../assets/walking-truck.webp';
import walkingBookmarks from '../assets/walking-bookmarks.webp';
import walkingPink from '../assets/walking-keychain-pink.webp';
import walkingOrange from '../assets/walking-keychain-orange.webp';
import walkingBlue from '../assets/walking-keychain-blue.webp';
import carnivalBoard from '../assets/carnival-board.webp';
import carnivalMascot from '../assets/carnival-mascot.webp';
import carnivalLogo from '../assets/carnival-logo.webp';
import walkingLogo from '../assets/walking-logo.webp';
import mantraLogo from '../assets/mantra-logo.webp';
import realLogo from '../assets/real-logo.webp';
import mantraPoster from '../assets/mantra-poster.webp';
import carnivalFilmPoster from '../assets/carnival-film-poster.webp';
import carnivalCharacterPoster from '../assets/carnival-character-poster.webp';
import mantraSocial from '../assets/mantra-social.webp';
import realPoster from '../assets/real-poster.webp';
import realBrandbook from '../assets/real-brandbook.webp';

export const categories = [
  'All projects',
  'Graphic Design',
  'Social media content',
  'Illustration',
  'Photography',
] as const;

export type Category = Exclude<(typeof categories)[number], 'All projects'>;

export type ProjectMedia = {
  image: ImageMetadata;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  index: string;
  label: string;
  summary: string;
  overview: string;
  cover: ImageMetadata;
  coverAlt: string;
  logo: ImageMetadata;
  logoAlt: string;
  cardTone: 'yellow' | 'light-blue' | 'blue';
  gallery: ProjectMedia[];
  theme: 'blue' | 'yellow' | 'pink' | 'cream';
  featured?: boolean;
  videos?: {
    src: string;
    poster: ImageMetadata;
    title: string;
    caption: string;
    duration: string;
    orientation: 'landscape' | 'portrait';
  }[];
};

export const projects: Project[] = [
  {
    slug: 'walking-tales',
    title: 'Walking Tales',
    category: 'Graphic Design',
    index: '01',
    label: 'Illustrated world · print & objects',
    summary: 'A colourful collection of illustrated pieces, from a library truck to bookmarks and little keepsakes.',
    overview: 'Walking Tales brings the same playful visual language across different surfaces. The selected pieces here include a library truck illustration, a set of bookmarks, and three character keychains.',
    cover: walkingTruck,
    coverAlt: 'Colourful illustrated library truck from Walking Tales',
    logo: walkingLogo,
    logoAlt: 'Walking Tales logo',
    cardTone: 'light-blue',
    gallery: [
      { image: walkingBookmarks, alt: 'Three illustrated Walking Tales bookmarks', caption: 'The bookmark series' },
      { image: walkingPink, alt: 'Pink Walking Tales character keychain', caption: 'Character keepsake · pink' },
      { image: walkingOrange, alt: 'Orange Walking Tales character keychain', caption: 'Character keepsake · orange' },
      { image: walkingBlue, alt: 'Blue Walking Tales character keychain', caption: 'Character keepsake · blue' },
    ],
    theme: 'blue',
    featured: true,
  },
  {
    slug: 'a-carnival-in-every-pop',
    title: 'A Carnival in Every Pop',
    category: 'Graphic Design',
    index: '02',
    label: 'Visual identity · character design',
    summary: 'A bold, character-led collection of popcorn graphics with a carnival spirit.',
    overview: 'This archive brings together the project board, a popcorn character, and expressive typography. Each piece uses bright colour and playful shapes to build a consistent visual world.',
    cover: carnivalBoard,
    coverAlt: 'A Carnival in Every Pop visual design board',
    logo: carnivalLogo,
    logoAlt: 'A Carnival in Every Pop campaign logo',
    cardTone: 'yellow',
    gallery: [
      { image: carnivalMascot, alt: 'Popcorn jester character artwork', caption: 'The popcorn character' },
      { image: carnivalLogo, alt: 'A Carnival in Every Pop campaign logo', caption: 'The campaign logo' },
    ],
    theme: 'pink',
    videos: [
      { src: '/carnival-brand-film.mp4', poster: carnivalFilmPoster, title: 'The carnival, in motion', caption: 'A short film featuring the campaign identity, a ticket and the popcorn character.', duration: '00:16', orientation: 'landscape' },
      { src: '/carnival-motion.mp4', poster: carnivalCharacterPoster, title: 'Meet Poppy Pop', caption: 'A vertical character animation from the project.', duration: '00:07', orientation: 'portrait' },
    ],
  },
  {
    slug: 'mantra-talks',
    title: 'Mantra Talks',
    category: 'Social media content',
    index: '03',
    label: 'Social media content',
    summary: 'A set of graphic posts presented together as a mobile social feed.',
    overview: 'The selected artwork brings a collection of Mantra Talks posts together in a mobile feed. A striking red palette gives the pieces a consistent presence from one screen to the next.',
    cover: mantraSocial,
    coverAlt: 'Mantra Talks social graphics shown in a phone mockup',
    logo: mantraLogo,
    logoAlt: 'Mantra Talks logo',
    cardTone: 'light-blue',
    gallery: [
      { image: mantraPoster, alt: 'Red Mantra Talks event poster', caption: 'The event poster' },
    ],
    theme: 'cream',
  },
  {
    slug: 'real-food',
    title: 'Real Food',
    category: 'Graphic Design',
    index: '04',
    label: 'Brand visuals · print',
    summary: 'A visual collection presented through a poster and a brand book mockup.',
    overview: 'The selected Real Food pieces show the visual identity in two print formats: a poster composition and a brand book.',
    cover: realPoster,
    coverAlt: 'Real Food campaign poster with picnic products',
    logo: realLogo,
    logoAlt: 'Real Starts Here campaign logo',
    cardTone: 'blue',
    gallery: [
      { image: realBrandbook, alt: 'Real Food brand book mockup', caption: 'Brand book' },
    ],
    theme: 'yellow',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
