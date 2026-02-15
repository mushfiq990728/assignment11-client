import React from 'react';
import FeaturedRequests from './FeaturedRequests';
import ContactSection from './ContactSection';

const Home = () => {
  return (
    <div>
      {/* Your existing banner/hero section */}
      <section className="hero min-h-screen bg-gradient-to-r from-red-500 to-red-700">
        <div className="hero-content text-center text-white">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-6">
              Donate Blood, Save Lives
            </h1>
            <p className="text-xl mb-8">
              Join our community of heroes. Your donation can give someone a second chance at life.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/register" className="btn btn-lg bg-white text-red-600 hover:bg-gray-100">
                Register Now
              </a>
              <a href="/login" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-red-600">
                Find Blood
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Requests Section */}
      <FeaturedRequests />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Home;