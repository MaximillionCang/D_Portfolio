import type { ImageMetadata } from 'astro';
import poster0 from '../assets/portfolio/carnival-film-poster.webp';
import poster1 from '../assets/portfolio/carnival-character-poster.webp';
import poster2 from '../assets/portfolio/sportlight-introduction-poster.webp';
import poster3 from '../assets/portfolio/tutorising-promotion-poster.webp';
import poster4 from '../assets/portfolio/tutorising-story-recording-poster.webp';
import poster5 from '../assets/portfolio/tutorising-orientation-poster.webp';
import poster6 from '../assets/portfolio/mantra-talks-reel-01-poster.webp';
import poster7 from '../assets/portfolio/mantra-talks-reel-02-poster.webp';
import poster8 from '../assets/portfolio/mantra-talks-reel-03-poster.webp';
export type PreparedVideo = { src: string; poster: ImageMetadata; duration: number; orientation: 'landscape' | 'portrait'; source: string };
export const videos: Record<string, PreparedVideo> = {
  "carnival-film": { src: '/videos/carnival-film.mp4', poster: poster0, duration: 15.8, orientation: 'landscape', source: "Graphic_Design/a carnival in every pop/IMG_6797.mov" },
  "carnival-character": { src: '/videos/carnival-character.mp4', poster: poster1, duration: 7.03, orientation: 'portrait', source: "Graphic_Design/a carnival in every pop/034dfb51-785a-4833-9234-8378a219b863.MP4" },
  "sportlight-introduction": { src: '/videos/sportlight-introduction.mp4', poster: poster2, duration: 34.97, orientation: 'landscape', source: "Social_Media_Content/sportlight/0427.mp4" },
  "tutorising-promotion": { src: '/videos/tutorising-promotion.mp4', poster: poster3, duration: 14.33, orientation: 'portrait', source: "Social_Media_Content/tutorising/export_1793028010057.mov" },
  "tutorising-story-recording": { src: '/videos/tutorising-story-recording.mp4', poster: poster4, duration: 12.42, orientation: 'portrait', source: "Social_Media_Content/tutorising/ScreenRecording_10-26-2026 23-22-00_1.mp4" },
  "tutorising-orientation": { src: '/videos/tutorising-orientation.mp4', poster: poster5, duration: 34.83, orientation: 'portrait', source: "Social_Media_Content/tutorising/v0f025gc0000cb97lvrc77u5knkt70j0.mp4" },
  "mantra-talks-reel-01": { src: '/videos/mantra-talks-reel-01.mp4', poster: poster6, duration: 10.26, orientation: 'portrait', source: "Graphic_Design/mantra talks/reels/mantra-talks-reel-01.mp4" },
  "mantra-talks-reel-02": { src: '/videos/mantra-talks-reel-02.mp4', poster: poster7, duration: 12.17, orientation: 'portrait', source: "Graphic_Design/mantra talks/reels/mantra-talks-reel-02.mp4" },
  "mantra-talks-reel-03": { src: '/videos/mantra-talks-reel-03.mp4', poster: poster8, duration: 46, orientation: 'portrait', source: "Graphic_Design/mantra talks/reels/mantra-talks-reel-03.mp4" }
};
