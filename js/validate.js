/* Check Account State */

// Check If User Logged In
if (localStorage.getItem("UserToken") !== null) {
  // Redirect To Home Page
  window.location.href = location.protocol + "//" + location.hostname;
}

// Import API Constants
const baseAPIURL = "https://api.aperewards.club";
const baseAPIRoute = "api";
const baseAPIExternal = "https://api.aperewards.club/api/external";

// Submit Form
const submitForm = document.getElementById("submit-form");

/* Alert Method */

// Alert Container
const alertContainer = document.querySelector(".alert-container");

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


/* Form Helpers Methods */

// Check Empty Values Method
const empty = (val) => {
  // Check Input Value Length
  return val.length === 0;
};

// Check Valid Email Method
const isEmail = (val) => {
  // Regular Expression Constant
  const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Return True Or False According To Email Value
  return exp.test(String(val).toLowerCase());
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

/* User Account Methods */

// Get ID From Email
const preConfirmEmail = async (email) => {
  // Get User ID By Email
  await $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/email/${email}`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "GET",
    dataType: "json",
    success: async function (data) {
      // Send Email Confirmation
      await confirmEmail(data._id);
    },
    error: function (err) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", err.responseJSON.error);
      // Clear Console
      console.clear();
    }
  });
};

// Confirm Email Method
const confirmEmail = async (id) => {
  // Reset Password2
  await $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/${id}/emailverification`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    error: function (err) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", err.responseJSON.error);
      // Clear Console
      console.clear();
    }
  });
};

// Create Customer Method
const createCustomer = async (user) => {
  // Create Customer
  await $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/customer`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    data: JSON.stringify(user),
    error: function (err) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", err.responseJSON.error);
      // Clear Console
      console.clear();
    }
  });
};

// Login Method
const loginMethod = async (user) => {
  // Login User
  await $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/login`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    data: JSON.stringify(user),
    success: async function (data) {
      console.log(data);
      // Save User Access Token To LocalStorage
      await localStorage.setItem("UserToken", data.LoginAccessToken);

      // Redirect To Home Page
      window.location.href = location.protocol + "//" + location.hostname;
    },
    error: function (err) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", err.responseJSON.error);
      // Clear Console
      console.clear();
    }
  });
};

// Signup Method
const signupMethod = async (user) => {
  // Signup User
  await $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    data: JSON.stringify(user),
    success: async function (data) {
      // Create Customer
      const customerBody = {userId: data._id};
      await createCustomer(customerBody);
      // Send Email Confirmation Email
      await preConfirmEmail(user.user.email);
      // Login User
      const loginBody = {email: user.user.email, password: user.user.password};
      await loginMethod(loginBody);
    },
    error: function (err) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", err.responseJSON.error);
      // Clear Console
      console.clear();
    }
  });
};

// Reset Password Request Method
const resetPassword = async (id) => {
  // Reset Password
  await $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/${id}/resetpassword`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    success: function (data) {
      // Check If Email Sent
      if (data.emailSent) {
        // Success Alert
        setAlert("success", "Success", "Reset password link was sent to your email");
      } else {
        // Trigger Error Alert
        setAlert("danger", "Error", data.error);
      }
    },
    error: function (err) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", err.responseJSON.error);
      // Clear Console
      console.clear();
    }
  });
};

// Forget Password Method
const forgetPassword = async (email) => {
  // Get User ID By Email
  await $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/email/${email}`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "GET",
    dataType: "json",
    success: async function (data) {
      // Check If User Exists
      if (data === null) {
        // No User Exists With This Email Alert
        setAlert("warning", "Warning", "This email is not registered");
      } else {
        // Send Reset Email For User
        await resetPassword(data._id);
      }
    },
    error: function (err) {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", err.responseJSON.error);
      // Clear Console
      console.clear();
    }
  });
};


/* Validate Forms & Handle Submit */

// Validate Log In Form Method
const validateInputForm = (e) => {
  // Set Loading State
  loading(true);

  // Stop Submitting Form
  e.preventDefault();

  // Check Empty Inputs
  if (empty(submitForm.email.value) || (submitForm.password !== undefined && empty(submitForm.password.value))) {
    // Set Loading State
    loading(false);
    // Trigger Error Alert
    setAlert("danger", "Error", "All Fields Are Required");
  } else if (!isEmail(submitForm.email.value)) {
    // Set Loading State
    loading(false);
    // Trigger Error Alert
    setAlert("danger", "Error", "Email Not Valid");
  } else {
    // Clear Alert Container
    clearAlert();

    // Check Form Type To Indicate Route
    const formType = submitForm.getAttribute("data-form");

    // Signup Form
    if (formType === "signup") {
      // Prepare User Object
      const newUserData = {
        user: {
          firstName: submitForm.name.value.split(" ")[0],
          lastName: submitForm.name.value.split(" ", 2)[1] === undefined ? " " : submitForm.name.value.split(" ", 2)[1],
          email: submitForm.email.value,
          password: submitForm.password.value
        }
      };
      // Signup User
      signupMethod(newUserData);
    }
    // Login Form
    else if (formType === "login") {
      // Prepare User Object
      const userData = {
        email: submitForm.email.value,
        password: submitForm.password.value
      };
      // Login User
      loginMethod(userData);
    }
    // Forget Password Form
    else if (formType === "forgotPassword") {
      // Set Loading State
      loading(false);
      // Forget Password Method
      forgetPassword(submitForm.email.value);
    }
    // Manipulated Form Type
    else {
      // Set Loading State
      loading(false);
      // Trigger Error Alert
      setAlert("danger", "Error", "Please Don't Do Anything Illegal");
    }
  }
};

// Check Form On Submit
submitForm.addEventListener("submit", validateInputForm);
