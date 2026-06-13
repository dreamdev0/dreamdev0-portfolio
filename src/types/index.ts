export type AccentId =
  | 'rosewater'
  | 'flamingo'
  | 'pink'
  | 'mauve'
  | 'red'
  | 'maroon'
  | 'peach'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'sky'
  | 'sapphire'
  | 'blue'
  | 'lavender'

export type FlavorId = 'mocha' | 'latte'

export type LocaleId = 'en' | 'es'

export interface SocialLink {
  id: 'github' | 'email' | 'whatsapp' | 'phone'
  label: string
  href: string
}

export interface Project {
  slug: 'alpha' | 'neon-runner' | 'dreamdev-web'
  stack: readonly string[]
  cover: string
  links: ReadonlyArray<{ label: 'source' | 'play'; href: string }>
}

export type SkillCategory = 'engines' | 'languages' | 'frontend' | 'design' | 'tools'

export type ExperienceSlug = 'indie' | 'studio' | 'education'

export interface ExperienceItem {
  slug: ExperienceSlug
  period: string
}

export interface NavSection {
  id: 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'
  key: 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'
}
