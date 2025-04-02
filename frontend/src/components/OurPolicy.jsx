import { assets } from "../assets/assets";
import { useState } from "react";
import "../css/navv.css"

const policies = {
  exchange: {
    title: "Easy Exchange Policy",
    content: `
      <p>We offer a hassle-free exchange policy to ensure you have a smooth shopping experience. 
      If you're not satisfied with your purchase or need a different size, color, or style, you 
      can easily exchange it within 30 days of receiving your order.</p>

      <p><strong>Conditions:</strong></p>
      <ul>
        <li>The item must be unused, unwashed, and in original packaging with tags attached.</li>
        <li>Proof of purchase (invoice or order confirmation) is required.</li>
        <li>Exchanges are subject to stock availability.</li>
        <li>Items purchased during sales or promotions may not be eligible for exchange.</li>
      </ul>

      <p><strong>How to Exchange:</strong></p>
      <ol>
        <li>Contact customer support at support@foreveryou.com.</li>
        <li>Provide your order details and reason for exchange.</li>
        <li>We will arrange a return pickup or provide a return shipping label.</li>
        <li>Once received and inspected, we will process the exchange within 3-5 business days.</li>
      </ol>
    `,
  },
  return: {
    title: "7 Days Return Policy",
    content: `
      <p>Your satisfaction is our priority! If you are not happy with your purchase, we offer a 
      7-day free return policy for your convenience.</p>

      <p><strong>Return Eligibility:</strong></p>
      <ul>
        <li>The item must be in original condition with all packaging and tags intact.</li>
        <li>Products should not be used, damaged, or washed.</li>
        <li>Returns must be requested within 7 days of delivery.</li>
        <li>Personalized or customized items are not eligible for return.</li>
      </ul>

      <p><strong>How to Initiate a Return:</strong></p>
      <ol>
        <li>Visit our Returns Page or contact us at support@foreveryou.com.</li>
        <li>Provide your order ID and reason for return.</li>
        <li>We will provide a return shipping label or arrange a free pickup.</li>
        <li>Once the item is received and inspected, we will process your refund within 5-7 business days.</li>
      </ol>
      
      <p><strong>Refund Options:</strong></p>
      <ul>
        <li>Refunds will be credited to your original payment method.</li>
        <li>You may also opt for store credit for your next purchase.</li>
      </ul>
    `,
  },
  support: {
    title: "Best Customer Support",
    content: `
      <p>We believe in providing the best customer service experience for our valued customers. 
      Our dedicated support team is available 24/7 to assist you with any inquiries, concerns, or issues.</p>

      <p><strong>How We Support You:</strong></p>
      <ul>
        <li>24/7 Availability – Our team is always ready to assist you, day or night.</li>
        <li>Multiple Support Channels – Reach out via live chat, email, or phone.</li>
        <li>Quick Response Time – We aim to respond to all queries within 24 hours.</li>
        <li>Order & Shipping Assistance – Track orders, resolve payment issues, or modify shipping details with ease.</li>
        <li>Product Guidance – Need help choosing the right product? Our experts are here to guide you.</li>
      </ul>

      <p>📧 Email Support: support@foreveryou.com</p>
      <p>📞 Phone Support: +1-212-521-4569</p>
    `,
  },
};

const OurPolicy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: "" });

  const openModal = (policyKey) => {
    setModalData(policies[policyKey]);
    setIsOpen(true);
  };

  return (
 <div className="flex flex-col xl:flex-row justify-around gap-12 sm:gap-2 text-center py-8 text-xs sm:text-sm md:text-base text-gray-700">
  <ul className="space-y-3 flex flex-col xl:flex-row xl:space-y-0 xl:gap-x-20 gapp"> {/* Using gap-x-20 */}
    <li>
      <img src={assets.exchange_icon} className="w-12 m-auto mb-5 xl:mb-0" alt="" />
      <button className="text-blue-600 hover:underline" onClick={() => openModal("exchange")}>
        Easy Exchange Policy
      </button>
    </li>
    <li>
      <img src={assets.quality_icon} className="w-12 m-auto mb-5 xl:mb-0" alt="" />
      <button className="text-blue-600 hover:underline" onClick={() => openModal("return")}>
        7 Days Return Policy
      </button>
    </li>
    <li>
      <img src={assets.support_img} className="w-12 m-auto mb-5 xl:mb-0" alt="" />
      <button className="text-blue-600 hover:underline" onClick={() => openModal("support")}>
        Best Customer Support
      </button>
    </li>
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
  );
};

export default OurPolicy;