// Assign New Request To Variable
let newRequest = new XMLHttpRequest();
// Check Ready State Change
newRequest.onreadystatechange = function () {
  let rewards = "";
  let rewardsCount = 0;
  let tempData = "";
  // Check For Status Code And Ready State Code
  if (this.readyState === 4 && this.status === 200) {
    // Parsing Response To JS Object
    rewards = JSON.parse(this.responseText);
    // Get Rewards Number
    rewardsCount = rewards.length;
  }

  // Put Data In View
  document.querySelector(".results .summary .number").innerText = `${rewardsCount} Results`;
  for (reward of rewards) {
    let header = `<div class="result-card" onClick="changeMap('${reward.location}')">`;
    tempData += `${header}
                    <div class="d-flex align-items-center">
                      <!-- Image -->
                      <div class="image">
                        <img class="img-fluid" src="${reward.image}" alt="Result Image">
                      </div>
                      <!-- Text -->
                      <div class="text">
                        <span class="company">
                          ${reward.company} ${reward.badge && `<span class="result-badge">${reward.badge}</span>`}
                        </span>
                        <span class="title">${reward.title}</span>
                        <span class="location">${reward.location}</span>
                      </div>
                    </div>
                  </div>`;
  }
  document.querySelector(".result-cards").innerHTML = tempData;
};

// Request The JSON File
newRequest.open("GET", "../data/rewards.json", true);
// Send Request
newRequest.send();


// Change Map Method
const changeMap = (location) => {
  // Convert Location To Be Suitable For URL
  location = location.replaceAll(" ", "%20");
  // Change Iframe Src
  $(".map-sample iframe").attr("src", `https://maps.google.com/maps?q=${location}&t=&z=15&ie=UTF8&iwloc=&output=embed`);
};
