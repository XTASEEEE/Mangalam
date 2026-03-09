import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Phone } from 'lucide-react';
import { packages } from '../data/mock';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Packages' },
    { value: 'wedding', label: 'Wedding Catering' },
    { value: 'corporate', label: 'Corporate Events' },
    { value: 'social', label: 'Social Gatherings' }
  ];

  const filteredPackages = selectedCategory === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span style={{ color: '#61525a' }}>Packages</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Choose from our carefully crafted packages or let us create a custom solution for your event
          </p>

          {/* Category Filter */}
          <div className="flex justify-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                pkg.popular ? 'ring-2 ring-offset-2' : ''
              }`}
              style={pkg.popular ? { ringColor: '#fad24b' } : {}}
            >
              {pkg.popular && (
                <div className="text-center py-2 text-sm font-bold text-gray-900" style={{ backgroundColor: '#fad24b' }}>
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full" style={{ backgroundColor: '#f7f5f2', color: '#61525a' }}>
                    {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-1" style={{ color: '#61525a' }}>
                    {pkg.price}
                  </div>
                  <div className="text-sm text-gray-500">Customizable pricing</div>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#b4dc19' }}>
                        <Check className="w-3 h-3 text-gray-900" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  style={{ backgroundColor: '#61525a' }}
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Package?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Every event is unique. Let's create a personalized package that perfectly fits your requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Request Custom Quote
              </Button>
            </Link>
            <a href="tel:9899301832">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: 'Can I customize the menu in a package?',
              a: 'Absolutely! All our packages are fully customizable. You can add, remove, or modify items based on your preferences and dietary requirements.'
            },
            {
              q: 'What is the minimum guest count?',
              a: 'We cater to events of all sizes, from intimate gatherings of 20 guests to grand celebrations with 1000+ attendees.'
            },
            {
              q: 'How far in advance should I book?',
              a: 'We recommend booking at least 2-4 weeks in advance for regular events and 2-3 months for weddings to ensure availability.'
            },
            {
              q: 'Do you provide service staff?',
              a: 'Yes, all our packages include professional service staff. The number of staff is determined based on your guest count and event requirements.'
            },
            {
              q: 'What about food tasting?',
              a: 'We offer complimentary food tasting sessions for bookings above a certain amount. Contact us to schedule your tasting.'
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Packages;
