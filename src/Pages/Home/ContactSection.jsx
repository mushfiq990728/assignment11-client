import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will contact you soon.');
      e.target.reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? Need help? We're here for you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h3>

            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Phone className="text-red-500" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                <p className="text-gray-600">+880 1234-567890</p>
                <p className="text-gray-600">+880 1987-654321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Mail className="text-red-500" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                <p className="text-gray-600">support@blooddonation.com</p>
                <p className="text-gray-600">info@blooddonation.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <MapPin className="text-red-500" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                <p className="text-gray-600">
                  123 Blood Donation Street<br />
                  Dhaka 1000, Bangladesh
                </p>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6 mt-8">
              <h4 className="font-bold text-gray-800 mb-2">Emergency Hotline</h4>
              <p className="text-3xl font-bold text-red-600">999</p>
              <p className="text-sm text-gray-600 mt-2">Available 24/7 for urgent requests</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email *</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject *</span>
                </label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message *</span>
                </label>
                <textarea
                  placeholder="Your message here..."
                  className="textarea textarea-bordered h-32"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;