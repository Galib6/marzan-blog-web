'use client'

import Image from 'next/image'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import React, { useEffect } from 'react'
// Import languages you need
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'

interface EditorJSBlock {
  id?: string
  type: string
  data: any
}

interface EditorJSContent {
  time: number
  blocks: EditorJSBlock[]
  version: string
}

interface EditorJSRendererProps {
  content: EditorJSContent
}

export default function EditorJSRenderer({ content }: EditorJSRendererProps) {
  useEffect(() => {
    // Highlight code blocks after rendering
    Prism.highlightAll()
  }, [content])

  const renderBlock = (block: EditorJSBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={block.id || index}
            className="mb-4 text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        )

      case 'header':
        const level = block.data.level as 1 | 2 | 3 | 4 | 5 | 6
        const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        const headingClasses = {
          1: 'text-4xl font-bold mb-6 mt-8',
          2: 'text-3xl font-bold mb-5 mt-7',
          3: 'text-2xl font-semibold mb-4 mt-6',
          4: 'text-xl font-semibold mb-3 mt-5',
          5: 'text-lg font-semibold mb-2 mt-4',
          6: 'text-base font-semibold mb-2 mt-3',
        }
        return React.createElement(
          HeadingTag,
          { key: block.id || index, className: headingClasses[level] },
          block.data.text
        )

      case 'list':
        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul'
        const listClass =
          block.data.style === 'ordered'
            ? 'list-decimal list-inside mb-4 space-y-2'
            : 'list-disc list-inside mb-4 space-y-2'
        return (
          <ListTag key={block.id || index} className={listClass}>
            {block.data.items.map((item: string, i: number) => (
              <li key={i} className="ml-4 text-gray-700 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ListTag>
        )

      case 'code':
        const language = block.data.language || 'javascript'
        return (
          <div key={block.id || index} className="my-6">
            <pre className="overflow-x-auto rounded-lg">
              <code className={`language-${language}`}>{block.data.code}</code>
            </pre>
          </div>
        )

      case 'quote':
        return (
          <blockquote
            key={block.id || index}
            className="my-6 border-l-4 border-gray-300 py-2 pl-4 italic dark:border-gray-600"
          >
            <p className="text-lg text-gray-800 dark:text-gray-200">{block.data.text}</p>
            {block.data.caption && (
              <cite className="mt-2 block text-sm text-gray-600 not-italic dark:text-gray-400">
                — {block.data.caption}
              </cite>
            )}
          </blockquote>
        )

      case 'image':
        return (
          <figure key={block.id || index} className="my-8">
            <div className="relative h-96 w-full">
              <Image
                src={block.data.file.url}
                alt={block.data.caption || 'Blog image'}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {block.data.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        )

      case 'delimiter':
        return (
          <div key={block.id || index} className="my-8 text-center">
            <span className="text-2xl text-gray-400">* * *</span>
          </div>
        )

      case 'table':
        return (
          <div key={block.id || index} className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <tbody>
                {block.data.content.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2 dark:border-gray-600"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'warning':
        return (
          <div
            key={block.id || index}
            className="my-6 border-l-4 border-yellow-400 bg-yellow-50 p-4 dark:bg-yellow-900/20"
          >
            <p className="font-semibold text-yellow-800 dark:text-yellow-200">{block.data.title}</p>
            <p className="mt-1 text-yellow-700 dark:text-yellow-300">{block.data.message}</p>
          </div>
        )

      case 'checklist':
        return (
          <ul key={block.id || index} className="my-4 space-y-2">
            {block.data.items.map((item: any, i: number) => (
              <li key={i} className="flex items-center">
                <input type="checkbox" checked={item.checked} readOnly className="mr-2 h-4 w-4" />
                <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
              </li>
            ))}
          </ul>
        )

      default:
        console.warn(`Unknown block type: ${block.type}`)
        return (
          <div key={block.id || index} className="my-4 rounded bg-gray-100 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500">Unsupported block type: {block.type}</p>
          </div>
        )
    }
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {content.blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}
