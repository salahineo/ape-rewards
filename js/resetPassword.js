// Import API Constants
const baseAPIURL = "https://api.aperewards.club";
const baseAPIRoute = "api";
const baseAPIExternal = "https://api.aperewards.club/api/external";
// Submit Form
const submitForm = document.getElementById("submit-form");
// Alert Container
const alertContainer = document.querySelector(".alert-container");

// Check If There Is A Token Parameter
if (window.location.search.substr(1).split("=")[0] === "token" && window.location.search.substr(1).split("=")[1].length > 0) {
  // Check Token
  $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/${jwt_decode(window.location.search.substr(1).split("=")[1]).userId}/resetpassword/${window.location.search.substr(1).split("=")[1]}/validation`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    success: function (data) {
      if (data.tokenValid !== true) {
        // Redirect To Success Page
        window.location.href = location.protocol + "//" + location.hostname + "/resetPassword-error.html";
      } else {
        $(".loading-container").fadeOut();
      }
    },
    error: function (err) {
      // Redirect To Fail Page
      window.location.href = location.protocol + "//" + location.hostname + "/resetPassword-error.html";
    }
  });
  const resetPassword = async (password) => {
    // Check In Background
    $.ajax({
      url: `${baseAPIURL}/${baseAPIRoute}/user/${jwt_decode(window.location.search.substr(1).split("=")[1]).userId}/resetpassword/${window.location.search.substr(1).split("=")[1]}`,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      dataType: "json",
      data: JSON.stringify({user: {password: password}}),
      success: function (data) {
        if (data.reset === "success") {
          // Redirect To Success Page
          window.location.href = location.protocol + "//" + location.hostname + "/resetPassword-success.html";
        } else {
          // Redirect To Fail Page
          window.location.href = location.protocol + "//" + location.hostname + "/resetPassword-success.html";
        }
      },
      error: function () {
        // Redirect To Fail Page
        window.location.href = location.protocol + "//" + location.hostname + "/resetPassword-error.html";
      }
    });
  };


  // Set Loading State
  const loading = (state) => {
    if (state) {
      // Set Loading State
      submitForm.submit.classList.add("loading");
      submitForm.submit.setAttribute("disabled", "true");
    } else {
      // Remove Loading State
      submitForm.submit.classList.remove("loading");
      submitForm.submit.removeAttribute("disabled");
    }
  };

  // Check Empty Values Method
  const empty = (val) => {
    // Check Input Value Length
    return val.length === 0;
  };

  // Set New Alert
  const setAlert = (color, state, message) => {
    // Append Alert
    alertContainer.innerHTML =
      `<div class="alert alert-${color} alert-dismissible fade show">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">
        &times;
      </a>
      <strong>${state}!</strong> ${message}
    </div>`;
  };

  // Delete Alert Method
  const clearAlert = () => {
    // Empty Container
    alertContainer.innerHTML = "";
  };

  // Validate Log In Form Method
  const validateInputForm = (e) => {
    // Set Loading State
    loading(true);

    // Stop Submitting Form
    e.preventDefault();

    // Check Empty Inputs
    if (empty(submitForm.password.value) || empty(submitForm.confirmPassword.value)) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", "All Fields Are Required");
    } else if (submitForm.password.value !== submitForm.confirmPassword.value) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", "Passwords not matching");
    } else {
      // Clear Alert Container
      clearAlert();
      // Set Loading State
      loading(false);
      // Reset Password Method
      resetPassword(submitForm.password.value);
    }
  };

  // Check Form On Submit
  submitForm.addEventListener("submit", validateInputForm);
} else {
  // Redirect To Home Page
  window.location.href = location.protocol + "//" + location.hostname;
}
