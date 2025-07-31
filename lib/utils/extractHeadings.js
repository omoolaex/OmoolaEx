export function extractHeadingsFromBody(body) {
  if (!Array.isArray(body)) return []

  return body
    .filter(block => block._type === 'block' && /^h[1-3]$/.test(block.style))
    .map((block) => {
      const text = block.children
        ?.filter((child) => child._type === 'span')
        .map((child) => child.text)
        .join('') || ''

      const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

      return {
        text,
        level: parseInt(block.style.replace('h', ''), 10),
        id: slug,
      }
    })
}