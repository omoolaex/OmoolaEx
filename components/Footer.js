import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t text-black pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm">

        {/* Column 1: Branding + Contact */}
        <div>
          <Image src="/images/logo.svg" alt="OmoolaEx Logo" width={200} height={40} />
          <p className="text-black mt-4">
            Expertly trained, battle-tested, elite software developers on demand.
          </p>

          <div className="mt-4 space-y-2 text-black">
            <div className="flex items-start gap-2">
              <Phone size={16} /> <span>+234 1234 5678</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={16} /> <span>hello@omoolaex.com</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={16} />
              <span>
                OmoolaEx Ltd. <br />
                Lekki Phase 1, Lagos<br />
                Nigeria
              </span>
            </div>
          </div>

          <p className="mt-6 mb-2 font-semibold text-black">Follow us</p>
          <div className="flex gap-4 text-blue-600">
            {/* Social Media Icons */}
            <Link href="#"><Linkedin size={18} /></Link>
            <Link href="#"><Facebook size={18} /></Link>
            <Link href="#"><Instagram size={18} /></Link>
            <Link href="#"><Twitter size={18} /></Link>
            <Link href="#"><Youtube size={18} /></Link>
          </div>
        </div>

        {/* Column 2: Company */}
        <div>
          <h4 className="font-semibold text-black mb-3">Company</h4>
          <ul className="space-y-2 text-black">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="#">Success Stories</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="font-semibold text-black mb-3">Services</h4>
          <ul className="space-y-2 text-black">
            <li><Link href="#">Hire Permanent Staff</Link></li>
            <li><Link href="#">Staff Augmentation</Link></li>
            <li><Link href="#">Software Outsourcing</Link></li>
            <li><Link href="#">Build Remote Office</Link></li>
          </ul>
        </div>

        {/* Column 4: How to Start */}
        <div>
          <h4 className="font-semibold text-black mb-3">How to Start</h4>
          <ul className="space-y-2 text-black">
            <li><Link href="#">You Asked</Link></li>
            <li><Link href="#">We Proceed</Link></li>
            <li><Link href="#">Negotiate</Link></li>
            <li><Link href="#">You Get</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} OmoolaEx. All rights reserved.
      </div>
    </footer>
  )
}