// Mock blog posts data in Editor.js format
export interface EditorJSBlock {
  id?: string
  type: string
  data: any
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  lastmod?: string
  tags: string[]
  draft: boolean
  summary: string
  images?: string[]
  authors?: string[]
  content: { time: number; blocks: EditorJSBlock[]; version: string }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'introducing-editorjs-blog',
    title: 'Introducing Editor.js Blog',
    date: '2025-11-16',
    tags: ['next-js', 'editor-js', 'blog'],
    draft: false,
    summary: 'A new blog powered by Editor.js JSON blocks instead of MDX',
    authors: ['default'],
    content: {
      time: 1731744000000,
      blocks: [
        {
          id: 'intro',
          type: 'paragraph',
          data: {
            text: 'Welcome to the new blog! This blog is powered by Editor.js JSON blocks, making it easy to fetch content from any API.',
          },
        },
        { id: 'heading1', type: 'header', data: { text: 'Why Editor.js?', level: 2 } },
        {
          id: 'para2',
          type: 'paragraph',
          data: {
            text: 'Editor.js provides a clean JSON output that is easy to store, fetch from APIs, and render dynamically.',
          },
        },
        {
          id: 'list1',
          type: 'list',
          data: {
            style: 'unordered',
            items: [
              'Clean JSON structure',
              'Easy API integration',
              'Flexible rendering',
              'No build-time compilation needed',
            ],
          },
        },
        { id: 'heading2', type: 'header', data: { text: 'Code Examples', level: 2 } },
        { id: 'para3', type: 'paragraph', data: { text: 'Here is a simple code example:' } },
        {
          id: 'code1',
          type: 'code',
          data: {
            code: `function hello() {
  console.log("Hello, World!");
  return "Welcome to Editor.js blog!";
}

hello();`,
            language: 'javascript',
          },
        },
        { id: 'para4', type: 'paragraph', data: { text: 'And here is a Python example:' } },
        {
          id: 'code2',
          type: 'code',
          data: {
            code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
            language: 'python',
          },
        },
        { id: 'heading3', type: 'header', data: { text: 'Images', level: 2 } },
        {
          id: 'image1',
          type: 'image',
          data: {
            file: { url: 'https://picsum.photos/800/400' },
            caption: 'A beautiful random image from Picsum',
            withBorder: false,
            stretched: false,
            withBackground: false,
          },
        },
        {
          id: 'quote1',
          type: 'quote',
          data: {
            text: 'The best way to predict the future is to invent it.',
            caption: 'Alan Kay',
            alignment: 'left',
          },
        },
      ],
      version: '2.28.0',
    },
  },
  {
    slug: 'sample-post-with-code',
    title: 'Advanced Code Highlighting Example',
    date: '2025-11-15',
    tags: ['programming', 'tutorial', 'code'],
    draft: false,
    summary: 'Examples of syntax highlighting with different programming languages',
    authors: ['default'],
    content: {
      time: 1731657600000,
      blocks: [
        { type: 'header', data: { text: 'Multiple Language Examples', level: 1 } },
        {
          type: 'paragraph',
          data: {
            text: 'This post demonstrates syntax highlighting for various programming languages.',
          },
        },
        { type: 'header', data: { text: 'TypeScript Example', level: 2 } },
        {
          type: 'code',
          data: {
            code: `interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}`,
            language: 'typescript',
          },
        },
        { type: 'header', data: { text: 'React Component', level: 2 } },
        {
          type: 'code',
          data: {
            code: `import React, { useState, useEffect } from 'react';

export default function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    fetch(\`/api/posts/\${slug}\`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [slug]);
  
  if (!post) return <div>Loading...</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`,
            language: 'jsx',
          },
        },
        {
          type: 'list',
          data: {
            style: 'ordered',
            items: [
              'Clean code structure',
              'Type safety with TypeScript',
              'Modern React hooks',
              'Error handling',
            ],
          },
        },
      ],
      version: '2.28.0',
    },
  },
]

export function getAllPosts(): BlogPost[] {
  return blogPosts.filter((post) => !post.draft)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && !post.draft)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => !post.draft && post.tags.includes(tag))
}

export function getAllTags(): { [key: string]: number } {
  const tagCount: { [key: string]: number } = {}
  blogPosts.forEach((post) => {
    if (!post.draft) {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    }
  })
  return tagCount
}
