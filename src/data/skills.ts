export const software = {
  illustrator: { name: 'Adobe Illustrator', mark: 'Ai', rating: 9 },
  photoshop: { name: 'Photoshop', mark: 'Ps', rating: 9 },
  canva: { name: 'Canva', mark: 'Ca', rating: 9 },
  afterEffects: { name: 'After Effects', mark: 'Ae', rating: 7.5 },
  premiere: { name: 'Premiere Pro', mark: 'Pr', rating: 7.5 },
  lightroom: { name: 'Lightroom', mark: 'Lr', rating: 9 },
  capcut: { name: 'CapCut', mark: 'Cc', rating: 8 },
} as const;
export type SoftwareKey = keyof typeof software;
