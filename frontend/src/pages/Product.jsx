import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, currency, cartItems, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [totalReviews, setTotalReviews] = useState(20);
  const [randomReviews, setRandomReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");

  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [userReviews, setUserReviews] = useState([]);
  const [randomDescription, setRandomDescription] = useState("");

  const descriptions = [
    "Experience premium craftsmanship with this product, made from top-quality materials for unmatched durability. Its sleek design ensures comfort and functionality, making it ideal for everyday use. Whether for work or leisure, this product enhances your experience with its reliable performance. Customers love its stylish appeal and long-lasting build. Designed with innovation in mind, it seamlessly blends efficiency with elegance. The user-friendly features make it a standout choice for those who value excellence. Elevate your lifestyle with a product that exceeds expectations in every way. A must-have for anyone seeking quality, style, and superior functionality in one package.",
    "Upgrade your experience with this high-performance product, designed to deliver outstanding results every time. Made with precision and care, it offers durability, reliability, and aesthetic appeal. The advanced design ensures seamless usability, making it perfect for professionals and everyday users alike. Its high-quality build guarantees long-lasting performance, keeping up with your dynamic lifestyle. Whether you need efficiency, style, or convenience, this product has it all. Customers rave about its exceptional features and ease of use. Discover the perfect combination of innovation and elegance in one outstanding product, built to surpass expectations and offer ultimate satisfaction.",
    "Crafted for excellence, this product redefines quality and durability. Its advanced features and premium materials ensure top-notch performance, making it an essential choice for those who demand the best. The sleek and stylish design is complemented by high functionality, providing an effortless and enjoyable user experience. Perfect for both beginners and experts, it adapts to various needs with ease. Customers praise its smooth operation and long-lasting reliability. Designed for those who value innovation and efficiency, this product is a game-changer in its category. Elevate your standards with this must-have item that blends style, comfort, and superior quality.",
    "Transform your everyday routine with this premium-quality product, designed for reliability and ease of use. Built with the finest materials, it offers exceptional durability and longevity. Whether you are a professional or a casual user, its intuitive design ensures effortless operation. The stylish and modern aesthetics add a touch of sophistication to any setting. Customers appreciate its seamless functionality and outstanding performance. This product is a testament to innovation, delivering results that go beyond expectations. Make a smart investment in quality and efficiency with this must-have item that enhances your lifestyle and guarantees complete satisfaction.",
    "Achieve the perfect balance of style and functionality with this premium product. Designed for superior performance, it meets the highest standards of quality and durability. The user-friendly interface ensures a seamless experience, making it ideal for all skill levels. Crafted from top-grade materials, it offers unmatched longevity and resilience. Customers love its sleek design and easy-to-use features. Whether for professional or personal use, this product consistently delivers outstanding results. A trusted choice for those who value efficiency, comfort, and innovation, it enhances your everyday experience in the best possible way. Elevate your expectations with this must-have item.",
    "Enjoy the perfect combination of style, performance, and reliability with this exceptional product. Created with high-quality materials, it guarantees durability and long-lasting satisfaction. Designed to enhance your everyday tasks, its intuitive features make it easy to use for everyone. The sleek, elegant design complements any environment, adding both practicality and aesthetic appeal. Customers appreciate its effortless functionality and smooth operation. Whether you're upgrading an old favorite or trying something new, this product delivers beyond expectations. A perfect companion for modern lifestyles, it is built to perform and impress. Invest in excellence and experience the best results today.",
    "Enhance your daily routine with this outstanding product, designed with precision and care. Built for efficiency and ease of use, it provides the perfect balance of innovation and practicality. The high-quality materials ensure durability, allowing you to enjoy seamless functionality for years to come. With a stylish and ergonomic design, it fits effortlessly into your lifestyle. Customers love its reliability and superior craftsmanship. Whether for home, work, or travel, this product is a game-changer. Make every experience better with a product that exceeds expectations and delivers top-tier performance. Elevate your standards and choose quality today.",
    "Built for excellence, this product combines durability, efficiency, and a sleek modern design. Crafted from high-quality materials, it stands the test of time and delivers unmatched performance. Whether you need it for work or leisure, it adapts to your needs with ease. Customers love its effortless usability and seamless operation. Designed with innovation in mind, it provides a superior experience for all users. Perfect for those who appreciate quality and convenience, it enhances your daily routine with flawless efficiency. Discover the benefits of top-tier craftsmanship and enjoy a product that delivers outstanding results every time.",
    "Unleash the power of top-quality craftsmanship with this remarkable product. Designed to meet your everyday needs, it offers high durability, superior functionality, and an elegant appearance. Made with precision, its innovative features provide ease of use and enhanced performance. Customers appreciate its long-lasting build and effortless usability. Whether for professional or personal use, this product guarantees top-tier results. Experience the blend of modern design and outstanding efficiency with this must-have item. A trusted choice for those who seek perfection, it enhances your lifestyle in every possible way. Invest in excellence and enjoy a premium experience today.",
    "Revolutionize your experience with this exceptional product, created for those who demand the best. Made with high-quality materials, it ensures durability, style, and peak performance. Its user-friendly design makes it perfect for all users, regardless of experience. Customers love its intuitive features and seamless operation. Whether for work, leisure, or travel, this product delivers unmatched results. Designed with a focus on innovation, it combines aesthetic appeal with practical efficiency. Enjoy the perfect balance of sophistication and reliability. With this product, excellence is just a purchase away. Upgrade your lifestyle with a product that guarantees satisfaction and superior performance.",
  ];

  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=20&nat=in").then((response) => {
      const users = response.data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        avatar: user.picture.thumbnail,
        text: "Great product! Works flawlessly and is worth every penny.",
        rating: Math.floor(Math.random() * 2) + 4,
      }));
      setRandomReviews(users);
    });
    setRandomDescription(getRandomItem(descriptions));
  }, []);

  const handleReviewSubmit = () => {
    if (userReview.trim() === "") {
      toast.error("Please enter a review before submitting.");
      return;
    }

    const newReview = {
      name: "You",
      avatar: "",
      text: userReview,
      rating: userRating,
    };

    setUserReviews([newReview, ...userReviews]);
    setTotalReviews((prev) => prev + 1);
    setUserReview("");
    setUserRating(5);
  };

  const handleBuyNow = () => {
    if (!size) {
        toast.error("Please select a size.");
        return; // Prevent navigation
    }

    try{
        addToCart(productData._id, size);
        navigate("/cart");
    } catch(e){
        toast.error("Error adding to cart");
        return;
    }

};
  const fetchProductData = () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, i) => (
              <img
                src={item}
                key={i}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl my-2">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium">
            {currency}{productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, i) => (
                <button
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`}
                  key={i}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mr-4" onClick={() => addToCart(productData._id, size)}>ADD TO CART</button>
          <button
    className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
    onClick={handleBuyNow}
>
    BUY NOW
</button>
        </div>
      </div>

      <div className="mt-20 mx-auto">
        <div className="flex border-b">
          <button
            className={`px-5 py-3 text-sm border ${activeTab === "description" ? "bg-gray-200 font-bold" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm border ${activeTab === "reviews" ? "bg-gray-200 font-bold" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({totalReviews})
          </button>
        </div>

        <div className="border px-6 py-6 text-sm text-gray-500">
          {activeTab === "description" ? (
            <p>{randomDescription}</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="sm:w-1/3 p-4 border rounded-lg bg-white shadow-md">
                <h3 className="font-semibold mb-3">Rate This Product</h3>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-2xl ${star <= userRating ? "text-yellow-500" : "text-gray-300"}`}
                      onClick={() => setUserRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  className="w-full p-2 border rounded-md"
                  placeholder="Write your review..."
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                />
                <button
                  className="mt-3 bg-black text-white px-4 py-2 text-sm w-full"
                  onClick={handleReviewSubmit}
                >
                  Submit Review
                </button>
              </div>

              <div className="sm:w-2/3 space-y-4">
                {[...userReviews, ...randomReviews].map((review, index) => (
                  <div key={index} className="border p-4 rounded-lg shadow-sm flex items-center gap-4 bg-white">
                    {/* {review.avatar && <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />} */}
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-gray-600">{review.text}</p>
                      <div className="text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;