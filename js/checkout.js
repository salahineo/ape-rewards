// Start Checkout Process
const startCheckout = async () => {
  // Check If User Logged In
  if (localStorage.getItem("UserToken") !== null) {
    // Get User ID
    const userID = jwt_decode(localStorage.getItem("UserToken")).id;
    const basicPlanID = "615324c33ab90500129f4aa9"; // Static ID
    // Redirect To Payment Page
    window.location.href = `${baseAPIExternal}/checkout/${userID}/${basicPlanID}`;
  } else {
    // Redirect To Login Page
    window.location.href = location.protocol + "//" + location.hostname + "/signup.html";
  }
};


// Start Premium Checkout Process
const startCheckoutPremium = async () => {
  // Check If User Logged In
  if (localStorage.getItem("UserToken") !== null) {
    // Get User ID
    const userID = jwt_decode(localStorage.getItem("UserToken")).id;
    const premiumPlanID = "613b9efa5c423c147cc9b08b"; // Static ID
    // Redirect To Payment Page
    window.location.href = `${baseAPIExternal}/checkout/${userID}/${premiumPlanID}`;
  } else {
    // Redirect To Login Page
    window.location.href = location.protocol + "//" + location.hostname + "/signup.html";
  }
};
