// import React from "react"; //, { useState }
// // import Navbar from "./Navbar";
// // import "../src/App.css";

// function About() {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <div
//         className="w3-container"
//         style={{ padding: "128px 16px" }}
//         id="about"
//       >
//         <h3 className="w3-center">ABOUT THE COMPANY</h3>
//         <p className="w3-center w3-large">Key features of our company</p>
//         <div className="w3-row-padding w3-center mt-4">
//           <div className="w3-quarter">
//             <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
//             <p className="w3-large">Responsive</p>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore.
//             </p>
//           </div>
//           <div className="w3-quarter">
//             <i className="fa fa-heart w3-margin-bottom w3-jumbo"></i>
//             <p className="w3-large">Passion</p>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore.
//             </p>
//           </div>
//           <div className="w3-quarter">
//             <i className="fa fa-diamond w3-margin-bottom w3-jumbo"></i>
//             <p className="w3-large">Design</p>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore.
//             </p>
//           </div>
//           <div className="w3-quarter">
//             <i className="fa fa-cog w3-margin-bottom w3-jumbo"></i>
//             <p className="w3-large">Support</p>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default About;


import React from "react";
import congradtestImage from './assets/image/congradtest.jpg';
import './About.css';

const About = () => {
  return (
    <div>
    <h3 className="am">About Me</h3>
    <div className="about-container">
      <div className="profile-card">
        <div className="profile-image">
          <img
            src={congradtestImage}
            alt="Profile"
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">Puttachai Bodkhuntod</h2>
          <p className="profile-location">Bangkok , ThaiLand</p>
          <p className="profile-job">
          Web developer - Web Specialist<br /> Rattana Bundit University - Bangkok
          </p>
        </div>
        {/* <div className="profile-stats">
          <div>
            <p className="stat-number">65</p>
            <p className="stat-label">Friends</p>
          </div>
          <div>
            <p className="stat-number">43</p>
            <p className="stat-label">Photos</p>
          </div>
          <div>
            <p className="stat-number">21</p>
            <p className="stat-label">Comments</p>
          </div>
        </div> */}
        <button className="profile-button">Show more</button>
      </div>
    </div>
    </div>
  );
};

export default About;
