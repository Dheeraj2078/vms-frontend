import goToDashboard from "../ui/home/dashboard/dashboard.js";
import goToVendor from "../ui/home/vendors/vendors.js";
import goToAdmin from "../ui/home/admin/admin.js";
import goToCategory from "../ui/home/categories/categories.js";
import goToInvoice from "../ui/home/invoice/invoice.js";
import goToPurchaseOrder from "../ui/home/purchaseOrder/purchaseOrder.js";
import { getCurrentUserInfo, validateToken } from "../util/util.js";
import { role } from "../util/constants.js";
import goToContract from "../ui/home/contract/contract.js";
import {
  confirmationModal,
  confirmationModalWithoutApi,
} from "./components/confirmationModal.js";
import navBarHtml from "./components/../../common/navbar.html";

export const defaultRoute = () => {
  console.log("default");
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
        goToCategory(0, 10, true);
      } else if (Id == "invoiceRoute") {
        goToInvoice();
      } else if (Id == "contractRoute") {
        goToContract();
      } else if (Id == "purchaseOrderRoute") {
        goToPurchaseOrder();
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
  }

  let currentRoute = sessionStorage.getItem("tab");
  if (currentRoute == null) {
    const info = getCurrentUserInfo();
    if (info.role == role.admin) {
      // adminRoute.classList.add("hidden");
      dashboardRoute.classList.add("selected-route");
    } else {
      adminRoute.classList.add("selected-route");
    }
  } else {
    if (currentRoute == "dashboard") {
      dashboardRoute.classList.add("selected-route");
    } else if (currentRoute == "admin") {
      adminRoute.classList.add("selected-route");
    } else if (currentRoute == "vendor") {
      vendorRoute.classList.add("selected-route");
    } else if (currentRoute == "category") {
      categoryRoute.classList.add("selected-route");
    } else if (currentRoute == "invoice") {
      invoiceRoute.classList.add("selected-route");
    } else if (currentRoute == "contract") {
      contractRoute.classList.add("selected-route");
    } else if (currentRoute == "purchaseOrder") {
      purchaseOrderRoute.classList.add("selected-route");
    }
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
  goToCategory(0, 10, true);
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

purchaseOrderRoute.addEventListener("click", (e) => {
  if (isBackgroundDisabled()) {
    return;
  }
  changeRoute("purchaseOrderRoute");
  goToPurchaseOrder();
});

const logoutBtn = document.getElementById("logout-btn");
console.log("LOG", logoutBtn);
logoutBtn.addEventListener("click", (e) => {
  const logOutAction = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const message = "Are you sure you want to sign out from this admin tool?";
  confirmationModalWithoutApi(message, logOutAction);
});
