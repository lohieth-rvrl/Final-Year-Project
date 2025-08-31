import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from "./context/AppContext.jsx";
import { CourseProvider } from "./context/CourseContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { EnrollmentProvider } from "./context/EnrollmentContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <EnrollmentProvider>
          <AppProvider>
            <CourseProvider>
              <App />
            </CourseProvider>
          </AppProvider>
        </EnrollmentProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
