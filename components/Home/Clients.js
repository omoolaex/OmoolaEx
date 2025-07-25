'use client'

import Image from 'next/image'

export default function TrustedBy() {
  const logos = [
    { src: '/clients/client1.png', alt: 'Client 1' },
    { src: '/clients/client2.png', alt: 'Client 2' },
    { src: '/clients/client3.png', alt: 'Client 3' },
    { src: '/clients/client4.png', alt: 'Client 4' },
    { src: '/clients/client5.png', alt: 'Client 5' },
    { src: '/clients/client6.png', alt: 'Client 6' },
  ]

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-gray-700 text-xl md:text-2xl font-medium mb-8">
          Trusted by forward-thinking brands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition duration-300">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                className="h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}