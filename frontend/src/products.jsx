import React from "react";
import "./Product.css";  // Import the CSS file for styling

function Products() {
  const products = [
    { id: 1, name: "Galaxy S24 Ultra 256GB", price: "฿43,990.00", image: "https://image-us.samsung.com/us/smartphones/galaxy-s24/all-gallery/01_E3_OnlineExclusive_TitaniumOrange_Lockup_1600x1200.jpg?$product-details-jpg$" },
    { id: 2, name: "Galaxy Buds3 Pro, Silver", price: "฿4,790.00", image: "https://image-us.samsung.com/SamsungUS/home/mobile/audio/headphones/buds3-gallery/SCOMB6Q6-887-SM-R630_001_Front_Silver_RGB-1600x1200.jpg?$default-400-jpg$" },
    { id: 3, name: "Galaxy Watch7, 44mm, Green, Bluetooth / Wifi", price: "฿6,390.00", image: "https://image-us.samsung.com/us/galaxy-watch7/gallery/SCOMB6Q6-59-SM-L310_001_Front_Green-1600x1200.jpg?$default-400-jpg$" },
    { id: 4, name: "Samsung A35 ", price: "฿10,999.00", image: "https://media-cdn.bnn.in.th/379861/Galaxy-A35--Light-Violet-1-square_medium.jpg" },
    { id: 5, name: "iPhone 13 128GB Midnight", price: "฿17,200.00", image: "https://media.education.studio7thailand.com/40154/iPhone_13_PDP_Position-1A_Color_Midnight__1-square_medium.jpg" },
    { id: 6, name: "iPhone 15 Plus 512GB Blue", price: "฿29,900.00", image: "https://media-cdn.bnn.in.th/332557/iPhone_15_Plus_Blue_1-square_medium.jpg" },
    { id: 7, name: "Apple iPhone 13 Pro Max Black", price: "฿43,400.00", image: "https://media-cdn.bnn.in.th/234782/iPhone_14_Pro_Max_Space_Black_PDP_Image_Position-1A_Space_Black_1-square_medium.jpg" },
    { id: 8, name: "Apple iPhone 14 Pro (1TB, Gold)", price: "฿58,500.00", image: "https://media-cdn.bnn.in.th/234752/iPhone_14_Pro_Gold_PDP_Image_Position-1A_Gold_1-square_medium.jpg" },
    { id: 9, name: "iPhone 13 128GB Blue", price: "฿17,200.00", image: "https://www.istudiobyspvi.com/cdn/shop/files/iPhone_13_Blue_PDP_Image_Position-1A__GBEN.jpg?v=1718110651&width=823" },
    { id: 10, name: "Apple iPhone 14 5G 128GB - Midnight", price: "฿21,700.00", image: "https://media-cdn.bnn.in.th/234723/iPhone_14_Midnight_PDP_Image_Position-1A_Midnight_1-square_medium.jpg" }
  ];

  return (
    <div className="products-container">
      <h2 className="products-title">Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
