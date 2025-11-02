import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Restaurants() {
  const navigate = useNavigate();

  const restaurants = [
    {
      name: "Spice Nation",
      cuisine: "North Indian",
      location: "Delhi",
      img: "https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2024/7/31/cd6c533b-e3fa-442f-851d-df4887e169b5_20240731T083120408.jpg",
    },
    {
      name: "Madras Curry House",
      cuisine: "South Indian",
      location: "Chennai",
      img: "https://www.topbengaluru.com/wp-content/uploads/2024/03/The-Rameshwaram-Cafe-Brookfield-1-300x225.jpg.webp",
    },
    {
      name: "Royal Biryani Palace",
      cuisine: "Hyderabadi",
      location: "Hyderabad",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/b8/ee/80/getlstd-property-photo.jpg?w=1400&h=800&s=1",
    },
    {
      name: "Punjabi Rasoi",
      cuisine: "Punjabi",
      location: "Ludhiana",
      img: "https://b.zmtcdn.com/data/pictures/0/20889090/5aec8f25cd3e9e026a3bb63034dcee06.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
    },
    {
      name: "Taste of Gujarat",
      cuisine: "Gujarati Thali",
      location: "Ahmedabad",
      img: "https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2024/9/27/a8b8a1c0-c8b1-48e3-b728-d9cf4dad8a7e_image1f1401f0857f541e5b2b5194124babe0a.JPG",
    },
    {
      name: "Coastal Catch",
      cuisine: "Seafood",
      location: "Mangalore",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/30/54/b2/bidri-ambience.jpg?w=800&h=800&s=1",
    },
    {
      name: "Delhi Zaika",
      cuisine: "North Indian",
      location: "New Delhi",
      img: "https://media.indiabizforsale.com/images/sell/8922/screenshot_20200927_162345_gallery_76b69a0f7454c951fa79c2ce24cede2c_26e1a03c331e3379c86d8fa70e30c450.webp",
    },
    {
      name: "Mumbai Tadka",
      cuisine: "Street Food",
      location: "Mumbai",
      img: "https://images.unsplash.com/photo-1659264056544-56843941c189?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3VqYXJhdGklMjBmb29kJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    },
    {
      name: "Bengal Flavors",
      cuisine: "Bengali",
      location: "Kolkata",
      img: "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/central%20marketing%20team/for%20the%20ride/experiences/fve%20update/cafe/fve-cafe-promo-955x537.jpg",
    },
    {
      name: "Goan Treat",
      cuisine: "Goan",
      location: "Goa",
      img: "https://images.unsplash.com/photo-1705414742597-287b28e75737?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMHJlc3RhdXJhbnQlMjBzaG9wfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    },
    {
      name: "Rajasthan Royal",
      cuisine: "Rajasthani",
      location: "Jaipur",
      img: "https://chokhidhani.com/wp-content/uploads/2024/08/Chokhi-Dhani-Village-min-2048x1363.jpg",
    },
    {
      name: "South Spice Hub",
      cuisine: "Kerala / Andhra",
      location: "Kochi",
      img: "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/indianstartupnews/media/media_files/hjQUMh45PmiTYq7e7rsN.png",
    },
  ];

  return (
    <div
      className="py-5"
      style={{
        backgroundImage:
         "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1508773431049-22bb79aa660c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdHVhcmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600')",


        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h2 className="text-center fw-bold text-danger mb-5">
          🍽 Choose Your Favourite Restaurant
        </h2>

        <div className="row">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div
                className="card shadow-sm border-0 rounded-4 h-100"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={restaurant.img}
                  alt={restaurant.name}
                  className="card-img-top rounded-top-4"
                  style={{
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-bold text-danger mb-1">
                    {restaurant.name}
                  </h6>
                  <p className="text-muted small mb-1">{restaurant.cuisine}</p>
                  <p className="text-secondary small mb-2">
                    📍 {restaurant.location}
                  </p>
                  <button
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={() => navigate("/menu", { state: { restaurant } })}
                  >
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate("/")}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
