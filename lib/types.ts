// Blog post types for layouts
export interface Blog {
  slug: string
  date: string
  title: string
  summary?: string
  tags?: string[]
  lastmod?: string
  draft?: boolean
  language?: string
  path?: string
  images?: string[]
  authors?: string[]
  layout?: string
  bibliography?: string
  canonicalUrl?: string
}

export interface CoreContent {
  slug: string
  date: string
  title: string
  summary?: string
  tags?: string[]
  language?: string
  draft?: boolean
  path?: string
}
