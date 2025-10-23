'use client'

export default function MapSection() {
  return (
    <section className="py-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.406698754516!2d3.3408954739752383!3d6.596270722315501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922679c1e587%3A0xcf6fc79939b93046!2sOmoolaEX%20-%20Web%20Development%20%26%20IT%20Consulting%20Agency%20in%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1757345367274!5m2!1sen!2sng"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
