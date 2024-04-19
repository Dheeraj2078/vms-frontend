import goToDashboard from "../ui/home/dashboard/dashboard.js";
import goToVendor from "../ui/home/vendors/vendors.js";
import goToAdmin from "../ui/home/admin/admin.js";
import { getCurrentUserInfo, validateToken } from "../util/util.js";
import { role } from "../util/constants.js";

const defaultRoute = () => {
  const allRoutesLi = document.querySelectorAll("li");
  const allRoutes = [...allRoutesLi];
  allRoutes.map((route) => {
    if (route.classList.contains("selected-route")) {
      const Id = route.id;
      if (Id == "dashboardRoute") {
        goToDashboard();
      } else if (Id == "vendorRoute") {
        goToVendor();
      } else if (Id == "adminRoute") {
        goToAdmin();
      }
    }
  });
};

(() => {
  if (validateToken() == false) {
    window.location.href = "/";
  }

  const info = getCurrentUserInfo();
  if (info.role == role.admin) {
    adminRoute.classList.add("hidden");
    dashboardRoute.classList.add("selected-route");
  } else {
    adminRoute.classList.add("selected-route");
  }

  defaultRoute();
})();

const changeRoute = (newRoute) => {
  const allRoutesLi = document.querySelectorAll("li");
  const allRoutes = [...allRoutesLi];
  allRoutes.map((route) => {
    if (route.classList.contains("selected-route")) {
      route.classList.remove("selected-route");
    }
  });

  const currentRoute = document.getElementById(newRoute);
  currentRoute.classList.add("selected-route");
};

const isBackgroundDisabled = () => {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer.classList.contains("blur-background")) {
    return true;
  }
  return false;
};

dashboardRoute.addEventListener("click", (e) => {
  if (isBackgroundDisabled()) {
    return;
  }
  changeRoute("dashboardRoute");
  goToDashboard();
});

vendorRoute.addEventListener("click", (e) => {
  if (isBackgroundDisabled()) {
    return;
  }
  changeRoute("vendorRoute");
  goToVendor();
});

adminRoute.addEventListener("click", (e) => {
  if (isBackgroundDisabled()) {
    return;
  }
  changeRoute("adminRoute");
  goToAdmin();
});