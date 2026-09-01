// ================================
// API DATA
// ================================

const defaultDashboardData = {
  solarGenerated: 24.8,
  energyConsumed: 19.2,
  energyStored: 12.6,
  co2Reduced: 18.7,
  waterSaved: 320,
  sustainabilityScore: 87
};

let dashboardData = { ...defaultDashboardData };

async function fetchGreenlinkData() {
  try {
    const response = await fetch("api/greenlink-data.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to fetch data");

    const payload = await response.json();
    if (payload && payload.dashboard) {
      dashboardData = { ...defaultDashboardData, ...payload.dashboard };
    }
  } catch (error) {
    dashboardData = { ...defaultDashboardData };
    console.warn("Falling back to default GreenLink dashboard data.", error);
  }

  updateDashboardValues();
}

function updateDashboardValues() {
  const solarGeneratedEl = document.getElementById("solarGenerated");
  const energyConsumedEl = document.getElementById("energyConsumed");
  const energyStoredEl = document.getElementById("energyStored");
  const co2ReducedEl = document.getElementById("co2Reduced");
  const waterSavedEl = document.getElementById("waterSaved");
  const sustainabilityScoreEl = document.getElementById("score");

  if (solarGeneratedEl && energyConsumedEl) {
    solarGeneratedEl.textContent = `${dashboardData.solarGenerated} kWh`;
    energyConsumedEl.textContent = `${dashboardData.energyConsumed} kWh`;
  }

  if (energyStoredEl) {
    energyStoredEl.textContent = `${dashboardData.energyStored} kWh`;
  }

  if (co2ReducedEl) {
    co2ReducedEl.textContent = `${dashboardData.co2Reduced} kg`;
  }

  if (waterSavedEl) {
    waterSavedEl.textContent = `${dashboardData.waterSaved} L`;
  }

  if (sustainabilityScoreEl) {
    sustainabilityScoreEl.textContent = dashboardData.sustainabilityScore;
  }
}


// ================================
// SIMULATE LIVE DATA
// ================================

function simulateLiveData() {
  const solarGeneratedEl = document.getElementById("solarGenerated");
  const energyConsumedEl = document.getElementById("energyConsumed");

  if (!solarGeneratedEl || !energyConsumedEl) return;

  dashboardData.solarGenerated += Math.random() * 0.4 - 0.1;
  dashboardData.energyConsumed += Math.random() * 0.3 - 0.15;
  dashboardData.solarGenerated = Math.max(0, dashboardData.solarGenerated);
  dashboardData.energyConsumed = Math.max(0, dashboardData.energyConsumed);

  solarGeneratedEl.textContent = `${dashboardData.solarGenerated.toFixed(1)} kWh`;
  energyConsumedEl.textContent = `${dashboardData.energyConsumed.toFixed(1)} kWh`;
}

if (document.getElementById("solarGenerated") && document.getElementById("energyConsumed")) {
  fetchGreenlinkData();
  setInterval(simulateLiveData, 5000);
}


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
  item.addEventListener("click", function () {
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
// FLOATING IDEAS BUTTON
// ================================

const floatingIdeasButton = document.querySelector(".floating-ideas-button");

if (!floatingIdeasButton) {
  const ideasButton = document.createElement("a");
  ideasButton.href = "ideas.html";
  ideasButton.className = "floating-ideas-button";
  ideasButton.setAttribute("aria-label", "Ideas & Innovation");
  ideasButton.innerHTML = '<i class="fa-solid fa-lightbulb"></i>';
  document.body.appendChild(ideasButton);
}


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