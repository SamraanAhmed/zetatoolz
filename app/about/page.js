'use client';

import Breadcrumb from '../components/Breadcrumb';

export default function AboutPage() {
  const reasons = [
    "Three generations of manufacturing experience",
    "OEM & Private Label Manufacturing",
    "Premium stainless steel materials",
    "Strict quality inspection before every shipment",
    "Factory-direct pricing",
    "Custom laser marking and branding",
    "Flexible packaging solutions",
    "Reliable production timelines",
    "Professional export management",
    "Responsive customer support",
    "Long-term business partnerships"
  ];

  return (
    <div className="animate-fade-in space-y-20">
      <Breadcrumb items={[{ label: 'About Us', href: null }]} />

      {/* Hero Section with Vibrant Bluish Gradient */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#00afef] to-[#007cb0] text-white p-12 md:p-20 text-center shadow-xl">
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            About Zeta Toolz
          </h1>
          <p className="text-lg md:text-xl text-cyan-50 max-w-3xl mx-auto font-light leading-relaxed">
            Three Generations of Precision. One Commitment to Quality.
          </p>
        </div>
      </div>

      {/* Enhanced Story Intro Section */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Main narrative */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Crafting Excellence in the Heart of Sialkot
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Based in the heart of Sialkot, Pakistan — a city recognized worldwide for its manufacturing excellence — we are a family-owned business with decades of experience in crafting high-quality instruments. We serve distributors, wholesalers, importers, and private-label brands worldwide with dependable production and international support.
          </p>
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex gap-4">
            <svg className="w-8 h-8 text-cyan-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <p className="text-slate-700 font-medium">
              We combine traditional craftsmanship with modern production techniques to deliver precision instruments that meet high standards of quality and performance.
            </p>
          </div>
        </div>

        {/* Right Column: Highlighting Time-tested Values */}
        <div className="lg:col-span-5 grid gap-6">
          <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/30 border border-cyan-100 rounded-3xl p-6 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              Time-Tested Trust
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every product we manufacture reflects our dedication to consistency, quality control, and growing long-term international customer relationships.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/30 border border-cyan-100 rounded-3xl p-6 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              Global Partner
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We serve distributors, wholesalers, retailers, and private label brands worldwide with efficient shipping and factory-direct support.
            </p>
          </div>
        </div>
      </div>

      {/* Three Generations Timeline (Reverse Chronological Order) */}
      <div className="py-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Legacy</h2>
          <p className="text-gray-600 text-lg">
            Three generations of dedicated craftsmanship and family leadership driving us forward.
          </p>
        </div>

        <div className="relative border-l-2 border-cyan-100 ml-4 md:ml-32 space-y-12">
          {/* Generation 3 (Top) */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-[#00afef] border-4 border-white shadow" />
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-750 bg-cyan-50 rounded-full mb-3">
                3rd Generation • The Next Generation
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Muhammad Anas, Muhammad Daud & Muhammad Subhan</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                As the third generation of our family business, Muhammad Anas, Muhammad Daud, and Muhammad Subhan are committed to expanding Zeta Toolz's presence in international markets by strengthening service, production, and customer relationships. Together, they combine traditional manufacturing values with modern business practices to continue expanding Zeta Toolz's presence in international markets.
              </p>

              <div className="grid md:grid-cols-3 gap-8 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00afef]" />
                    Muhammad Anas
                  </h4>
                  <div className="text-sm font-semibold text-cyan-600 mb-3">Export Operations & Business Development</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Manages export operations, international customer relations, quotations, OEM and private label projects, and business development. His focus is on building long-term partnerships with distributors, wholesalers, and brands worldwide while ensuring smooth communication from inquiry to delivery.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00afef]" />
                    Muhammad Daud
                  </h4>
                  <div className="text-sm font-semibold text-cyan-600 mb-3">Production Operations & Quality Assurance</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Leads production operations, overseeing manufacturing processes, quality standards, and production efficiency. His attention to detail ensures that every instrument leaving our facility reflects the precision and reliability our customers expect.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00afef]" />
                    Muhammad Subhan
                  </h4>
                  <div className="text-sm font-semibold text-cyan-600 mb-3">Website Manager</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    As Website Manager, Muhammad Subhan manages and maintains Zeta Toolz's digital presence, ensuring that our website remains up to date, informative, and accessible for customers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Generation 2 (Middle) */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-[#00afef] border-4 border-white shadow" />
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-750 bg-cyan-50 rounded-full mb-3">
                2nd Generation • Experience That Guides Us
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Muhammad Shahid Arshad</h3>
              <div className="text-sm font-semibold text-cyan-600 mb-3">Proprietor & Managing Director</div>
              <p className="text-gray-600 leading-relaxed">
                The company continues under the guidance of Muhammad Shahid Arshad, who entered the international export industry in 1998. With decades of experience in manufacturing and exports, he oversees production planning, quality assurance, and overall business operations to support reliable delivery and consistent results. His leadership has played a vital role in maintaining the company's commitment to precision manufacturing, customer satisfaction, and continuous improvement.
              </p>
            </div>
          </div>

          {/* Generation 1 (Bottom) */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-[#00afef] border-4 border-white shadow" />
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-750 bg-cyan-50 rounded-full mb-3">
                1st Generation • The Foundation
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Muhammad Arshad</h3>
              <div className="text-sm font-semibold text-cyan-600 mb-3">Founder (Late)</div>
              <p className="text-gray-600 leading-relaxed">
                The foundation of our family's manufacturing journey was established by Muhammad Arshad, whose dedication to precision craftsmanship, hard work, and honest business practices shaped the values that continue to guide Zeta Toolz today. His legacy of quality, integrity, and commitment to excellence continues to inspire every generation of our family and remains at the heart of everything we manufacture.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Manufacture & Capabilities */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Manufacture</h2>
          <p className="text-gray-600">
            Zeta Toolz manufactures and supplies a wide range of precision instruments designed to meet the high-standard needs of our global customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Products Column */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Product Categories
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="/categories/dental-instruments" className="group p-4 bg-gray-50 hover:bg-cyan-50/50 hover:border-cyan-200 border border-gray-100 rounded-xl transition">
                  <h4 className="font-bold text-gray-900 group-hover:text-cyan-600 transition mb-1 text-sm md:text-base">Dental Instruments</h4>
                  <p className="text-xs text-gray-500">Surgical grade instruments for professional dentistry.</p>
                </a>
                <a href="/categories/beauty-instruments" className="group p-4 bg-gray-50 hover:bg-cyan-50/50 hover:border-cyan-200 border border-gray-100 rounded-xl transition">
                  <h4 className="font-bold text-gray-900 group-hover:text-cyan-600 transition mb-1 text-sm md:text-base">Beauty Instruments</h4>
                  <p className="text-xs text-gray-500">Premium manicure, pedicure, and grooming tools.</p>
                </a>
                <a href="/categories/embroidery" className="group p-4 bg-gray-50 hover:bg-cyan-50/50 hover:border-cyan-200 border border-gray-100 rounded-xl transition">
                  <h4 className="font-bold text-gray-900 group-hover:text-cyan-600 transition mb-1 text-sm md:text-base">Embroidery Tools</h4>
                  <p className="text-xs text-gray-500">Durable and precise hoops, scissors, and tools.</p>
                </a>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Lock Picking Tools</h4>
                  <p className="text-xs text-gray-500">Professional lockpicking sets & practice tools. Contact to order.</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center italic border-t border-gray-100 pt-4">
              We proudly serve distributors, wholesalers, retailers, importers, and brands seeking a reliable manufacturing partner.
            </p>
          </div>

          {/* Capabilities/Services Column */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xs">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Manufacturing Solutions
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-bold text-sm">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">OEM Manufacturing</h4>
                  <p className="text-xs md:text-sm text-gray-650">Full custom production to match your specific engineering designs and dimensions.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-bold text-sm">02</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Private Label Manufacturing</h4>
                  <p className="text-xs md:text-sm text-gray-600">Manufacture our catalog items marked with your own brand identifier.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-bold text-sm">03</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Custom Laser Marking</h4>
                  <p className="text-xs md:text-sm text-gray-600">Premium fiber laser marks for high contrast logo placement, sizes, and batch codes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-bold text-sm">04</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Custom Packaging Solutions</h4>
                  <p className="text-xs md:text-sm text-gray-650">Tailored blister packs, custom pouches, printing, and shipping master boxes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-bold text-sm">05</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Product Customization</h4>
                  <p className="text-xs md:text-sm text-gray-650">Refine textures, handle styles, materials (J1, J2, 440C), and coatings as needed.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-250">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Certifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-150">
            <div className="h-32 flex items-center justify-center mb-4">
              <img 
                src="/Cirtificates/ISO-9001.png" 
                alt="ISO 9001:2015 Certified" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="font-bold text-gray-900 text-center text-sm md:text-base">ISO 9001:2015</h3>
          </div>
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-150">
            <div className="h-32 flex items-center justify-center mb-4">
              <img 
                src="/Cirtificates/CE.png" 
                alt="CE Certified" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="font-bold text-gray-900 text-center text-sm md:text-base">CE Certified</h3>
          </div>
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-150">
            <div className="h-32 flex items-center justify-center mb-4">
              <img 
                src="/Cirtificates/SCCI.png" 
                alt="SCCI Member" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="font-bold text-gray-900 text-center text-sm md:text-base">SCCI Member</h3>
          </div>
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-150">
            <div className="h-32 flex items-center justify-center mb-4">
              <img 
                src="/Cirtificates/SIMAP.png" 
                alt="SIMAP Member" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="font-bold text-gray-900 text-center text-sm md:text-base">SIMAP Member</h3>
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Why Work With Us?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-6 h-6 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium text-sm md:text-base">{reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl p-8 text-white shadow-md flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-600">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <p className="text-cyan-50 leading-relaxed text-base md:text-lg">
            To manufacture precision instruments that consistently meet international standards while building lasting relationships through dependable quality, reliability, innovation, and exceptional customer service.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border-2 border-cyan-500 shadow-md flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#00afef]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#00afef]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            To become a globally recognized manufacturing partner known for precision craftsmanship, dependable quality, and trusted long-term relationships with customers worldwide.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl p-10 text-center text-white shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600">
        <h2 className="text-3xl font-bold mb-4">Explore Our Full Range</h2>
        <p className="text-cyan-50 mb-6 max-w-2xl mx-auto text-base md:text-lg">
          Discover our complete collection of precision instruments and find the perfect tools for your professional requirements.
        </p>
        <div className="flex justify-center">
          <a 
            href="/categories"
            className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-lg hover:bg-cyan-50 transition shadow"
          >
            Browse Catalog
          </a>
        </div>
      </div>
    </div>
  );
}