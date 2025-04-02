import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="text-center py-12 border-t border-gray-200">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Contact Content */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
        {/* Image Section */}
        <div className="order-2 md:order-1">
          <img
            src={assets.contact_img}
            className="w-full rounded-lg shadow-lg object-cover"
            alt="Contact us"
          />
        </div>

        {/* Contact Information */}
        <div className="order-1 md:order-2 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Store</h3>
            <p className="text-gray-600 leading-relaxed">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Contact Details</h4>
            <p className="text-gray-600">
              Tel: <a href="tel:4156660132" className="hover:text-blue-600 transition">(415) 666-0132</a><br />
              Email: <a href="mailto:admin@forever.com" className="hover:text-blue-600 transition">admin@forever.com</a>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Careers at Forever</h3>
            <p className="text-gray-600 mb-6">
              Learn more about our teams and exciting job opportunities.
            </p>
            <a 
              href="#" 
              className="inline-block bg-black text-white px-8 py-3 rounded-md 
                         hover:bg-gray-800 transition-colors duration-300 
                         focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Explore Jobs
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;