import fs from 'fs'
import path from 'path'
import React from 'react'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  tags?: string[]
  readingTime?: number
}

export type BlogHeading = {
  id: string
  title: string
  level: number
}

export function slugify(value: string) {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('')
  }

  if (React.isValidElement(node)) {
    return getNodeText(node.props.children)
  }

  return ''
}

function cleanHeadingText(value: string) {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~]/g, '')
    .trim()
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  
  if (!match) {
    return { metadata: {} as Metadata, content: fileContent }
  }
  
  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let raw = valueArr.join(': ').trim()
    let k = key.trim() as keyof Metadata

    // Special-case arrays like tags: ['a', 'b']
    if (k === 'tags') {
      // Remove surrounding [ ] then split by comma
      let inner = raw.replace(/^\[|\]$/g, '')
      let tags = inner
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
        .map((t) => t.replace(/^['"](.*)['"]$/, '$1'))
      metadata.tags = tags
      return
    }

    // Default to string value, strip surrounding quotes
    let value = raw.replace(/^['"](.*)['"]$/, '$1')
    switch (k) {
      case 'title':
        metadata.title = value
        break
      case 'publishedAt':
        metadata.publishedAt = value
        break
      case 'summary':
        metadata.summary = value
        break
      case 'image':
        metadata.image = value
        break
      default:
        // ignore unknown keys
        break
    }
  })

  return { metadata: metadata as Metadata, content }
}

function calculateReadingTime(content: string): number {
  // Remove markdown syntax and code blocks
  let cleanContent = content
    // Remove code blocks (```...```)
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]+`/g, '')
    // Remove markdown links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown images ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove bold, italic, strikethrough markers
    .replace(/[*_~]+/g, '')
    // Remove markdown headings
    .replace(/^#+\s+/gm, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')

  // Count words
  let wordCount = cleanContent
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  // Calculate reading time at 150 WPM, minimum 1 minute
  return Math.max(1, Math.ceil(wordCount / 150))
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles
    .map((file) => {
      let { metadata, content } = readMDXFile(path.join(dir, file))
      let slug = path.basename(file, path.extname(file))
      let readingTime = calculateReadingTime(content)

      return {
        metadata: { ...metadata, readingTime },
        slug,
        content,
      }
    })
    .filter((post) => post.metadata.title && post.metadata.publishedAt)
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function extractBlogHeadings(content: string) {
  let headings: BlogHeading[] = []
  let inCodeBlock = false

  content.split('\n').forEach((line) => {
    let trimmed = line.trim()

    if (/^(```|~~~)/.test(trimmed)) {
      inCodeBlock = !inCodeBlock
      return
    }

    if (inCodeBlock) {
      return
    }

    let match = /^(#{2,3})\s+(.+?)\s*$/.exec(trimmed)
    if (!match) {
      return
    }

    let title = cleanHeadingText(getNodeText(match[2]))
    if (!title) {
      return
    }

    headings.push({
      id: slugify(title),
      title,
      level: match[1].length,
    })
  })

  return headings
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}

export function getAllTags() {
  let posts = getBlogPosts()
  let tagSet = new Set<string>()

  posts.forEach((post) => {
    if (post.metadata.tags && Array.isArray(post.metadata.tags)) {
      post.metadata.tags.forEach((tag) => {
        tagSet.add(tag.toLowerCase())
      })
    }
  })

  return Array.from(tagSet).sort()
}

export function getPostsByTag(tag: string) {
  let posts = getBlogPosts()
  return posts
    .filter((post) => {
      if (!post.metadata.tags || !Array.isArray(post.metadata.tags)) {
        return false
      }
      return post.metadata.tags.some(
        (t) => t.toLowerCase() === tag.toLowerCase()
      )
    })
    .sort((a, b) => {
      if (
        new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ) {
        return -1
      }
      return 1
    })
}
