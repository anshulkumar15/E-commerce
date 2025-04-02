import { assets } from "../assets/assets";
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const policies = {
  exchange: {
    title: "Easy Exchange Policy",
    content: `
      <p>We offer a hassle-free exchange process within 30 days of purchase. If you are not completely satisfied with your order, you may request an exchange for a different size, color, or product.</p>
      
      <p><strong>Exchange Conditions:</strong></p>
      <ul>
        <li>Items must be in unused and original condition with tags attached.</li>
        <li>Proof of purchase (invoice or order confirmation) is required.</li>
        <li>Exchanges are subject to stock availability.</li>
        <li>Personalized or custom-made items are not eligible for exchange.</li>
      </ul>
      
      <p><strong>How to Exchange:</strong></p>
      <ol>
        <li>Contact our customer support at support@foreveryou.com.</li>
        <li>Provide your order details and reason for exchange.</li>
        <li>We will provide a return shipping label.</li>
        <li>Once received and inspected, we will process the exchange.</li>
      </ol>
      
      <p>If the requested exchange is unavailable, we will issue store credit or a refund.</p>
    `,
  },
  delivery: {
    title: "Delivery Information",
    content: `
      <p>We offer fast and reliable shipping to ensure your products reach you on time.</p>
      
      <p><strong>Shipping Options:</strong></p>
      <ul>
        <li><strong>Standard Shipping:</strong> 5-7 business days</li>
        <li><strong>Express Shipping:</strong> 2-3 business days</li>
        <li><strong>Overnight Shipping:</strong> Next business day (orders before 2 PM)</li>
      </ul>
      
      <p><strong>Delivery Charges:</strong></p>
      <ul>
        <li>Free shipping on orders over $50.</li>
        <li>Standard shipping: $4.99</li>
        <li>Express shipping: $9.99</li>
        <li>Overnight shipping: $19.99</li>
      </ul>
      
      <p><strong>Tracking Your Order:</strong></p>
      <p>Once your order is shipped, you will receive a tracking number via email. You can track your order through our website in the 'Order Status' section.</p>
      
      <p><strong>International Shipping:</strong></p>
      <p>We ship worldwide. Delivery times may vary based on location and customs clearance.</p>
    `,
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      <p>Your privacy is our priority. We are committed to protecting your personal information and ensuring a secure shopping experience.</p>
      
      <p><strong>Information We Collect:</strong></p>
      <ul>
        <li>Name, email, and contact details for order processing.</li>
        <li>Payment information (secured via encryption).</li>
        <li>Browsing activity to improve user experience.</li>
      </ul>
      
      <p><strong>How We Use Your Information:</strong></p>
      <ul>
        <li>Process orders and transactions.</li>
        <li>Improve website functionality and user experience.</li>
        <li>Send promotional emails (only with your consent).</li>
      </ul>
      
      <p><strong>Data Protection Measures:</strong></p>
      <ul>
        <li>SSL encryption for secure transactions.</li>
        <li>No sharing of personal data with third parties without consent.</li>
        <li>Compliance with GDPR and CCPA regulations.</li>
      </ul>
      
      <p>You can request to delete or modify your data by contacting our support team.</p>
    `,
  },
  terms: {
    title: "Terms & Conditions",
    content: `
      <p>By using this website, you agree to our terms and conditions outlined below.</p>
      
      <p><strong>Use of Website:</strong></p>
      <ul>
        <li>Users must be at least 18 years old or have parental consent.</li>
        <li>Unauthorized use or duplication of content is prohibited.</li>
      </ul>
      
      <p><strong>Orders & Payments:</strong></p>
      <ul>
        <li>Orders are confirmed only after successful payment processing.</li>
        <li>We reserve the right to cancel orders due to pricing errors or stock unavailability.</li>
      </ul>
      
      <p><strong>Returns & Refunds:</strong></p>
      <ul>
        <li>Products must be returned within 30 days for a refund.</li>
        <li>Refunds will be issued to the original payment method within 7-10 business days.</li>
      </ul>
      
      <p><strong>Limitation of Liability:</strong></p>
      <p>We are not responsible for indirect damages arising from website use, including delays in delivery or product availability.</p>
      
      <p>For any disputes, please contact our legal team at legal@foreveryou.com.</p>
    `,
  },
};

const Footer = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: "" });

  const openModal = (policyKey) => {
    setModalData(policies[policyKey]);
    setIsOpen(true);
  };

  const handleClick = (e, key) => {
    e.preventDefault();
    navigate("/products", {
      state: {
        key: key,
      },
    });
  };

  return (
    <footer className="text-gray-700 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <img src={assets.shopsneoLogo} className="mb-5 w-32" alt="Logo" />
            <p className="text-sm">
              We provide the best quality products at unbeatable prices. Your satisfaction is our priority.
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="text-lg font-medium mb-4">CATEGORIES</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li onClick={(e) => handleClick(e, "clothes")} className="cursor-pointer  text-blue-600 hover:underline">
                Men's Fashion
              </li>
              <li onClick={(e) => handleClick(e, "clothes")} className="cursor-pointer text-blue-600 hover:underline">
                Women's Fashion
              </li>
              <li onClick={(e) => handleClick(e, "mobile")} className="cursor-pointer text-blue-600 hover:underline">
                Electronics
              </li>
              <li onClick={(e) => handleClick(e, "Watches")} className="cursor-pointer text-blue-600 hover:underline">
                Smart Watches
              </li>
              <li onClick={(e) => handleClick(e, "jewellery")} className="cursor-pointer  text-blue-600 hover:underline">
                Artificial Jewellery
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-lg font-medium mb-4">COMPANY</p>
            <ul className="flex flex-col gap-2 text-sm cursor-pointer">
              <li onClick={() => navigate("/about")}  className="text-blue-600 hover:underline">About Us</li>
              <li>
                <button className="text-blue-600 hover:underline" onClick={() => openModal("delivery")}>
                  Delivery Information
                </button>
              </li>
              <li>
                <button className="text-blue-600 hover:underline" onClick={() => openModal("privacy")}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-blue-600 hover:underline" onClick={() => openModal("terms")}>
                  Terms & Conditions
                </button>
              </li>
              <li onClick={() => navigate("/contact")}  className="text-blue-600 hover:underline">Contact Us</li>
            </ul>
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md text-left shadow-lg">
                  <h2 className="text-xl font-bold mb-4">{modalData.title}</h2>
                  <div className="overflow-y-auto max-h-96" dangerouslySetInnerHTML={{ __html: modalData.content }}></div>
                  <div className="mt-6 flex justify-end">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Get in Touch &

          {/* Get in Touch & Newsletter */}
          <div>
            <p className="text-lg font-medium mb-4">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>📞 +1-212-521-4569</li>
              <li>📧 contact@foreveryou.com</li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300  text-blue-600 hover:underline" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300  text-black-600 hover:underline" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300  text-red-600 hover:underline" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300  text-blue-600 hover:underline" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        {/* <div className="mt-10 text-center">
          <p className="text-lg font-medium">Subscribe to Our Newsletter</p>
          <div className="flex flex-col sm:flex-row justify-center mt-3 gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md text-sm w-full sm:w-1/3"
            />
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-700">
              Subscribe
            </button>
          </div>
        </div> */}

        {/* Copyright */}
        <hr className="my-5" />
        <p className="text-center text-sm">
          © 2025 shopsneo.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;