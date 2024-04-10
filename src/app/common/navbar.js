import goToDashboard from "../ui/home/dashboard/dashboard.js";
import goToVendor from "../ui/home/vendors/vendors.js";

dashboardRoute.addEventListener("click", (e) => {
  goToDashboard();
});

vendorRoute.addEventListener("click", (e) => {
  goToVendor();
});
