// Mock data for Mangalam Caterers

export const companyInfo = {
  name: "Mangalam Caterers",
  address: "11-D, Knowledge Park III, Greater Noida, Uttar Pradesh",
  phone: "9899301832",
  email: "srd.hospitality.india@gmail.com",
  whatsapp: "919899301832"
};

export const packages = [
  {
    id: 1,
    name: "Premium Wedding Package",
    category: "wedding",
    price: "₹1,500 - ₹2,500 per plate",
    description: "Complete wedding catering solution with authentic Indian cuisine",
    features: [
      "Welcome drinks & mocktails",
      "Live chaat & snack counters",
      "Main course (4 veg + 2 non-veg curries)",
      "Variety of Indian breads",
      "Dessert counter with 5+ options",
      "Professional service staff",
      "Elegant table setup & decor"
    ],
    popular: true
  },
  {
    id: 2,
    name: "Corporate Event Package",
    category: "corporate",
    price: "₹800 - ₹1,200 per plate",
    description: "Professional catering for corporate meetings, conferences, and events",
    features: [
      "Tea/coffee with snacks",
      "Continental & Indian buffet",
      "Main course (3 veg + 1 non-veg)",
      "Fresh salads & appetizers",
      "Desserts & beverages",
      "Timely service guarantee",
      "Customizable menu options"
    ],
    popular: false
  },
  {
    id: 3,
    name: "Birthday Party Package",
    category: "social",
    price: "₹600 - ₹1,000 per plate",
    description: "Fun and delicious catering for birthday celebrations and social gatherings",
    features: [
      "Kids-friendly menu options",
      "Starters & finger foods",
      "Main course (2 veg + 1 non-veg)",
      "Birthday cake arrangement",
      "Soft drinks & beverages",
      "Party setup assistance",
      "Flexible timing options"
    ],
    popular: false
  },
  {
    id: 4,
    name: "Grand Wedding Package",
    category: "wedding",
    price: "₹3,000 - ₹5,000 per plate",
    description: "Luxury wedding experience with premium dishes and world-class service",
    features: [
      "Premium welcome drinks bar",
      "Live cooking stations (pasta, dosa, etc.)",
      "Extensive main course (6 veg + 3 non-veg)",
      "International cuisine options",
      "Designer dessert stations",
      "Professional hospitality team",
      "Premium decor & presentation"
    ],
    popular: true
  },
  {
    id: 5,
    name: "Office Lunch Package",
    category: "corporate",
    price: "₹300 - ₹500 per person",
    description: "Daily office lunch solution with fresh and healthy meals",
    features: [
      "Fresh daily preparation",
      "Balanced meal options",
      "Main course (2 veg options)",
      "Rice, dal & breads",
      "Salad & raita",
      "On-time delivery",
      "Monthly packages available"
    ],
    popular: false
  },
  {
    id: 6,
    name: "House Party Package",
    category: "social",
    price: "₹1,000 - ₹1,500 per plate",
    description: "Perfect for intimate gatherings and home celebrations",
    features: [
      "Customized menu planning",
      "Appetizers & starters variety",
      "Main course (3 veg + 2 non-veg)",
      "Regional cuisine specialties",
      "Desserts & beverages",
      "Setup & cleanup service",
      "Flexible guest count"
    ],
    popular: false
  }
];

export const services = [
  {
    id: 1,
    title: "Wedding Catering",
    description: "Make your special day memorable with our exquisite wedding catering services. From intimate gatherings to grand celebrations.",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1710587385302-38ad6020c83d"
  },
  {
    id: 2,
    title: "Corporate Events",
    description: "Professional catering solutions for conferences, seminars, meetings, and corporate parties with timely and quality service.",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1633424411431-5eb8d0e96488"
  },
  {
    id: 3,
    title: "Social Gatherings",
    description: "Perfect catering for birthdays, anniversaries, house parties, and all your social celebrations with customizable menus.",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1672826979217-7156a305acf5"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul Sharma",
    event: "Wedding Reception",
    rating: 5,
    text: "Mangalam Caterers made our wedding day absolutely perfect! The food was delicious, presentation was elegant, and the staff was incredibly professional. Our guests are still talking about the amazing food!",
    date: "December 2024"
  },
  {
    id: 2,
    name: "Amit Verma",
    event: "Corporate Conference",
    rating: 5,
    text: "We've been using Mangalam Caterers for our corporate events for over a year. They're always punctual, professional, and the food quality is consistently excellent. Highly recommended!",
    date: "November 2024"
  },
  {
    id: 3,
    name: "Sneha Gupta",
    event: "Birthday Party",
    rating: 5,
    text: "Organized my daughter's birthday party and the catering was fantastic! The team was cooperative, food was fresh and tasty, and they took care of everything. Will definitely book again!",
    date: "October 2024"
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    event: "Anniversary Celebration",
    rating: 5,
    text: "Exceptional service and delicious food! Mangalam Caterers helped make our 25th anniversary celebration memorable. The attention to detail and quality was outstanding.",
    date: "September 2024"
  }
];

export const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1576842546422-60562b9242ae",
    category: "food",
    alt: "Elegant food display"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1710587385302-38ad6020c83d",
    category: "setup",
    alt: "Wedding table setup"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    category: "setup",
    alt: "Premium dinnerware"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1633424411431-5eb8d0e96488",
    category: "food",
    alt: "Corporate catering"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1672826979217-7156a305acf5",
    category: "setup",
    alt: "Buffet arrangement"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1687369595840-e96a912586f1",
    category: "food",
    alt: "Professional plating"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1616734755909-bb016ce64930",
    category: "team",
    alt: "Professional kitchen"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1719786625035-71f46082e385",
    category: "service",
    alt: "Professional service"
  }
];

export const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Events Catered" },
  { number: "50,000+", label: "Happy Guests" },
  { number: "100%", label: "Client Satisfaction" }
];
