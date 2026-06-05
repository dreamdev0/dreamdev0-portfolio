import type { Project } from '@/types'

export const projects: readonly Project[] = [
  {
    slug: 'alpha',
    stack: ['Unity', 'C#', 'Blender'],
    cover: '/projects/alpha.svg',
    links: [{ label: 'source', href: 'https://github.com/dreamdev0' }],
  },
  {
    slug: 'neon-runner',
    stack: ['Unreal Engine', 'C++', 'Niagara'],
    cover: '/projects/neon-runner.svg',
    links: [{ label: 'source', href: 'https://github.com/dreamdev0' }],
  },
  {
    slug: 'dreamdev-web',
    stack: ['Vue', 'Nuxt', 'Astro', 'Tailwind'],
    cover: '/projects/dreamdev-web.svg',
    links: [{ label: 'source', href: 'https://github.com/dreamdev0' }],
  },
] as const
