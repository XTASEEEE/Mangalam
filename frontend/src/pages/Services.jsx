import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Briefcase, Users, ChefHat, Clock, Sparkles } from 'lucide-react';
import { services } from '../data/mock';
import { Button } from '../components/ui/button';

const Services = () => {
  const serviceDetails = [
    {
      icon: Heart,
      title: 'Wedding Catering',
      description: 'Make your special day unforgettable with our premium wedding catering services. From intimate ceremonies to grand receptions, we handle every detail.',
      features: [
        'Customized wedding menus',
        'Live cooking stations',
        'Traditional & contemporary cuisines',
        'Professional service staff',
        'Elegant presentation & setup',
        'Complete event coordination'
      ],
      image: 'https://images.unsplash.com/photo-1710587385302-38ad6020c83d',
      color: '#ff8c19'
    },
    {
      icon: Briefcase,
      title: 'Corporate Events',
      description: 'Professional catering solutions for all your corporate needs. We understand the importance of punctuality and quality in business settings.',
      features: [
        'Business meetings & conferences',
        'Product launches & seminars',
        'Office parties & celebrations',
        'Daily office lunch solutions',
        'Flexible timing & delivery',
        'Professional presentation'
      ],
      image: 'https://images.unsplash.com/photo-1633424411431-5eb8d0e96488',
      color: '#3dd3ee'
    },
    {
      icon: Users,
      title: 'Social Gatherings',
      description: 'Perfect catering for birthdays, anniversaries, house parties, and all your social celebrations. We bring the party to life with delicious food.',
      features: [
        'Birthday parties & anniversaries',
        'House parties & get-togethers',
        'Religious ceremonies',
        'Customizable menu options',
        'Party setup assistance',
        'Flexible guest arrangements'
      ],
      image: 'https://images.unsplash.com/photo-1672826979217-7156a305acf5',
      color: '#b4dc19'
    }
  ];

  const additionalServices = [
    {
      icon: ChefHat,
      title: 'Custom Menus',
      description: 'Personalized menus tailored to your preferences, dietary requirements, and cultural traditions.'
    },
    {
      icon: Clock,
      title: 'Timely Service',
      description: 'Punctual delivery and service guaranteed. We value your time as much as you do.'
    },
    {
      icon: Sparkles,
      title: 'Event Coordination',
      description: 'Complete event management support to ensure everything runs smoothly on your special day.'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span style={{ color: '#61525a' }}>Services</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Comprehensive catering solutions for every occasion. From intimate gatherings to grand celebrations, we've got you covered.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="container mx-auto px-4 mb-20">
        <div className="space-y-20">
          {serviceDetails.map((service, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: service.color }}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: service.color }}></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/packages">
                  <Button size="lg" style={{ backgroundColor: '#61525a' }}>
                    View Packages
                  </Button>
                </Link>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Going beyond catering to ensure your event is perfect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#fad24b' }}>
                  <service.icon className="w-7 h-7 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How We Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, transparent process from consultation to execution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Consultation', desc: 'Discuss your requirements and preferences' },
            { step: '02', title: 'Menu Planning', desc: 'Customize menu based on your needs' },
            { step: '03', title: 'Confirmation', desc: 'Finalize details and confirm booking' },
            { step: '04', title: 'Execution', desc: 'Flawless delivery on your event day' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white" style={{ backgroundColor: '#61525a' }}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Let's discuss how we can make your event extraordinary
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Contact Us
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

export default Services;
