import goToDashboard from "../ui/home/dashboard/dashboard.js";
import goToVendor from "../ui/home/vendors/vendors.js";
import goToAdmin from "../ui/home/admin/admin.js";
import goToCategory from "../ui/home/categories/categories.js";
import goToInvoice from "../ui/home/invoice/invoice.js";
import { getCurrentUserInfo, validateToken } from "../util/util.js";
import { role } from "../util/constants.js";
import goToContract from "../ui/home/contract/contract.js";
import {
  confirmationModal,
  confirmationModalWithoutApi,
} from "./components/confirmationModal.js";
import navBarHtml from "./components/../../common/navbar.html";

const defaultRoute = () => {
  const allRoutesLi = document.querySelectorAll("li");
  const allRoutes = [...allRoutesLi];
  console.log(allRoutes);
  allRoutes.map((route) => {
    if (route.classList.contains("selected-route")) {
      const Id = route.id;
      console.log("Id", Id);
      if (Id == "dashboardRoute") {
        goToDashboard();
      } else if (Id == "vendorRoute") {
        goToVendor();
      } else if (Id == "adminRoute") {
        goToAdmin();
      } else if (Id == "categoryRoute") {
        goToCategory();
      } else if (Id == "invoiceRoute") {
        goToInvoice();
      } else if (Id == "contractRoute") {
        goToContract();
      }
    }
  });
};

(() => {
  if (validateToken() == false) {
    window.location.href = "/";
  }

  const nav = document.createElement("aside");
  nav.classList.add("navbar-wrapper");
  nav.innerHTML = navBarHtml;
  const firstChild = document.getElementById("home-root");
  firstChild.appendChild(nav);

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
  const mainContainer = document.getElementsByClassName("main-container")[0];
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

categoryRoute.addEventListener("click", (e) => {
  if (isBackgroundDisabled()) {
    return;
  }
  changeRoute("categoryRoute");
  goToCategory();
});

invoiceRoute.addEventListener("click", (e) => {
  if (isBackgroundDisabled()) {
    return;
  }
  changeRoute("invoiceRoute");
  goToInvoice();
});

contractRoute.addEventListener("click", (e) => {
  if (isBackgroundDisabled()) {
    return;
  }
  changeRoute("contractRoute");
  goToContract();
});

const logoutBtn = document.getElementById("logout-btn");
console.log("LOG", logoutBtn);
logoutBtn.addEventListener("click", (e) => {
  const logOutAction = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // const message = "Are you sure you want to sign out from this admin tool?";

  // const res = JSON.parse(localStorage.getItem("current_route"));
  // console.log(res);

  // var compressedFunc = localStorage.getItem("compressedFunc");

  // // Convert the String back to a function
  // var myFunc = eval("(" + compressedFunc + ")");
  // console.log("FF", myFunc);

  // confirmationModalWithoutApi(message, logOutAction, myFunc);
  logOutAction();
});
