import goToDashboard from "../ui/home/dashboard/dashboard.js";
import goToVendor from "../ui/home/vendors/vendors.js";

const changeRoute = (newRoute) => {
  const allRoutesA = document.querySelectorAll("li");
  console.log(allRoutesA);
  const allRoutes = [...allRoutesA];
  allRoutes.map((route) => {
    if (route.classList.contains("selected-route")) {
      route.classList.remove("selected-route");
    }
  });

  const currentRoute = document.getElementById(newRoute);
  currentRoute.classList.add("selected-route");
};

dashboardRoute.addEventListener("click", (e) => {
  changeRoute("dashboardRoute");
  goToDashboard();
});

vendorRoute.addEventListener("click", (e) => {
  changeRoute("vendorRoute");
  goToVendor();
});
