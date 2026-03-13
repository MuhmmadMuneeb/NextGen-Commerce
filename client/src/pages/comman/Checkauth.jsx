// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, user, children }) {
//     const location = useLocation()

//     if (location.pathname === '/') {
//         if (!isAuthenticated) {
//             return <Navigate to={'/auth/login'} />
//         }
//     } else {
//         if (user?.role === "admin") {
//             return <Navigate to={'/admin/dashboard'} />

//         } else {
//             return <Navigate to={'/shop/home'} />
//         }
//     }

//     if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
//         return <Navigate to={'/auth/login'} />

//     }
//     if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
//         if (user?.role === "admin") {
//             return <Navigate to={'/admin/dashboard'} />

//         } else {
//             return <Navigate to={'/shop/home'} />
//         }

//     }

//     if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
//         return <Navigate to={"/unauth-page"} />

//     }
//     if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
//         return <Navigate to={"/admin/dashboard"} />

//     }
//     return <> {children}</>
// }

// export default CheckAuth

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children ,isLoading }) {
  const location = useLocation();
  if (isLoading) return <div>Loading...</div>

  console.log(location.pathname, isAuthenticated);

  // Handle root route
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }

    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // If NOT authenticated and trying to access protected routes
  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/auth/login" />;
  }

  // If authenticated but trying to access login/register
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Prevent admin from accessing shop routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;