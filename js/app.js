// Import API Constants
const baseAPIURL = "https://api.aperewards.club";
const baseAPIRoute = "api";
const baseAPIExternal = "https://api.aperewards.club/api/external";

/* Handle Account State */

// Check If User Logged In
if (localStorage.getItem("UserToken") !== null) {
  // User Name Var
  let username = "";
  // Get User Name
  $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/${jwt_decode(localStorage.getItem("UserToken")).id}`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Set UserName
      username = data.firstName + " " + data.lastName;
      // Set Logged Navbar Dropdown
      const loggedNav = `
        <li class="nav-item dropdown user">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false">
            ${username}
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="javascript:void(0);" onclick="subscriptionsRedirect()">
              <i class="fas fa-dollar-sign"></i>
              Subscriptions
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="javascript:void(0);" id="logout" onclick="logout()">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </a>
          </div>
        </li>`;
      // Append Nav
      $("nav .right-content ul, .small-screens-navbar ul").append(loggedNav);
    }
  });
  // Get User Name
  $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/${jwt_decode(localStorage.getItem("UserToken")).id}`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "GET",
    dataType: "json",
    success: function (data) {
      if (data.emailVerification === false) {
        // Set Logged Navbar Dropdown
        const confirmEmailAlert = `
          <div class="container">
            <div class="alert alert-warning alert-dismissible fade show mt-2">
              <a href="#" class="close" data-dismiss="alert" aria-label="close">
                &times;
              </a>
              <strong>Warning!</strong> Your email is not confirmed yet, please check you inbox
            </div>
          </div> 
        `;
        // Append Alert
        $("body").prepend(confirmEmailAlert);
      }
    }
  });
} else {
  // Set Not Logged Navbar Links
  const notLoggedNav = `
  <li class="nav-item">
    <a class="nav-link" href="javascript:void(0);" data-tf-popup="EHsfW6FB">Contact Sales</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="login.html">Log in</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="signup.html">
      <button class="button-secondary-light button-small">Sign Up</button>
    </a>
  </li>`;
  // Append Nav
  $("nav .right-content ul, .small-screens-navbar ul").append(notLoggedNav);
}

// Redirect Method
const subscriptionsRedirect = () => {
  // Redirect To Subscriptions
  window.location.href = baseAPIExternal + "/customer-portal/" + jwt_decode(localStorage.getItem("UserToken")).id;
};


// Logout User
const logout = () => {
  // Remove LocalStorage User Data
  localStorage.removeItem("UserToken");
  // Redirect To Home Page
  window.location.href = location.protocol + "//" + location.hostname;
};


/* Main Functionalities */

// NavIcon
$(".navbar-toggler").on("click", () => {
  $("body").toggleClass("modal-open");
  $(".small-screens-navbar").css({
    right: 0
  });
});

$(".close-small-screens-navbar, .small-screens-navbar .nav-link:not(#navbarDropdownMobile)").on("click", () => {
  $("body").toggleClass("modal-open");
  $(".small-screens-navbar").css({
    right: "-100%"
  });
});
