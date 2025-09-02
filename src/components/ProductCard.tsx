import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  sales: number;
  technologies: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-white text-sm font-semibold">{product.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {product.technologies.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-300 text-sm">
            <Download className="h-4 w-4 mr-1" />
            {product.sales} sales
          </div>
          <div className="text-2xl font-bold text-white">
            ${product.price}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-center"
          >
            View Details
          </Link>
          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center"
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;