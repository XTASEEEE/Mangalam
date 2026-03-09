import React, { useState } from 'react';
import { galleryImages } from '../data/mock';
import { Button } from '../components/ui/button';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'food', label: 'Food' },
    { value: 'setup', label: 'Setup' },
    { value: 'service', label: 'Service' },
    { value: 'team', label: 'Team' }
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span style={{ color: '#61525a' }}>Gallery</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            A visual journey through our catering excellence - from exquisite dishes to memorable events
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.value)}
                style={selectedCategory === cat.value ? { backgroundColor: '#61525a' } : {}}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold">{image.alt}</p>
                  <span className="text-sm text-gray-300 capitalize">{image.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No images found in this category</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="relative overflow-hidden rounded-lg shadow-xl p-8 text-white flex flex-col justify-end min-h-[300px]"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1687369595840-e96a912586f1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Want to See More?</h3>
                <p className="mb-4">Follow us on social media for daily updates and behind-the-scenes content</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                    Instagram
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                    Facebook
                  </Button>
                </div>
              </div>
            </div>

            <div 
              className="relative overflow-hidden rounded-lg shadow-xl p-8 text-white flex flex-col justify-end min-h-[300px]"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1710587385302-38ad6020c83d)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Your Event Could Be Next</h3>
                <p className="mb-4">Let us make your celebration picture-perfect</p>
                <Button className="bg-white text-gray-900 hover:bg-gray-100" onClick={() => window.location.href = '/contact'}>
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Events Captured' },
              { number: '50K+', label: 'Dishes Served' },
              { number: '1000+', label: 'Happy Moments' },
              { number: '100%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#61525a' }}>
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
