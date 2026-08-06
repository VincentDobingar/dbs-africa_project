import { lazy, Suspense } from "react";
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
import ErrorBoundary from "./shared/components/ErrorBoundary";
import RouteLoader from "./shared/components/RouteLoader";

/* PUBLIC PAGES */
/* Home stays eager: it's the most common landing page, so it should
   render without an extra network round-trip/loading flash. Every
   other public page is lazy-loaded to keep the initial bundle small. */
import Home from "./pages/public/Home";

const About = lazy(() => import("./pages/public/About"));
const TeamMemberProfile = lazy(() =>
  import("./pages/public/TeamMemberProfile")
);
const Expertise = lazy(() => import("./pages/public/Expertise"));
const Industries = lazy(() => import("./pages/public/Industries"));
const Solutions = lazy(() => import("./pages/public/Solutions"));
const Technologies = lazy(() => import("./pages/public/Technologies"));
const Portfolio = lazy(() => import("./pages/public/Portfolio"));
const Certifications = lazy(() => import("./pages/public/Certifications"));
const Careers = lazy(() => import("./pages/public/Careers"));
const Blog = lazy(() => import("./pages/public/Blog"));
const BlogPostDetail = lazy(() => import("./pages/public/BlogPostDetail"));
const Contact = lazy(() => import("./pages/public/Contact"));
const QuoteRequest = lazy(() => import("./pages/public/QuoteRequest"));
const LegalNotice = lazy(() => import("./pages/public/LegalNotice"));
const TermsOfService = lazy(() => import("./pages/public/TermsOfService"));
const NotFound = lazy(() => import("./pages/public/NotFound"));

/* PRICING (lazy: not needed by public visitors browsing other pages) */
const PricingPage = lazy(() => import("./pages/public/PricingPage"));

/* ADMIN (lazy: not needed by public visitors) */
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const Quotes = lazy(() => import("./pages/admin/Quotes"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const ProtectedRoute = lazy(() => import("./pages/admin/ProtectedRoute"));
const NewsManager = lazy(() => import("./pages/admin/NewsManager"));
const ActualitesManager = lazy(() =>
  import("./pages/admin/ActualitesManager")
);
const PortfolioManager = lazy(() => import("./pages/admin/PortfolioManager"));
const PricingManager = lazy(() => import("./pages/admin/PricingManager"));
const SettingsManager = lazy(() => import("./pages/admin/SettingsManager"));
const UsersManager = lazy(() => import("./pages/admin/UsersManager"));
const PartnersManager = lazy(() => import("./pages/admin/PartnersManager"));

/* PARTNERS (lazy: not needed by public visitors) */
const PartnerProgram = lazy(() =>
  import("./modules/partners/pages/PartnerProgram")
);
const PartnerRegister = lazy(() =>
  import("./modules/partners/pages/PartnerRegister")
);
const PartnerActivate = lazy(() =>
  import("./modules/partners/pages/PartnerActivate")
);
const PartnerLogin = lazy(() =>
  import("./modules/partners/pages/PartnerLogin")
);
const PartnerDashboard = lazy(() =>
  import("./modules/partners/pages/PartnerDashboard")
);
const PartnerProtectedRoute = lazy(() =>
  import("./modules/partners/components/PartnerProtectedRoute")
);

/* PRICING PROVIDER */
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
    location.pathname.startsWith("/partner/");

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
          <ErrorBoundary resetKey={location.pathname}>
          <Suspense fallback={<RouteLoader />}>
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
              path="/equipe/:slug"
              element={<TeamMemberProfile />}
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

            <Route
              path="/blog/:slug"
              element={<BlogPostDetail />}
            />

            {/* Alias correspondant au nom de page "Insights" du positionnement DBS Africa */}
            <Route
              path="/insights"
              element={<Blog />}
            />

            <Route
              path="/insights/:slug"
              element={<BlogPostDetail />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/quote"
              element={<QuoteRequest />}
            />

            <Route
              path="/legal-notice"
              element={<LegalNotice />}
            />

            <Route
              path="/terms"
              element={<TermsOfService />}
            />

            {/* ======================================== */}
            {/* ROUTES PARTENAIRES                       */}
            {/* Elles ne sont pas imbriquées dans admin */}
            {/* ======================================== */}

            <Route
              path="/partner"
              element={<PartnerProgram />}
            />

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
                path="pricing"
                element={<PricingManager />}
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
          </Suspense>
          </ErrorBoundary>
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