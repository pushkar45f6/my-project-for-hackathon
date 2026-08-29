// ================================
// DUMMY DATA
// ================================

const dashboardData = {
  solarGenerated: 24.8,
  energyConsumed: 19.2,
  energyStored: 12.6,
  co2Reduced: 18.7,
  waterSaved: 320,
  sustainabilityScore: 87
};


// ================================
// UPDATE DASHBOARD
// ================================

document.getElementById("solarGenerated").textContent =
  `${dashboardData.solarGenerated} kWh`;

document.getElementById("energyConsumed").textContent =
  `${dashboardData.energyConsumed} kWh`;

document.getElementById("energyStored").textContent =
  `${dashboardData.energyStored} kWh`;

document.getElementById("co2Reduced").textContent =
  `${dashboardData.co2Reduced} kg`;

document.getElementById("waterSaved").textContent =
  `${dashboardData.waterSaved} L`;

document.getElementById("score").textContent =
  dashboardData.sustainabilityScore;


// ================================
// SIMULATE LIVE DATA
// ================================

function simulateLiveData() {
  dashboardData.solarGenerated +=
    Math.random() * 0.4 - 0.1;

  dashboardData.energyConsumed +=
    Math.random() * 0.3 - 0.15;

  dashboardData.solarGenerated =
    Math.max(0, dashboardData.solarGenerated);

  dashboardData.energyConsumed =
    Math.max(0, dashboardData.energyConsumed);

  document.getElementById("solarGenerated").textContent =
    `${dashboardData.solarGenerated.toFixed(1)} kWh`;

  document.getElementById("energyConsumed").textContent =
    `${dashboardData.energyConsumed.toFixed(1)} kWh`;
}

setInterval(simulateLiveData, 5000);


// ================================
// MOBILE SIDEBAR
// ================================

const sidebar =
  document.querySelector(".sidebar");

const openSidebar =
  document.getElementById("openSidebar");

const closeSidebar =
  document.getElementById("closeSidebar");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");


function openMobileSidebar() {
  sidebar.classList.add("sidebar-open");
  sidebarOverlay.classList.add("overlay-open");
}


function closeMobileSidebar() {
  sidebar.classList.remove("sidebar-open");
  sidebarOverlay.classList.remove("overlay-open");
}


if (openSidebar) {
  openSidebar.addEventListener(
    "click",
    openMobileSidebar
  );
}


if (closeSidebar) {
  closeSidebar.addEventListener(
    "click",
    closeMobileSidebar
  );
}


if (sidebarOverlay) {
  sidebarOverlay.addEventListener(
    "click",
    closeMobileSidebar
  );
}


// ================================
// NAVIGATION INTERACTION
// ================================

const navItems =
  document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", function (event) {
    event.preventDefault();

    navItems.forEach(nav => {
      nav.classList.remove("active");
    });

    this.classList.add("active");

    if (window.innerWidth <= 700) {
      closeMobileSidebar();
    }
  });
});


// ================================
// SEARCH FUNCTION
// ================================

const searchInput =
  document.querySelector(".search-box input");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    console.log(
      "Searching for:",
      value
    );
  });
}


// ================================
// RECOMMENDATION BUTTON
// ================================

const recommendationButton =
  document.getElementById("recommendationButton");

if (recommendationButton) {
  recommendationButton.addEventListener(
    "click",
    function () {
      alert(
        "Smart Recommendation:\n\n" +
        "Solar generation is currently high.\n\n" +
        "• Run high-power appliances\n" +
        "• Charge battery storage\n" +
        "• Reduce grid dependency"
      );
    }
  );
}


// ================================
// REPORT BUTTON
// ================================

const reportButton =
  document.getElementById("reportButton");

if (reportButton) {
  reportButton.addEventListener(
    "click",
    function () {
      alert(
        "Full sustainability report will open here!"
      );
    }
  );
}


// ================================
// ESC KEY SUPPORT
// ================================

document.addEventListener(
  "keydown",
  function (event) {
    if (
      event.key === "Escape" &&
      window.innerWidth <= 700
    ) {
      closeMobileSidebar();
    }
  }
);