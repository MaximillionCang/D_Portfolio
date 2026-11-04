import { media, type PreparedMedia } from './media';
import { videos, type PreparedVideo } from './videos';
import type { SoftwareKey } from './skills';

export const categories = ['All projects', 'Graphic Design', 'Social media content', 'Illustration', 'Photography'] as const;
export type Category = Exclude<(typeof categories)[number], 'All projects'>;
export type ProjectMedia = PreparedMedia & { alt: string; caption?: string };
export type ProjectVideo = PreparedVideo & { title: string; caption?: string; externalUrl?: string };
export type Project = {
  slug: string; title: string; cardTitle?: string; category: Category; summary: string;
  description: string[]; role?: string; context?: string; software: SoftwareKey[];
  card: ProjectMedia; cover: ProjectMedia; logo?: boolean;
  tone: 'blue-light' | 'yellow' | 'blue' | 'mist'; coverLayout?: 'portrait' | 'wide';
  gallery: ProjectMedia[]; videos?: ProjectVideo[];
  metrics?: { views: string; shares: string }; featured?: boolean;
};
function asset(source: string, alt: string, caption?: string): ProjectMedia {
  if (!media[source]) throw new Error(`Missing prepared image: ${source}`);
  return { ...media[source], alt, caption };
}
const graphic = (project: string, name: string, alt: string, caption?: string) => asset(`Graphic_Design/${project}/${name}`, alt, caption);
const social = (project: string, name: string, alt: string, caption?: string) => asset(`Social_Media_Content/${project}/${name}`, alt, caption);
const motion = (name: string, title: string): ProjectVideo => ({ ...videos[name], title });
const walkingLogo = graphic('walking tales', 'logo 2.png', 'Walking Tales logo');
const carnivalLogo = graphic('a carnival in every pop', 'logo.png', 'A Carnival in Every Pop logo');
const mantraLogo = graphic('mantra talks', 'logo 3.png', 'Mantra Talks logo');
const realLogo = graphic('real food', 'logo 5.png', 'Real Starts Here campaign logo');
const alice = asset('Illustration/alice in wonderland/ADT2409154_Mulianto Darren Ryusa_Final Result_Alice in Wonderland.jpg', 'Underwater book cover for Alice in Wonderland: The Pearl of Wishes');
const photoDescriptions: Record<string, string> = {
  'Copy of GROUP 1 PHOTO.jpg': 'Two friends sitting on a red running track',
  'Copy of GROUP 3.jpg': 'Studio portrait of two women in pastel clothing',
  'Copy of POTRAIT 1 PHOTO.jpg': 'Portrait of a woman sitting between library bookshelves',
  'Copy of POTRAIT.png': 'Studio portrait of a woman in a black dress',
  'Copy of PRODUCT .png': 'Pink perfume bottle surrounded by soft fabric',
  'Copy of STREET 1.png': 'Two people sitting outside a colourful street-side shop',
  'Copy of STREET 2.png': 'A street vendor at a food stall',
  'Copy of STREET 3.png': 'A woman sitting beside a glass street kiosk',
  'DSC04017.jpg': 'Orange sunscreen tube in a blue studio composition',
  'DSC04037.jpg': 'Potato chips, a bowl and game pieces arranged on a yellow background',
  'DSC04053.jpg': 'A colourful snack package with orange slices against yellow',
  'PRESET 1 (2).jpg': 'Portrait of a woman in a white dress beside a stream',
  'PRESET 1 (4).jpg': 'Portrait of a woman in a white dress leaning beside a stream',
  'Untitled-10.png': 'Three people seated together at a brightly decorated gathering',
  'Untitled-11.png': 'Performers singing on a dark stage',
  'Untitled-2.png': 'Black-and-white close-up of a player moving across a badminton court',
  'Untitled-3.png': 'Black-and-white badminton player photographed during a match',
  'Untitled-4 (1).png': 'A group of performers standing under stage lighting',
  'Untitled-5 (1).png': 'A performer wearing a flowing costume onstage',
  'Untitled-55.jpg': 'Basketball players competing for the ball on an indoor court',
  'Untitled-56.jpg': 'A basketball player dribbling past an opponent',
  'Untitled-59.jpg': 'Portrait of a suited man seated on an escalator',
  'Untitled-6.png': 'An outdoor team huddle during a sporting event',
  'Untitled-60.jpg': 'Portrait of a suited man beside a staircase',
  'Untitled-7.png': 'Two singers performing under colourful stage lights',
  'Untitled-8.png': 'A small musical group performing together',
  'Untitled-9.png': 'A crowded concert with bright stage lighting',
  'Untitled.png': 'Black-and-white action photograph of a badminton player',
  'new.jpg': 'Orange sunscreen tube in a beach-inspired product composition',
};
const photography = Object.keys(media).filter(key => key.startsWith('Photography/')).sort((a, b) => a.localeCompare(b, 'en', { numeric: true })).map(key => asset(key, photoDescriptions[key.split('/').at(-1)!] ?? 'Photograph by Darren Ryusa'));

export const projects: Project[] = [
  {
    slug: 'walking-tales', title: 'Walking Tales', category: 'Graphic Design', summary: 'A travelling library with a fairytale of its own.',
    description: [
      'Walking Tales is a mobile, fairytale-themed library designed to make reading more accessible, engaging and fun for children aged 6–12. By bringing books directly to communities, it combines learning and play to inspire children to read, imagine and dream.',
      'Developed for my Advertising Creative coursework, this project brought together a brand logo, a mobile library truck mockup and merchandise designs. As the Graphic Designer, I created a cohesive visual identity across the library and its little keepsakes.',
    ],
    role: 'Graphic Designer', context: 'Advertising Creative coursework', software: ['illustrator', 'photoshop'], card: walkingLogo, logo: true, tone: 'blue-light', featured: true,
    cover: graphic('walking tales', 'png truck.png', 'Illustrated Walking Tales mobile library truck'),
    gallery: [
      graphic('walking tales', 'by Darren Ryusa.png', 'Three illustrated Walking Tales bookmarks', 'The bookmark collection'),
      graphic('walking tales', 'by Darren Ryusa (1).png', 'Pink Walking Tales character keychain', 'Character keepsake'),
      graphic('walking tales', 'by Darren Ryusa (2).png', 'Orange Walking Tales character keychain', 'Character keepsake'),
      graphic('walking tales', 'by Darren Ryusa (3).png', 'Blue Walking Tales character keychain', 'Character keepsake'),
    ],
  },
  {
    slug: 'a-carnival-in-every-pop', title: 'A Carnival in Every Pop', category: 'Graphic Design', summary: 'A carnival-inspired rebrand for Eureka Popcorn.',
    description: [
      'A Carnival in Every Pop is a rebranding project for Eureka Popcorn, inspired by the excitement and vibrant atmosphere of a carnival night. Expressive characters, colourful visuals and visual storytelling turn the brand into a playful popcorn experience.',
      'I developed the branding and visual identity, designing the logo and mascot character and producing the animation to bring the brand personality to life.',
    ],
    role: 'Branding, visual identity & animation', software: ['illustrator', 'photoshop', 'afterEffects', 'canva'], card: carnivalLogo, logo: true, tone: 'yellow', coverLayout: 'wide',
    cover: graphic('a carnival in every pop', 'Untitled design.jpg', 'Five panels presenting the Eureka Popcorn carnival rebrand'),
    gallery: [graphic('a carnival in every pop', 'mascot 1.png', 'Poppy Pop, the popcorn jester character', 'Meet Poppy Pop'), carnivalLogo],
    videos: [motion('carnival-film', 'The carnival, in motion'), motion('carnival-character', 'Meet Poppy Pop')],
  },
  {
    slug: 'mantra-talks', title: 'Mantra Talks', category: 'Social media content', summary: 'A visual identity for conversations that connect students.',
    description: [
      'Mantra Talks is an Indonesian talk show for Indonesian university students in Malaysia. It creates a space for meaningful conversations, different perspectives and ideas relevant to student life.',
      'As Head of Multimedia, I oversaw the visual identity and creative direction, designing the logo, Instagram feed and promotional posters. I also collaborated with the Public Relations team on social media content and sponsorship videos.',
    ],
    role: 'Head of Multimedia', software: ['illustrator', 'photoshop', 'canva', 'capcut'], card: mantraLogo, logo: true, tone: 'blue-light', coverLayout: 'portrait',
    cover: graphic('mantra talks', 'by Darren Ryusa (9).png', 'Mantra Talks Instagram feed in an upright phone mockup'),
    gallery: [graphic('mantra talks', 'paper.png', 'Red Mantra Talks event poster', 'Event poster'), graphic('mantra talks', 'by Darren Ryusa (12).png', 'Mantra Talks certificate design', 'Certificate design')],
    videos: [
      { ...motion('mantra-talks-reel-01', 'Mantra Talks reel 01'), externalUrl: 'https://www.instagram.com/reel/DLmZpboP7Dr/' },
      { ...motion('mantra-talks-reel-02', 'Mantra Talks reel 02'), externalUrl: 'https://www.instagram.com/reel/DLi9DAAPuFg/' },
    ],
  },
  {
    slug: 'real-food', title: 'Keep It Real', category: 'Graphic Design', summary: 'An authentic brand campaign for REAL food.',
    description: [
      'Keep It Real is a branding campaign for REAL, a food product focused on delivering real food with real results. Created for my Communication Campaign coursework, the campaign introduces the product and its benefits through an authentic, relatable brand identity.',
      'As part of the Graphic Design Team, I developed the key visual and brand guideline handbook to keep the campaign’s branding and communication materials consistent.',
    ],
    role: 'Graphic Design Team', context: 'Communication Campaign coursework', software: ['illustrator', 'photoshop'], card: realLogo, logo: true, tone: 'blue', coverLayout: 'portrait',
    cover: graphic('real food', 'real food.png', 'REAL food campaign poster with a picnic scene and products'),
    gallery: [graphic('real food', 'Project Portfolio.png', 'Keep It Real brand guideline handbook', 'Brand guidelines')],
  },
  {
    slug: 'digital-print-production', title: 'Digital Print Production', category: 'Graphic Design', summary: 'A fresh brochure for Tenggarra Food Industries.',
    description: [
      'This brochure for Tenggarra Food Industries was developed as an individual Digital Print Production coursework project. It refreshes the company’s visual presentation through engaging, cohesive design.',
      'As the Graphic Designer, I created the brochure layout, mascot and typography and handled print production to bring the final piece together.',
    ],
    role: 'Graphic Designer', context: 'Individual coursework', software: ['illustrator', 'photoshop'], tone: 'yellow',
    card: graphic('digital print production', 'DIGITAL PRINT (1).png', 'Tenggarra Food Industries brochure layout'), cover: graphic('digital print production', 'DIGITAL PRINT (1).png', 'Food industry brochure with illustrated market stalls'),
    gallery: [graphic('digital print production', 'DIGITAL PRINT.png', 'Reverse side of the Tenggarra brochure', 'The other side')],
  },
  {
    slug: 'ppi-malaysia', title: 'PPI Malaysia', category: 'Social media content', summary: 'Social content for a student community abroad.',
    description: [
      'PPI Malaysia connects Indonesian university students in Malaysia through community activities and initiatives.',
      'As a Graphic Designer Member, I created Instagram feeds and social media content for festive greetings, national celebrations and informational posts, keeping the organization’s visual identity consistent and recognizable.',
    ],
    role: 'Graphic Designer Member', software: ['illustrator', 'canva'], tone: 'blue-light', coverLayout: 'portrait',
    card: social('ppi malaysia', 'by Darren Ryusa (10).png', 'PPI Malaysia social media design collection'), cover: social('ppi malaysia', 'by Darren Ryusa (10).png', 'PPI Malaysia Instagram design collection'),
    gallery: [social('ppi malaysia', 'by Darren Ryusa (11).png', 'PPI Malaysia social media design presentation'), social('ppi malaysia', 'whatsupnov-06.png', 'PPI Malaysia November informational post')],
  },
  {
    slug: 'humas', title: 'HUMAS', category: 'Social media content', summary: 'Illustration and editorial design for a school community.',
    description: [
      'HUMAS is the Public Relations and Media Development division of OSIS SMAK St. Louis 1 Surabaya, supporting student activities through communication and creative content.',
      'As Head of the Illustrator division, I led illustration work and created festive Instagram feeds and visual content for Mitra Remaja Katolik (MITREKA) magazine.',
    ],
    role: 'Head of Illustration', software: ['illustrator', 'photoshop'], tone: 'mist',
    card: social('humas', 'laptop humas.png', 'HUMAS design presentation on a laptop'), cover: social('humas', 'laptop humas.png', 'HUMAS creative work in a laptop mockup'),
    gallery: [
      social('humas', 'feeds imlek.png', 'HUMAS Lunar New Year Instagram feed', 'Lunar New Year'), social('humas', 'feeds jumat agung.png', 'HUMAS Good Friday Instagram feed', 'Good Friday'),
      social('humas', 'majalah 1.png', 'MITREKA magazine illustration and layout', 'MITREKA magazine'), social('humas', 'majalah 2.png', 'MITREKA magazine illustration and layout', 'MITREKA magazine'),
      social('humas', 'IMG_4983.PNG', 'HUMAS social media design example'), social('humas', 'IMG_4984.PNG', 'HUMAS social media design example'),
    ],
  },
  {
    slug: 'alice-in-wonderland', title: 'Alice in Wonderland: The Pearl of Wishes', cardTitle: 'Alice in Wonderland', category: 'Illustration', summary: 'A familiar fairytale, reimagined beneath the waves.',
    description: [
      'Alice in Wonderland: The Pearl of Wishes reimagines the classic fairytale in a magical underwater setting. Alice journeys through mysterious creatures, forgotten shipwrecks and ancient ruins, exploring courage, hope and the power of wishes.',
      'For this Visual Communication Design final project, I developed an original storyline, created illustrations and designed a book cover to bring this underwater world to life.',
    ],
    role: 'Story, illustration & book cover', context: 'Visual Communication Design final project', software: ['illustrator'], tone: 'blue-light', coverLayout: 'portrait', card: alice, cover: alice, gallery: [],
  },
  {
    slug: 'tutorising', title: 'Tutorising', category: 'Social media content', summary: 'Social stories and moving images for orientation.',
    description: ['As a member of the Orientation Committee’s Publication Team, I created social media content and Instagram Story templates to support the event’s promotion. My work maintained a consistent visual identity and helped communicate important event information to students.'],
    role: 'Publication Team', software: [], tone: 'yellow',
    card: social('tutorising', 'IMG_4988.PNG', 'Tutorising Instagram Story design'), cover: social('tutorising', 'IMG_4988.PNG', 'Tutorising orientation Instagram Story'), coverLayout: 'portrait',
    gallery: [social('tutorising', 'IMG_4990.PNG', 'Tutorising Instagram Story template'), social('tutorising', 'IMG_4991.PNG', 'Tutorising Instagram Story template'), social('tutorising', 'IMG_4992.PNG', 'Tutorising Instagram Story template')],
    videos: [motion('tutorising-promotion', 'Orientation, in motion'), motion('tutorising-story-recording', 'Stories in context'), motion('tutorising-orientation', 'A look at orientation')],
  },
  {
    slug: 'sportlight', title: 'Sportlight', category: 'Social media content', summary: 'An event introduction, from concept to final cut.',
    description: ['As Organizing Chairperson, I led and coordinated every division, including Publicity, for the event. I also conceptualized and edited the introduction video.'],
    role: 'Organizing Chairperson & video editor', software: [], tone: 'blue-light',
    card: { image: videos['sportlight-introduction'].poster, thumbnail: videos['sportlight-introduction'].poster, source: videos['sportlight-introduction'].source, alt: 'Still from the Sportlight introduction video' },
    cover: { image: videos['sportlight-introduction'].poster, thumbnail: videos['sportlight-introduction'].poster, source: videos['sportlight-introduction'].source, alt: 'Still from the Sportlight introduction video' },
    gallery: [], videos: [motion('sportlight-introduction', 'The Sportlight introduction')], metrics: { views: '15.1k', shares: '606' },
  },
  {
    slug: 'photography', title: 'Through My Lens', category: 'Photography', summary: 'Portraits, places and moments worth keeping.',
    description: ['A collection of photographs by Darren Ryusa, bringing together portraits, products and scenes from everyday life.'],
    software: [], tone: 'mist', card: photography.find(item => item.source.endsWith('Copy of STREET 1.png')) ?? photography[0], cover: photography.find(item => item.source.endsWith('Copy of STREET 1.png')) ?? photography[0], gallery: photography,
  },
];
export function getProject(slug: string) { return projects.find(project => project.slug === slug); }
