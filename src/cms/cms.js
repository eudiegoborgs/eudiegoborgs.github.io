import CMS from "netlify-cms-app";

if (window.location.pathname === "/admin/") {
  import("netlify-identity-widget").then((netlifyIdentity) => {
    netlifyIdentity.init();
  });
}

CMS.init();
