import Link from "next/link";

export default function BlogSidebar() {
  return (
    <div className="sticky top-28 space-y-8">
      <section>
        <h3 className="font-semibold mb-2">Recent Posts</h3>
        <ul className="space-y-2 text-sm text-blue-600">
          <li><Link href="/blog/web-design-trends-2025">Web Design Trends 2025</Link></li>
          <li><Link href="/blog/business-brand-strategy">Why Your Business Needs Branding</Link></li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {["UI/UX", "Branding", "Security"].map((cat) => (
            <span key={cat} className="text-xs bg-gray-100 px-2 py-1 rounded">{cat}</span>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 p-4 rounded">
        <h4 className="font-bold text-blue-800 mb-2">Subscribe</h4>
        <p className="text-sm text-gray-600 mb-3">Get updates in your inbox</p>
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-2 py-1 rounded border mb-2"
        />
        <button className="w-full bg-blue-600 text-white text-sm py-2 rounded">
          Subscribe
        </button>
      </section>
    </div>
  );
}