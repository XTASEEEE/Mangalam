import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/mock';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guestCount: '',
    eventDate: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    toast.success('Thank you! We will contact you shortly.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      guestCount: '',
      eventDate: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in <span style={{ color: '#61525a' }}>Touch</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Ready to make your event extraordinary? Contact us today for a free consultation and quote
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#fad24b' }}>
              <Phone className="w-7 h-7 text-gray-900" />
            </div>
            <h3 className="font-bold mb-2">Call Us</h3>
            <a href={`tel:${companyInfo.phone}`} className="text-gray-600 hover:text-gray-900">
              {companyInfo.phone}
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3dd3ee' }}>
              <Mail className="w-7 h-7 text-gray-900" />
            </div>
            <h3 className="font-bold mb-2">Email Us</h3>
            <a href={`mailto:${companyInfo.email}`} className="text-gray-600 hover:text-gray-900 text-sm">
              {companyInfo.email}
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#ff8c19' }}>
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm">{companyInfo.address}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#b4dc19' }}>
              <Clock className="w-7 h-7 text-gray-900" />
            </div>
            <h3 className="font-bold mb-2">Working Hours</h3>
            <p className="text-gray-600 text-sm">Mon - Sat: 9 AM - 8 PM</p>
            <p className="text-gray-600 text-sm">Sunday: 10 AM - 6 PM</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({...formData, eventType: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="birthday">Birthday Party</SelectItem>
                      <SelectItem value="social">Social Gathering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="guestCount">Expected Guests</Label>
                  <Input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    value={formData.guestCount}
                    onChange={handleChange}
                    placeholder="Number of guests"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event requirements..."
                  rows={5}
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                style={{ backgroundColor: '#61525a' }}
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Find Us</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2366732806524!2d77.47513707549622!3d28.46468837574688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cea75a1a1a1a1%3A0x1a1a1a1a1a1a1a1a!2sKnowledge%20Park%20III%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310!5e0!3m2!1sen!2sin!4v1735661234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mangalam Caterers - 11-D, Knowledge Park III, Greater Noida"
                ></iframe>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{companyInfo.address}</p>
              </div>
            </div>

            {/* WhatsApp Quick Contact */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 p-8 rounded-lg shadow-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Quick Response on WhatsApp</h3>
              </div>
              <p className="mb-6">
                Get instant replies to your queries. Chat with us on WhatsApp for faster assistance!
              </p>
              <a
                href={`https://wa.me/${companyInfo.whatsapp}?text=Hi, I would like to know more about your catering services`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 w-full">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            {/* Why Contact Us */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  'Free consultation & quote',
                  'Customized menu planning',
                  'Competitive pricing',
                  'Experienced team',
                  'Quality guarantee'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#61525a' }}></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
