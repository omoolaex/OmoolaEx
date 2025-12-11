import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const PortableTextComponents = {
  types: {
    /* -----------------------------------
       IMAGES
    ----------------------------------- */
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      return (
        <Image
          src={urlFor(value).width(1000).url()}
          alt={value.alt || "Blog image"}
          width={1000}
          height={600}
          className="rounded-xl shadow-md my-10 w-full"
          sizes="(max-width: 768px) 100vw, 1000px"
        />
      );
    },

    /* -----------------------------------
       CODE BLOCK (schema: type='code')
    ----------------------------------- */
    code: ({ value }) => {
      return (
        <div className="my-8">
          {/* Optional filename */}
          {value.filename && (
            <div className="bg-gray-800 text-gray-200 px-4 py-2 rounded-t-md text-sm font-mono">
              {value.filename}
            </div>
          )}

          <SyntaxHighlighter
            language={value.language || "javascript"}
            style={oneDark}
            showLineNumbers
            customStyle={{ borderRadius: "0 0 10px 10px", padding: "1rem" }}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      );
    },

    /* -----------------------------------
       HIGHLIGHT BLOCK
    ----------------------------------- */
    highlight: ({ value }) => (
      <div className="my-8 p-5 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
        <p className="text-blue-900 text-[17px] leading-relaxed font-medium">
          {value.text}
        </p>
      </div>
    ),

    /* -----------------------------------
       CALLOUT BLOCK
    ----------------------------------- */
    callout: ({ value }) => {
      const color = {
        info: "bg-blue-50 border-blue-300 text-blue-900",
        warning: "bg-yellow-50 border-yellow-300 text-yellow-900",
        tip: "bg-green-50 border-green-300 text-green-900",
      };

      return (
        <div
          className={`my-8 p-4 border-l-4 rounded-md shadow-sm ${color[value.style]}`}
        >
          <p className="leading-relaxed">{value.text}</p>
        </div>
      );
    },

    /* -----------------------------------
       TABLE
    ----------------------------------- */
    table: ({ value }) => (
      <div className="overflow-x-auto my-10">
        <table className="w-full border-collapse text-left text-gray-800">
          <tbody>
            {value.rows?.map((row, i) => (
              <tr key={i} className="even:bg-gray-50">
                {row.cells.map((cell, j) => (
                  <td key={j} className="border px-4 py-3 text-sm">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },

  /* ---------------------------------------
     MARKS
  --------------------------------------- */
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1 py-0.5 bg-gray-200 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },

  /* ---------------------------------------
     BLOCKS
  --------------------------------------- */
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-12 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-8 mb-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-800 leading-8 my-4 text-[17px]">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-5 py-3 italic text-gray-700 bg-blue-50/50 rounded-r-md my-6">
        {children}
      </blockquote>
    ),
  },

  /* ---------------------------------------
     LISTS
  --------------------------------------- */
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-8 space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-8 space-y-2 my-4">{children}</ol>
    ),
  },
};
