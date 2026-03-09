import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mock';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Client <span style={{ color: '#61525a' }}>Testimonials</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Don't just take our word for it - hear what our satisfied clients have to say about their experience with Mangalam Caterers
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="font-bold text-lg" style={{ color: '#61525a' }}>
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">{testimonial.event}</div>
                <div className="text-xs text-gray-500 mt-1">{testimonial.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 mb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Track Record</h2>
            <p className="text-xl text-gray-600">Numbers that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Events Catered' },
              { number: '50,000+', label: 'Happy Guests' },
              { number: '4.9/5', label: 'Average Rating' },
              { number: '95%', label: 'Return Clients' }
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

      {/* What Clients Love Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Love</h2>
          <p className="text-xl text-gray-600">The most appreciated aspects of our service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Food Quality',
              desc: 'Fresh ingredients, authentic flavors, and beautiful presentation that guests remember',
              percentage: '98%'
            },
            {
              title: 'Professional Service',
              desc: 'Courteous staff, timely execution, and attention to every detail',
              percentage: '97%'
            },
            {
              title: 'Value for Money',
              desc: 'Competitive pricing without compromising on quality or service',
              percentage: '95%'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#61525a' }}>
                {item.percentage}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 bg-gray-50 mb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from real people about their experience with Mangalam Caterers
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#61525a' }}>
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-gray-600">Video testimonials coming soon</p>
              </div>
            </div>
            <p className="text-center text-gray-600">
              We're currently collecting video testimonials from our recent events. Check back soon!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Be Our Next Success Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Join hundreds of satisfied clients who trusted us with their special moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
            <Link to="/packages">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
