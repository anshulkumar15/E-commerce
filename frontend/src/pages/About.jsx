import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { FaCheckCircle, FaStar, FaSmile, FaUsers, FaTrophy, FaShippingFast, FaShoppingCart, FaMoneyCheckAlt, FaGift, FaHeadset } from "react-icons/fa";

const About = () => {
  return (
    <div className="px-6 lg:px-20 py-10">
      {/* ABOUT US SECTION */}
      <div className="text-center">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-16 flex flex-col md:flex-row items-center gap-12">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          alt="About Us"
        />
        <div className="flex flex-col gap-6 md:w-3/5 text-gray-600">
          <p className="leading-relaxed">
            Welcome to <b className="text-gray-800">Forever</b>, where quality meets affordability. We believe that shopping should be **easy, reliable, and exciting**. Our platform offers a carefully curated selection of premium products at unbeatable prices.
          </p>
          <p className="leading-relaxed">
            Every item you find here has been handpicked to deliver the **best value and quality**. From fashion to electronics, we ensure that you get the **latest trends, cutting-edge technology, and top-rated products**—all in one place.
          </p>

          <b className="text-gray-800 text-lg">Why We Stand Out</b>
          <ul className="list-disc pl-6">
            <li>🌟 **Top-rated Products** – Only the best brands and quality items</li>
            <li>🚀 **Fast & Reliable Shipping** – Get your orders quickly and securely</li>
            <li>💰 **Best Deals & Discounts** – Affordable pricing with exciting offers</li>
            <li>🔒 **100% Secure Payments** – Shop with confidence</li>
            <li>🤝 **Hassle-free Returns** – Customer satisfaction is our top priority</li>
          </ul>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="text-center mb-10">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center gap-4 transition-transform hover:scale-105">
          <FaCheckCircle className="text-gray-900 text-4xl" />
          <b className="text-lg">Unmatched Quality</b>
          <p className="text-gray-600">
            We meticulously select every product to ensure superior quality and durability.
          </p>
        </div>
        <div className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center gap-4 transition-transform hover:scale-105">
          <FaStar className="text-yellow-500 text-4xl" />
          <b className="text-lg">Customer Trust</b>
          <p className="text-gray-600">
            With thousands of happy customers, our 5-star ratings speak for themselves.
          </p>
        </div>
        <div className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center gap-4 transition-transform hover:scale-105">
          <FaShippingFast className="text-red-500 text-4xl" />
          <b className="text-lg">Fast & Secure Shipping</b>
          <p className="text-gray-600">
            Get your orders delivered quickly and safely, with real-time tracking.
          </p>
        </div>
        <div className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center gap-4 transition-transform hover:scale-105">
          <FaMoneyCheckAlt className="text-green-500 text-4xl" />
          <b className="text-lg">Best Price Guarantee</b>
          <p className="text-gray-600">
            Enjoy competitive pricing with exciting discounts and exclusive deals.
          </p>
        </div>
        <div className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center gap-4 transition-transform hover:scale-105">
          <FaHeadset className="text-blue-500 text-4xl" />
          <b className="text-lg">24/7 Customer Support</b>
          <p className="text-gray-600">
            Our friendly support team is always here to help, anytime, anywhere.
          </p>
        </div>
        <div className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center gap-4 transition-transform hover:scale-105">
          <FaGift className="text-purple-500 text-4xl" />
          <b className="text-lg">Exciting Rewards</b>
          <p className="text-gray-600">
            Earn rewards and cashback on every purchase. The more you shop, the more you save!
          </p>
        </div>
      </div>

      {/* CUSTOMER TESTIMONIALS */}
      <div className="text-center my-16">
        <Title text1="OUR" text2="CUSTOMERS LOVE US" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border p-6 rounded-lg shadow-md text-center">
          <p className="italic">"I ordered my phone from Forever, and it arrived in just 2 days! The quality and service are amazing!"</p>
          <b className="block mt-3">- Alex M.</b>
        </div>
        <div className="border p-6 rounded-lg shadow-md text-center">
          <p className="italic">"This is my go-to store for fashion. The quality is unmatched, and the discounts are insane!"</p>
          <b className="block mt-3">- Sarah K.</b>
        </div>
        <div className="border p-6 rounded-lg shadow-md text-center">
          <p className="italic">"Superb experience! Hassle-free returns and quick refunds. Will shop again!"</p>
          <b className="block mt-3">- Daniel W.</b>
        </div>
      </div>


      {/* NEWSLETTER SECTION */}
      <div className="mt-20">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;