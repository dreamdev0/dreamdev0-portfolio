import type { SkillCategory } from '@/types'

export const skillCategories: readonly { id: SkillCategory; items: readonly string[] }[] = [
  { id: 'engines', items: ['Unity', 'Unreal Engine'] },
  { id: 'languages', items: ['Python', 'C#', 'JavaScript', 'TypeScript'] },
  { id: 'frontend', items: ['Vue', 'Nuxt', 'Astro', 'TailwindCSS', 'GSAP'] },
  { id: 'design', items: ['Affinity', 'Figma', 'Premiere'] },
  { id: 'tools', items: ['Git', 'GitHub', 'Vercel', 'JetBrains'] },
] as const
