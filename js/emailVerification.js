// Confirm Email Method
const confirmEmail = async () => {
  // Set Loading State
  $(".page_content").html(`<div class="loading-container">
      <div class="loader">
        <div class="loader-wheel"></div>
      </div>
    </div>`);
  // Reset Password
  await $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/${jwt_decode(window.location.search.substr(1).split("=")[1]).userId}/emailverification`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    success: function () {
      $(".page_content").html(`<section class="pricing state success">
    <div class="container">
      <div class="row pricing-tables">
        <div class="plan state success plan-team">
          <div class="state success">
              <span>
                <i class="fas fa-check"></i>
              </span>
          </div>
          <div class="category">
            <h3>Email sent</h3>
            <p>Email sent with new token, Please check your email.</p>
          </div>
          <a href="/">
            <button class="button-primary button-large w-100 state">Home</button>
          </a>
        </div>
      </div>
    </div>
  </section>`);
    },
    error: function (err) {
      $(".page_content").html(`<section class="pricing state cancel">
    <div class="container">
      <div class="row pricing-tables">
        <div class="plan state cancel plan-team">
          <div class="state cancel">
              <span>
                <i class="fas fa-times"></i>
              </span>
          </div>
          <div class="category">
            <h3>Email not sent</h3>
            <p>Error: ${err.responseJSON.error}</p>
          </div>
          <a class="list-link" href="mailto:support@aperewards.club">Contact Support</a>
        </div>
      </div>
    </div>
  </section>`);
    }
  });
};

// Check If There Is A Token Parameter
if (window.location.search.substr(1).split("=")[0] === "token" && window.location.search.substr(1).split("=")[1].length > 0) {
  // Check In Background
  $.ajax({
    url: `${baseAPIURL}/${baseAPIRoute}/user/${jwt_decode(window.location.search.substr(1).split("=")[1]).userId}/emailverification/${window.location.search.substr(1).split("=")[1]}`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    success: function (data) {
      if (data.emailConfirmation === "success") {
        $(".page_content").html(`<section class="pricing state success">
    <div class="container">
      <div class="row pricing-tables">
        <div class="plan state success plan-team">
          <div class="state success">
              <span>
                <i class="fas fa-check"></i>
              </span>
          </div>
          <div class="category">
            <h3>Email verified</h3>
            <p>Thank you for verifying your email.</p>
          </div>
          <a href="/">
            <button class="button-primary button-large w-100 state">Continue</button>
          </a>
        </div>
      </div>
    </div>
  </section>`);
      } else {
        $(".page_content").html(`  <section class="pricing state cancel">
    <div class="container">
      <div class="row pricing-tables">
        <div class="plan state cancel plan-team">
          <div class="state cancel">
              <span>
                <i class="fas fa-times"></i>
              </span>
          </div>
          <div class="category">
            <h3>Email not verified</h3>
            <p>Unfortunately, your email not verified. Please try again.</p>
          </div>
          <a href="javascript:void(0);" onclick="confirmEmail()">
            <button class="button-primary button-large w-100 state">Try again</button>
          </a>
        </div>
      </div>
    </div>
  </section>`);
      }
    },
    error: function () {
      $(".page_content").html(`  <section class="pricing state cancel">
    <div class="container">
      <div class="row pricing-tables">
        <div class="plan state cancel plan-team">
          <div class="state cancel">
              <span>
                <i class="fas fa-times"></i>
              </span>
          </div>
          <div class="category">
            <h3>Email not verified</h3>
            <p>Unfortunately, your email not verified. Please try again.</p>
          </div>
          <a href="javascript:void(0);" onclick="confirmEmail()">
            <button class="button-primary button-large w-100 state">Try again</button>
          </a>
        </div>
      </div>
    </div>
  </section>`);
    }
  });
} else {
  // Redirect To Home Page
  window.location.href = location.protocol + "//" + location.hostname;
}
