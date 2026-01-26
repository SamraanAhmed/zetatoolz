'use client';

import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleEmailInquiry = () => {
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const subject = `Inquiry: Purchase Request for ${product.name}`;
    const body = `Hello,

I am interested in purchasing the ${product.name} (SKU: ${product.sku || product.id}).

Please provide the current market price for today, ${today}.

Thank you.`;

    const mailtoLink = `mailto:sales@zetatoolz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Product Image */}
      <div className="h-56 bg-gray-100 relative overflow-hidden group">

        <img 
          src={product.image || 'https://placehold.co/400x400/f3f4f6/6b7280?text=' + encodeURIComponent(product.name)} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.children[0].style.display = 'flex';
          }}
        />
        
        {/* Stock Status Badge */}
        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          In Stock
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        

        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button 
            onClick={() => addToCart(product)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm border border-gray-300"
            title="Add to Quote List"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Quote List
          </button>
          
          <button 
            onClick={handleEmailInquiry}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
