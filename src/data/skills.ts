export const software = {
  illustrator: { name: "Adobe Illustrator", icon: '/software/illustrator.svg', rating: 9 },
  photoshop: { name: "Photoshop", icon: '/software/photoshop.svg', rating: 9 },
  canva: { name: "Canva", icon: '/software/canva.svg', rating: 9 },
  afterEffects: { name: "After Effects", icon: '/software/after-effects.svg', rating: 7.5 },
  premiere: { name: "Premiere Pro", icon: '/software/premiere.svg', rating: 7.5 },
  lightroom: { name: "Lightroom", icon: '/software/lightroom.svg', rating: 9 },
  capcut: { name: "CapCut", icon: '/software/capcut.png', rating: 8 },
} as const;
export type SoftwareKey = keyof typeof software;
