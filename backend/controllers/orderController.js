import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import nodemailer from "nodemailer";


//GLOBAL VARIABLES
const currency = "usd";
const deliveryCharges = 10;

//GET WAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail or your preferred email service
  auth: {
    user: "devanshjinraniya41@gmail.com", // Replace with your email
    pass: "mtonrhqeigxyrjto", // Replace with your email password (use app password for Gmail)
  },
});

const sendOrderConfirmationToAdmin = async (userId, items, amount, address , adminemail) => {
  // Format items list for email
  const itemsList = items.map(item => 
    `- ${item.name} (${item.size}) x${item.quantity} - ₹${item.price}`
  ).join('\n');

  const mailOptions = {
    from: "yourstore@example.com", // Replace with your sender email
    to: adminemail,
    subject: `New Order Placed by ${address.firstName}! 🛒`,
    text: `Hello Admin,

A new order has been placed on your store! 🎉

Order Details:
🔹 Customer: ${address.firstName} ${address.lastName}
🔹 Email: ${address.email}
🔹 Phone: ${address.phone}
🔹 Total Amount: ₹${amount}
🔹 Payment Method: COD (Cash on Delivery)
🔹 Order Date: ${new Date().toLocaleString()}

Shipping Address:
${address.street}
${address.city}, ${address.state} ${address.zipcode}
${address.country}

Items Ordered:
${itemsList}

Please review the order details and proceed with fulfillment as soon as possible.

Best regards,
Your Store Team`,
  };

  return transporter.sendMail(mailOptions);
};


const sendOrderConfirmationToUser = async (userId, items, amount, address) => {
  // Format items list for email
  const itemsList = items.map(item => 
    `- ${item.name} (${item.size}) x${item.quantity} - ₹${item.price}`
  ).join('\n');

  const mailOptions = {
    from: "yourstore@example.com", // Replace with your sender email
    to: address.email,
    subject: `Your Order Confirmation 🛍️`,
    text: `Hello ${address.firstName},

Thank you for your order! 🎉

We're excited to confirm that your order has been received and is being processed.

Order Details:
🔹 Order Number: ${userId.substring(0, 8).toUpperCase()}
🔹 Total Amount: ₹${amount}
🔹 Payment Method: Cash on Delivery
🔹 Order Date: ${new Date().toLocaleString()}

Shipping Address:
${address.street}
${address.city}, ${address.state} ${address.zipcode}
${address.country}

Items Ordered:
${itemsList}

You'll receive another email when your order ships. If you have any questions about your order, please don't hesitate to contact our customer service team.

Thanks for shopping with us!

Best regards,
Your Store Team`,
  };

  return transporter.sendMail(mailOptions);
};

// PLACING ORDERS USING COD
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    console.log( userId, items, amount, address)

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    console.log("Address is ", address.email);
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const adminemail = "anshulkumar6140@gmail.com"

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    sendOrderConfirmationToAdmin(userId, items , amount , address ,adminemail);
    sendOrderConfirmationToUser(userId, items, amount, address);
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// PLACING ORDERS USING STRIPE
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//VERIFY STRIPE
export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// PLACING ORDERS USING RAZORPAY
export const placeOrderRazorpay = async (req, res) => {};

//ALL ORDERS DATA FOR ADMIN PANEL
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//USER ORDERS DATA FOR FRONTEND
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//UPDATE ORDER STATUS FROM ADMIN PANEL
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
