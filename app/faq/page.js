'use client';

import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "Ordering & Pricing",
      questions: [
        {
          q: "How do I request a cart?",
          a: "You can request a cart in two ways: 1) Click the 'Email Inquiry' button on any product page to request pricing for individual items, or 2) Add multiple items to your Cart and click 'Request Cart for All Items' to get bulk pricing. Our sales team will respond within 24 hours with current market rates."
        },
        {
          q: "How do I request a cart?",
          a: "You can request a cart in two ways: 1) Click the 'Email Inquiry' button on any product page to request pricing for individual items, or 2) Add multiple items to your Cart and click 'Request Cart for All Items' to get bulk pricing. Our sales team will respond within 24 hours with current market rates."
        },
        {
          q: "What is the minimum order quantity (MOQ)?",
          a: "Our MOQ varies by product type. Generally, for individual items, there's no strict minimum. However, bulk orders of 100+ units qualify for volume discounts. Contact our sales team at info@zetatoolz.com for specific MOQ information on your products of interest."
        },
        {
          q: "Do you offer bulk discounts?",
          a: "Yes! We offer attractive volume discounts for bulk orders. The discount tier depends on order quantity, product type, and delivery schedule. Contact us with your requirements for a customized bulk pricing cart."
        }
      ]
    },
    {
      category: "Product Information",
      questions: [
        {
          q: "Are all products ISO certified?",
          a: "Yes, all our manufacturing processes are ISO 9001:2015 certified. Additionally, our medical and surgical instruments are CE certified and FDA registered, ensuring they meet international quality and safety standards."
        },
        {
          q: "What materials are your instruments made from?",
          a: "We use premium surgical-grade stainless steel (mainly AISI 420 and 440 series) for our precision instruments. All materials are sourced from certified suppliers and undergo rigorous testing to ensure durability, corrosion resistance, and longevity."
        },
        {
          q: "Can I customize products with my brand logo?",
          a: "Absolutely! We offer customization services including laser engraving, etching, and branding. Minimum order quantities apply for customization. Please contact our sales team to discuss your branding requirements and MOQ."
        },
        {
          q: "Do you provide product samples?",
          a: "Yes, we can provide samples for evaluation purposes. Sample costs and shipping charges apply, but these can be credited against your first bulk order. Contact us to request samples."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "Which countries do you ship to?",
          a: "We ship worldwide to over 150 countries. We have established logistics partnerships to ensure secure and timely delivery regardless of your location. Shipping costs and delivery times vary by destination."
        },
        {
          q: "How long does delivery take?",
          a: "Standard delivery times: USA (5-7 business days), Europe (7-10 business days), Asia (5-8 business days), Rest of World (10-15 business days). Express shipping options are available for urgent orders."
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive a tracking number via email. You can track your shipment using the 'Track Orders' link in our navigation menu or by contacting our customer service team."
        },
        {
          q: "What are the shipping costs?",
          a: "Shipping costs depend on order weight, dimensions, destination, and shipping method selected. We provide accurate shipping carts during the quotation process. Bulk orders may qualify for free or discounted shipping."
        }
      ]
    },
    {
      category: "Quality & Warranty",
      questions: [
        {
          q: "What warranty do you offer?",
          a: "All our products come with a comprehensive warranty against manufacturing defects. The standard warranty period is 12 months from the date of delivery. This covers material and workmanship defects but excludes normal wear and tear or misuse."
        },
        {
          q: "What is your return policy?",
          a: "We accept returns within 30 days of delivery for unused products in original packaging. Manufacturing defects can be returned within the warranty period. Custom or personalized items are non-returnable unless defective. Please see our Returns page for complete details."
        },
        {
          q: "How do you ensure product quality?",
          a: "Every instrument undergoes multiple quality control checkpoints during manufacturing. Our QC process includes material inspection, dimensional accuracy checks, functionality testing, and final visual inspection before packaging. Only products meeting our strict standards are shipped to customers."
        }
      ]
    },
    {
      category: "Payment & Business",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept bank wire transfers (T/T), Letter of Credit (L/C), PayPal, and major credit cards. For first-time orders, we typically require 30-50% advance payment with balance before shipping. Established customers may qualify for credit terms."
        },
        {
          q: "Do you work with distributors?",
          a: "Yes, we actively seek partnerships with distributors worldwide. We offer special pricing, dropshipping support, and marketing materials for our distribution partners. If you're interested in becoming a distributor, please contact us at info@zetatoolz.com."
        },
        {
          q: "Can I visit your factory?",
          a: "Absolutely! We welcome factory visits by appointment. This allows you to see our manufacturing processes, quality control systems, and meet our team. Please contact us at least 2 weeks in advance to schedule your visit."
        }
      ]
    }
  ];

  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{ label: 'FAQ', href: null }]} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about our products, ordering, and services
        </p>
      </div>

      {/* Quick Contact Banner */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-10 border border-cyan-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Can't find your answer?</p>
              <p className="text-sm text-gray-600">Our customer service team is here to help</p>
            </div>
          </div>
          <a 
            href="/contact"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {faqs.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                {sectionIndex + 1}
              </span>
              {section.category}
            </h2>
            
            <div className="space-y-3">
              {section.questions.map((faq, index) => {
                const globalIndex = `${sectionIndex}-${index}`;
                const isOpen = openIndex === globalIndex;
                
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(globalIndex)}
                      className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-8">{faq.q}</span>
                      <svg 
                        className={`w-5 h-5 text-cyan-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
        <p className="text-cyan-50 mb-6">
          Get in touch with our team for personalized assistance
        </p>
        <a 
          href="/contact"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white rounded transition px-6 py-3"
          style={{ backgroundColor: '#00afef' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0099d6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00afef'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Us
        </a>
      </div>
    </div>
  );
}
