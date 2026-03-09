import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Users, Award, Heart } from 'lucide-react';
import { stats } from '../data/mock';
import { Button } from '../components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span style={{ color: '#61525a' }}>Mangalam Caterers</span>
            </h1>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              For over a decade, Mangalam Caterers has been the trusted name in catering services across Greater Noida and beyond. We believe that food is not just about taste—it's about creating memories that last a lifetime.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From intimate gatherings to grand celebrations, we bring passion, expertise, and attention to detail to every event we cater. Our commitment to quality and service excellence has made us the preferred choice for thousands of satisfied clients.
            </p>
            <Link to="/contact">
              <Button size="lg" style={{ backgroundColor: '#61525a' }}>
                Get in Touch
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1616734755909-bb016ce64930"
              alt="Professional kitchen"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Our Values */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#fad24b' }}>
              <ChefHat className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-3">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on the quality of ingredients or preparation methods
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3dd3ee' }}>
              <Users className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
            <p className="text-gray-600">
              Your satisfaction and happiness are at the heart of everything we do
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#ff8c19' }}>
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Excellence</h3>
            <p className="text-gray-600">
              We strive for perfection in every dish and every service interaction
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#b4dc19' }}>
              <Heart className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-3">Passion</h3>
            <p className="text-gray-600">
              We love what we do, and it shows in the food we create
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Mangalam Caterers was born from a simple passion: to bring people together through exceptional food. What started as a small family venture has grown into one of the most trusted catering services in Greater Noida.
              </p>
              <p>
                Over the years, we've had the privilege of being part of countless celebrations—from intimate family gatherings to grand weddings with thousands of guests. Each event has taught us something new and helped us refine our craft.
              </p>
              <p>
                Today, with a team of experienced chefs, dedicated service staff, and modern facilities, we continue to uphold the values that our founders instilled in us: quality, integrity, and a genuine love for hospitality.
              </p>
              <p>
                Whether you're planning a corporate conference, a dream wedding, or a special family celebration, we're here to make your event truly memorable with our culinary expertise and impeccable service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Professional Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experienced professionals dedicated to making your event perfect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1616734755909-bb016ce64930"
                alt="Chef"
                className="w-full aspect-square object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Chefs</h3>
            <p className="text-gray-600">
              Trained culinary professionals with years of experience
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1719786625035-71f46082e385"
                alt="Service Staff"
                className="w-full aspect-square object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Service Staff</h3>
            <p className="text-gray-600">
              Professional and courteous team ensuring seamless service
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1687369595840-e96a912586f1"
                alt="Management"
                className="w-full aspect-square object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Event Managers</h3>
            <p className="text-gray-600">
              Dedicated coordinators to handle every detail
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
