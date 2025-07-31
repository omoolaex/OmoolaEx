import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

const PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(800).url()}
        alt={value.alt || 'Blog image'}
        className="rounded-xl my-6 w-full object-cover"
      />
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : '_self'
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : ''}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold my-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold my-3">{children}</h3>
    ),
    normal: ({ children }) => <p className="my-3">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 my-4">{children}</ul>,
    number: ({ children }) => (
      <ol className="list-decimal ml-6 my-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="my-1">{children}</li>,
    number: ({ children }) => <li className="my-1">{children}</li>,
  },
}

export default PortableTextComponents