import Image from 'next/image'
import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t text-black pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-sm">

        {/* Column 1: Branding + Contact */}
        <div className="space-y-4">
          <Image
            src="/images/logo.svg"
            alt="OmoolaEx Logo"
            width={180}
            height={40}
            className="object-contain"
          />
          <p className="text-gray-700">
            Expertly trained, battle-tested, elite software developers on demand.
          </p>

          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-start gap-2">
              <Phone size={16} /> <span>+234 708 921 7123</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={16} /> <span>info@omoolaex.com.ng</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={16} />
              <span>
                <strong>OmoolaEx IT Consulting.</strong> <br />
                Rgnt Palace, 8 R.T.S. Apena Cl, Oriyomi St,<br />
                Off Olowu Street, Opebi, Ikeja 100271,<br />
                Lagos, Nigeria.
              </span>
            </div>
          </div>

          <div>
            <p className="font-semibold text-black mt-6 mb-2">Follow us</p>
            <div className="flex gap-4 text-blue-600">
              <Link href="https://www.linkedin.com/company/omoolaex-it-consulting-company" aria-label="LinkedIn" target="_blank"><Linkedin size={18} /></Link>
              <Link href="https://www.facebook.com/OmoolaEx" aria-label="Facebook" target="_blank"><Facebook size={18} /></Link>
              <Link href="https://www.instagram.com/omoolaex_" aria-label="Instagram" target="_blank"><Instagram size={18} /></Link>
              <Link href="https://twitter.com/omoolaex" aria-label="Twitter" target="_blank"><Twitter size={18} /></Link>
              <Link href="https://www.youtube.com/@omoolaex" aria-label="YouTube" target="_blank"><Youtube size={18} /></Link>
            </div>
          </div>
        </div>

        {/* Column 2: Company */}
        <div>
          <h4 className="font-semibold text-2xl text-black mb-4">Company</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="font-semibold text-2xl text-black mb-4">Services</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Link href="/services/web-design">Web Development</Link></li>
            <li><Link href="#">Software Development</Link></li>
            <li><Link href="#">IT Consulting & Outsourcing</Link></li>
            <li><Link href="/services/branding">Brand Management</Link></li>
            <li><Link href="#">Digital Marketing</Link></li>
            <li><Link href="#">Cybersecurity & Networking</Link></li>
            <li><Link href="#">Training & Mentorships</Link></li>
          </ul>
        </div>

        {/* Column 4: How to Start */}
        <div>
          <h4 className="font-semibold text-2xl text-black mb-4">Resources</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Link href="#">Hosting</Link></li>
            <li><Link href="/webmail-management">WebMail Management</Link></li>
            <li><Link href="#">Tools</Link></li>
            <li><Link href="/library">Library</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-12 pt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} OmoolaEx. All rights reserved.
      </div>
    </footer>
  )
}