import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useLocation } from "react-router-dom";

const categories = [
  "Men", "Women", "Kids", "Electronics", "Home & Kitchen", "Beauty & Health",
  "Sports & Outdoors", "Automotive", "Books", "Toys & Games", "Artificial Jewelry", "Shoes"
];

const subCategories = {
  Men: [
    "Topwear", "Bottomwear", "Winterwear", "Footwear", "Accessories", 
    "Innerwear", "Ethnic Wear", "Suits & Blazers", "Watches", "Sunglasses"
  ],
  Women: [
    "Dresses", "Ethnic Wear", "Western Wear", "Jewelry", "Handbags", 
    "Footwear", "Lingerie", "Sarees", "Kurtis", "Beauty Products"
  ],
  Kids: [
    "Boys Clothing", "Girls Clothing", "Toys", "School Supplies", 
    "Baby Essentials", "Footwear", "Bags", "Party Wear"
  ],
  Electronics: [
    "Mobiles", "Laptops", "Cameras", "Headphones", "Smart Watches", 
    "Tablets", "Gaming Consoles", "Smart TVs", "Printers", "Drones"
  ],
  "Home & Kitchen": [
    "Furniture", "Home Decor", "Kitchen Appliances", "Lighting", 
    "Storage Solutions", "Bedding", "Bathroom Essentials", "Cleaning Supplies"
  ],
  "Beauty & Health": [
    "Makeup", "Skincare", "Haircare", "Fragrances", "Personal Care", 
    "Hygiene Products", "Health Supplements", "Fitness Gear"
  ],
  "Sports & Outdoors": [
    "Gym Equipment", "Outdoor Gear", "Cycling", "Camping Equipment", 
    "Team Sports", "Running Gear", "Swimming Accessories"
  ],
  Automotive: [
    "Car Accessories", "Bike Accessories", "Car Care", "Helmets", 
    "Motorbike Gear", "Spare Parts", "Car Electronics"
  ],
  Books: [
    "Fiction", "Non-Fiction", "Educational", "Comics", "Biographies", 
    "Self-Help", "Fantasy", "Science Fiction", "Children’s Books"
  ],
  "Toys & Games": [
    "Board Games", "Action Figures", "Puzzles", "Building Blocks", 
    "Dolls", "Remote Control Toys", "Video Games"
  ],
  "Artificial Jewelry": [
    "Earrings", "Necklaces", "Bracelets", "Rings", "Anklets", 
    "Bangles", "Brooches", "Hair Accessories"
  ],
  Shoes: [
    "Men's Shoes", "Women's Shoes", "Kids' Shoes", "Sports Shoes", 
    "Casual Shoes", "Formal Shoes", "Sandals & Flip-Flops"
  ],
  "Pet Supplies": [
    "Dog Food", "Cat Food", "Pet Toys", "Pet Grooming", 
    "Aquarium Supplies", "Bird Supplies", "Pet Beds", "Leashes & Collars"
  ],
  Stationery: [
    "Notebooks", "Pens & Pencils", "Office Supplies", "Art Supplies", 
    "Paper Products", "Desk Organizers", "Sticky Notes", "Craft Supplies"
  ],
  "Musical Instruments": [
    "Guitars", "Pianos", "Drums", "Violins", "Flutes", 
    "Keyboards", "Ukuleles", "Music Accessories"
  ],
  Gardening: [
    "Seeds", "Plants", "Gardening Tools", "Pots & Planters", 
    "Fertilizers", "Watering Equipment", "Garden Furniture", "Lawn Care"
  ],
  "Baby Products": [
    "Diapers", "Baby Clothing", "Baby Toys", "Baby Care", 
    "Baby Food", "Strollers", "Cribs", "Bath Essentials"
  ],
  "Smart Home": [
    "Smart Lights", "Smart Security", "Smart Plugs", "Voice Assistants", 
    "Smart Thermostats", "Smart Door Locks", "Smart Appliances"
  ],
  "Travel & Luggage": [
    "Suitcases", "Backpacks", "Duffel Bags", "Travel Accessories", 
    "Laptop Bags", "Wallets & Cardholders", "Trolley Bags"
  ],
  "Watches & Wearables": [
    "Analog Watches", "Digital Watches", "Smartwatches", "Fitness Bands", 
    "Luxury Watches", "Chronographs"
  ]
};


const Clothes = () => {
  const location= useLocation();
  const item= location.state?.key;

  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [currentCategories, setCurrentCategories]= useState([]);

  useEffect(() => {
    if (item === "clothes") {
      setCurrentCategories(["Men", "Women", "Kids"]);
    } else if (item === "laptop") {
      setCurrentCategories(["Electronics"]);
    }else if (item === "mobile") {
      setCurrentCategories(["Electronics"]);
    }else if (item === "accessories") {
      setCurrentCategories(["Electronics"]);
    }else if (item === "watches") {
      setCurrentCategories(["Electronics"]);
    }else if (item === "jewellery") {
      setCurrentCategories(["Artificial Jewelry"]);
    } else {
      setCurrentCategories(categories);
    }
  }, [item]);
  

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (item === "clothes") {
      productsCopy = productsCopy.filter(
        (product) => product.category === "Men" || product.category === "Women" || product.category === "Kids"
      );
    } else if (item === "laptops") {
      productsCopy = productsCopy.filter(
        (product) => product.category === "Electronics" && product.subCategory === "Laptops"
        
      );
    }else if (item === "mobile") {
      productsCopy = productsCopy.filter(
        (product) => product.category === "Electronics" && product.subCategory === "Mobiles" && product.subCategory === "Tablets"
      );
    }else if (item === "accessories") {
      productsCopy = productsCopy.filter(
        (product) => product.category === "Electronics" && product.subCategory === "Headphones" && product.subCategory === "Cameras" && product.subCategory === "Gaming Consoles" && product.subCategory === "Drones" && product.subCategory === "Printers"
      );
    }else if (item === "watches") {
      productsCopy = productsCopy.filter(
        (product) => product.category === "Electronics" && product.subCategory === "Smart Watches"
      );
    }else if (item === "jewellery") {
      productsCopy = productsCopy.filter(
        (product) => product.category === "Artificial Jewelry"
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, item]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? " " : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          {currentCategories.length > 0
              && currentCategories.map((cat) => (
                  <p key={cat} className="flex gap-2">
                    <input className="w-3" type="checkbox" value={cat} onChange={toggleCategory} /> {cat}
                  </p>
                ))
             }
          </div>
        </div>

        {category.length > 0 && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? " " : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {category.flatMap((cat) => subCategories[cat] || []).map((sub) => (
                <p key={sub} className="flex gap-2">
                  <input className="w-3" type="checkbox" value={sub} onChange={toggleSubCategory} /> {sub}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={item} />
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {Array.isArray(filterProducts) && (filterProducts?.map((item, i) => (
            <ProductItem key={i} id={item._id} image={item.image} name={item.name} price={item.price} />
          )))}
        </div>
      </div>
    </div>
  );
};

export default Clothes;