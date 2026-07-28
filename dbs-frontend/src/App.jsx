import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./shared/components/ScrollToTop";
import ScrollProgress from "./shared/components/ScrollProgress";

/* PUBLIC PAGES */
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Expertise from "./pages/public/Expertise";
import Industries from "./pages/public/Industries";
import Solutions from "./pages/public/Solutions";
import Technologies from "./pages/public/Technologies";
import Portfolio from "./pages/public/Portfolio";
import Certifications from "./pages/public/Certifications";
import Careers from "./pages/public/Careers";
import PricingPage from "./pages/public/PricingPage";
import Blog from "./pages/public/Blog";
import Contact from "./pages/public/Contact";
import QuoteRequest from "./pages/public/QuoteRequest";
import NotFound from "./pages/public/NotFound";

/* ADMIN */
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Messages from "./pages/admin/Messages";
import Quotes from "./pages/admin/Quotes";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import NewsManager from "./pages/admin/NewsManager";
import ActualitesManager from "./pages/admin/ActualitesManager";
import PortfolioManager from "./pages/admin/PortfolioManager";
import SettingsManager from "./pages/admin/SettingsManager";
import UsersManager from "./pages/admin/UsersManager";

/* PARTNERS */
import PartnerRegister from "./modules/partners/pages/PartnerRegister";
import PartnerActivate from "./modules/partners/pages/PartnerActivate";
import PartnerLogin from "./modules/partners/pages/PartnerLogin";
import PartnerDashboard from "./modules/partners/pages/PartnerDashboard";
import PartnersManager from "./pages/admin/PartnersManager";

import PartnerProtectedRoute from "./modules/partners/components/PartnerProtectedRoute";

/* PRICING */
import {
  PricingProvider,
} from "./pricing/context/PricingContext";

/* THEME */
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const location = useLocation();
  const { t } = useTranslation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  const isPartnerRoute =
    location.pathname.startsWith("/partner");

  const showPublicLayout =
    !isAdminRoute && !isPartnerRoute;

  return (
    <ThemeProvider>
    <PricingProvider>
      <div className="flex min-h-screen flex-col bg-white text-dbsDark dark:bg-gray-950 dark:text-white">
        {showPublicLayout && <ScrollProgress />}

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-dbsOrange focus:px-6 focus:py-3 focus:font-semibold focus:text-white"
        >
          {t("a11y.skipToContent", { defaultValue: "Aller au contenu" })}
        </a>

        <ScrollToTop />

        {/* Navigation publique */}
        {showPublicLayout && <Navbar />}

        <main id="main-content" className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
          <Routes location={location}>
            {/* ======================================== */}
            {/* ROUTES PUBLIQUES                         */}
            {/* ======================================== */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/expertise"
              element={<Expertise />}
            />

            {/* Ancienne URL /services conservée en redirection */}
            <Route
              path="/services"
              element={<Navigate to="/expertise" replace />}
            />

            <Route
              path="/industries"
              element={<Industries />}
            />

            <Route
              path="/solutions"
              element={<Solutions />}
            />

            <Route
              path="/technologies"
              element={<Technologies />}
            />

            <Route
              path="/portfolio"
              element={<Portfolio />}
            />

            <Route
              path="/certifications"
              element={<Certifications />}
            />

            <Route
              path="/careers"
              element={<Careers />}
            />

            <Route
              path="/pricing"
              element={<PricingPage />}
            />

            <Route
              path="/blog"
              element={<Blog />}
            />

            {/* Alias correspondant au nom de page "Insights" du positionnement DBS Africa */}
            <Route
              path="/insights"
              element={<Blog />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/quote"
              element={<QuoteRequest />}
            />

            {/* ======================================== */}
            {/* ROUTES PARTENAIRES                       */}
            {/* Elles ne sont pas imbriquées dans admin */}
            {/* ======================================== */}

            <Route
              path="/partner/register"
              element={<PartnerRegister />}
            />

            <Route
              path="/partner/activate"
              element={<PartnerActivate />}
            />

            <Route
              path="/partner/login"
              element={<PartnerLogin />}
            />

            <Route
              path="/partner/dashboard"
              element={
                <PartnerProtectedRoute>
                  <PartnerDashboard />
                </PartnerProtectedRoute>
              }
            />

            {/* ======================================== */}
            {/* AUTHENTIFICATION ADMINISTRATEUR          */}
            {/* ======================================== */}

            <Route
              path="/admin/login"
              element={<Login />}
            />

            {/* ======================================== */}
            {/* ROUTES ADMINISTRATIVES                   */}
            {/* ======================================== */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Dashboard />}
              />

              <Route
                path="messages"
                element={<Messages />}
              />

              <Route
                path="quotes"
                element={<Quotes />}
              />

              <Route
                path="partners"
                element={<PartnersManager />}
              />

              <Route
                path="news"
                element={<NewsManager />}
              />

              <Route
                path="actualites"
                element={<ActualitesManager />}
              />

              <Route
                path="portfolio"
                element={<PortfolioManager />}
              />

              <Route
                path="settings"
                element={<SettingsManager />}
              />

              <Route
                path="users"
                element={<UsersManager />}
              />
            </Route>

            {/* ======================================== */}
            {/* PAGE 404                                  */}
            {/* ======================================== */}

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Pied de page public */}
        {showPublicLayout && <Footer />}
      </div>
    </PricingProvider>
    </ThemeProvider>
  );
}