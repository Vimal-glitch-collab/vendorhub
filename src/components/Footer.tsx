import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const footerLinks = [
  { label: 'Shop', href: '/products' },
  { label: 'Vendors', href: '/products?filter=vendors' },
  { label: 'Sell on VendorHub', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Help', href: '#' },
];

const socialLinks = [
  { icon: 'GlobeAltIcon', href: '#', label: 'Website' },
  { icon: 'ChatBubbleLeftIcon', href: '#', label: 'Twitter' },
  { icon: 'CameraIcon', href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Single row layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + links */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <AppLogo size={30} />
              <span className="font-bold text-base text-foreground">VendorHub</span>
            </Link>
            <nav className="flex flex-wrap items-center justify-center gap-1">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary min-h-[44px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  <Icon name={s.icon as 'GlobeAltIcon'} size={15} />
                </a>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              © 2026 VendorHub Inc.
            </span>
          </div>
        </div>

        {/* Bottom legal row */}
        <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-center gap-4">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}