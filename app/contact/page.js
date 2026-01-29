'use client';

import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:sales@zetatoolz.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{ label: 'Contact Us', href: null }]} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
        <p className="text-xl text-gray-600">
          We're here to help with your precision instrument needs
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 transition"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 transition"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Cart Request / Product Inquiry / General Question"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 transition resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Email</div>
                  <a href="mailto:sales@zetatoolz.com" className="text-cyan-600 hover:text-cyan-700">
                    sales@zetatoolz.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Phone</div>
                  <a href="tel:+15551234567" className="text-cyan-600 hover:text-cyan-700 block">
                    +1 (555) 123-4567
                  </a>
                  <a href="tel:+15559876543" className="text-cyan-600 hover:text-cyan-700 block">
                    +1 (555) 987-6543
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Address</div>
                  <p className="text-gray-700">
                    123 Business Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday:</span>
                <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday:</span>
                <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday:</span>
                <span className="font-semibold text-gray-900">Closed</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                * All times are EST (Eastern Standard Time)
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-cyan-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a href="/categories" className="block bg-white/10 hover:bg-white/20 rounded-lg p-3 transition">
                <div className="font-semibold">Browse Catalog</div>
                <div className="text-sm text-cyan-100">View all products</div>
              </a>
              <a href="/cart" className="block bg-white/10 hover:bg-white/20 rounded-lg p-3 transition">
                <div className="font-semibold">Request Cart</div>
                <div className="text-sm text-cyan-100">Get pricing for items</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
