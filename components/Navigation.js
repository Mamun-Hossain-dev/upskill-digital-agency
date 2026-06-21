"use client";

import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Latest works", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="navbar bg-white shadow-lg sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown lg:hidden">
          <button
            className="btn btn-ghost btn-circle hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={28} className="text-gray-700" />
            ) : (
              <Menu size={28} className="text-gray-700" />
            )}
          </button>

          {/* Mobile Sidebar Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMenuOpen(false)}
              ></div>

              {/* Sidebar */}
              <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                      {/* <span className="text-white font-bold text-lg">U</span> */}
                      <Image
                        className="rounded-full"
                        src="/images/users/logo.png"
                        alt="UpSkill Digital Agency Logo"
                        width={56}
                        height={56}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-indigo-600">
                        UpSkill
                      </h3>
                      <p className="text-sm text-gray-500">Digital Agency</p>
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost btn-circle btn-sm hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="px-6 py-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                    Navigation
                  </h4>
                  <ul className="space-y-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                            router.pathname === item.href
                              ? "bg-primary text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Section */}
                <div className="px-6 py-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="btn btn-primary w-full mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connect with Us
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="px-2 py-4 bg-gray-50 mt-auto">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Get in Touch
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Phone size={16} className="text-primary" />
                      <span>+880 1619599140</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Mail size={16} className="text-primary" />
                      <span>Upskilldigitalagency@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <MapPin size={16} className="text-primary" />
                      <span>Dhaka, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 ml-3 lg:ml-0">
          <div className="w-12 h-12  rounded-lg flex items-center justify-center">
            <Image className="rounded-full" src="/images/users/logo.png" alt="UpSkill Digital Agency Logo" width={48} height={48} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-indigo-700">UpSkill</h1>
            <p className="text-xs text-gray-500 -mt-1">Digital Agency</p>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  router.pathname === item.href
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop CTA */}
      <div className="navbar-end hidden lg:flex">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone size={16} className="text-primary" />
            <span className="font-medium">+880 1619599140</span>
          </div>
          <Link
            href="/contact"
            className="btn btn-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Mobile CTA Button */}
      <div className="navbar-end lg:hidden">
        <Link href="/contact" className="btn btn-primary btn-md shadow-lg">
          Contact
        </Link>
      </div>
    </nav>
  );
}
