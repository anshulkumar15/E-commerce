import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const categories = [
  "Men", "Women", "Kids", "Electronics", "Home & Kitchen", "Beauty & Health", "Sports & Outdoors", 
  "Automotive", "Books", "Toys & Games", "Artificial Jewelry", "Shoes", "Pet Supplies", "Stationery", 
  "Musical Instruments", "Gardening", "Baby Products"
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


const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2 ">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full ">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="w-full ">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
      <div className="w-full">
        <p className="mb-2">Select Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>


      {category && (
        <div className="w-full">
          <p className="mb-2">Select Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            {subCategories[category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

        <div>
          <p className="mb-2">Product Price</p>
          <input
            type="number"
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="25"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        {(subCategory==='Topwear' || subCategory==='Winterwear') &&(<div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("S") ? p.filter((item) => item !== "S") : [...p, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              S
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("M") ? p.filter((item) => item !== "M") : [...p, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              M
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("L") ? p.filter((item) => item !== "L") : [...p, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("XL")
                  ? p.filter((item) => item !== "XL")
                  : [...p, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("XXL")
                  ? p.filter((item) => item !== "XXL")
                  : [...p, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              XXL
            </p>
          </div>
        </div>)}

        {(subCategory==='Bottomwear') &&(<div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(30) ? p.filter((item) => item !== 30) : [...p, 30]
              )
            }
          >
            <p
              className={`${
                sizes.includes(30) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              30
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(32) ? p.filter((item) => item !== 32) : [...p, 32]
              )
            }
          >
            <p
              className={`${
                sizes.includes(32) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
            32
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(34) ? p.filter((item) => item !== 34) : [...p, 34]
              )
            }
          >
            <p
              className={`${
                sizes.includes(34) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
            34
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(36)
                  ? p.filter((item) => item !== 36)
                  : [...p, 36]
              )
            }
          >
            <p
              className={`${
                sizes.includes(36) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              36
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(38)
                  ? p.filter((item) => item !== 38)
                  : [...p, 38]
              )
            }
          >
            <p
              className={`${
                sizes.includes(38) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              38
            </p>
          </div>
        </div>)}

        {(subCategory==='Footwear') &&(<div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(7) ? p.filter((item) => item !== 7) : [...p, 7]
              )
            }
          >
            <p
              className={`${
                sizes.includes(7) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              7
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(8) ? p.filter((item) => item !== 8) : [...p, 8]
              )
            }
          >
            <p
              className={`${
                sizes.includes(8) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
            8
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(9) ? p.filter((item) => item !== 9) : [...p, 9]
              )
            }
          >
            <p
              className={`${
                sizes.includes(9) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
            9
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes(10)
                  ? p.filter((item) => item !== 10)
                  : [...p, 10]
              )
            }
          >
            <p
              className={`${
                sizes.includes(10) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              10
            </p>
          </div>
        </div>)}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((p) => !p)}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        className="w-28 py-3 mt-4 bg-black bg-black text-white"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Add;