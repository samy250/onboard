import { useEffect, useState } from "react";
import {
  BookOpen,
  Globe,
  User,
  Lock,
  ChevronRight,
  Play,
  CheckCircle,
  XCircle,
  PenLine,
  Trash2,
  Plus,
  BarChart2,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | "landing"
  | "signup"
  | "login"
  | "login-expired"
  | "agent-home"
  | "lesson"
  | "quiz"
  | "quiz-results-pass"
  | "quiz-results-fail"
  | "manager-dashboard"
  | "admin-modules"
  | "admin-activity";

type Profile = "accountant" | "booking" | "manager" | "admin";

interface AppUser {
  name: string;
  profile: Profile;
}

const PROFILE_LABELS: Record<Profile, string> = {
  accountant: "Accountant / Comptable",
  booking: "Booking Staff",
  manager: "Manager / Owner",
  admin: "Administrateur",
};

// Maps a profile to its default home screen
function homeScreen(profile: string): Screen {
  console.log(`screen => ${JSON.stringify(profile)}`)
  if (profile === "Autres") return "manager-dashboard";
  if (profile === "Autres") return "admin-modules";
  return "agent-home";
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600">
        <BookOpen className="w-4 h-4 text-white" />
      </div>
      <span className="font-bold text-lg tracking-tight text-blue-600">
        ONBOARD
      </span>
    </div>
  );
}

// ─── Public nav ───────────────────────────────────────────────────────────────
function NavPublic({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <header className="w-full border-b border-gray-100 bg-white px-8 py-4 flex items-center justify-between">
      <Logo />
      <nav className="flex items-center gap-8">
        <button
          onClick={() => onNavigate("landing")}
          className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
        >
          Accueil
        </button>
        <button className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
          Contact
        </button>
        <button
          onClick={() => onNavigate("login")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Se connecter
        </button>
      </nav>
    </header>
  );
}

// ─── Internal top nav ─────────────────────────────────────────────────────────
function NavInternal({
  user,
  onNavigate,
  onLogout,
  activeTab,
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
  activeTab?: string;
}) {
  const role = user.profile;

  return (
    <header className="w-full border-b border-gray-100 bg-white px-8 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <Logo />
        {role === "manager" && (
          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate("agent-home")}
              className={`text-sm font-medium transition-colors ${activeTab === "accueil" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate("manager-dashboard")}
              className={`text-sm font-medium transition-colors ${activeTab === "dashboard" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
            >
              Tableau de bord
            </button>
          </nav>
        )}
        {role === "admin" && (
          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate("admin-modules")}
              className={`text-sm font-medium transition-colors ${activeTab === "modules" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
            >
              Modules
            </button>
            <button
              onClick={() => onNavigate("admin-activity")}
              className={`text-sm font-medium transition-colors ${activeTab === "activity" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
            >
              Suivi d&apos;activité
            </button>
          </nav>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
          <Globe className="w-3.5 h-3.5" />
          <span>Français</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 leading-none">
              {user.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {PROFILE_LABELS[role]}
            </p>
          </div>
          {(role === "manager" || role === "admin") && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${role === "manager" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
            >
              {role === "manager" ? "Manager" : "Admin"}
            </span>
          )}
        </div>
        {/* Logout — only shown in top nav for agent/booking/manager (no sidebar) */}
        {(role === "accountant" ||
          role === "booking" ||
          role === "manager") && (
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors text-sm border border-gray-100 hover:border-red-200 px-3 py-1.5 rounded-lg"
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Déconnexion</span>
          </button>
        )}
      </div>
    </header>
  );
}

// ─── Sidebar with logout (admin + lesson views) ───────────────────────────────
function SidebarLogout({
  onLogout,
  user,
}: {
  onLogout: () => void;
  user: AppUser;
}) {
  return (
    <div className="border-t border-gray-100 p-4 mt-auto">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate leading-none">
            {user.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">
            {PROFILE_LABELS[user.profile]}
          </p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
      >
        <LogOut className="w-4 h-4" />
        Se déconnecter
      </button>
    </div>
  );
}

// ─── Screen 1 — Landing ───────────────────────────────────────────────────────
function ScreenLanding({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavPublic onNavigate={onNavigate} />
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 mx-auto">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 max-w-2xl leading-tight mb-6">
          Plateforme de Formation <span className="text-blue-600">ONBOARD</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-10">
          ONBOARD accompagne les équipes des agences de voyage dans la prise en
          main du logiciel Airbooks. Suivez des modules adaptés à votre profil,
          progressez à votre rythme et validez vos acquis grâce à des quiz
          interactifs.
        </p>
        <button
          onClick={() => onNavigate("signup")}
          className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors mb-6"
        >
          S'inscrire
        </button>

        <button
          onClick={() => onNavigate("login")}
          className="text-blue-600 text-sm hover:underline"
        >
          Déjà un compte ? Se connecter
        </button>
      </main>
    </div>
  );
}

// ─── Screen 2 — Signup ────────────────────────────────────────────────────────
function ScreenSignup({
  onNavigate,
  onLogin,
}: {
  onNavigate: (s: Screen) => void;
  onLogin: (u: AppUser) => void;
}) {
  const [profile, setProfile] = useState<any>(0);

  const [staffType, setStaffType] = useState<any[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agency, setAgency] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await (await fetch("http://localhost:5000/getStaff")).json();
      setStaffType(data);
      setProfile(data[0].role_id);
    };

    fetchData();
  }, []);

  async function handleSubmit() {
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: "",
          password,
          email,
          role_id: profile,
          agency_name: agency,
        }),
      });

      if (response.status === 400)
        setErrorMessage((await response.json()).message);

      if (response.status === 200 || response.status === 201)
        onNavigate("login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full px-8 py-4 bg-white border-b border-gray-100 flex items-center">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-5xl flex gap-16 items-center">
          <div className="flex-1 hidden md:block">
            <h1 className="text-3xl font-bold text-gray-900 leading-snug mb-4">
              Commencez votre formation sur Airbooks avec{" "}
              <span className="text-blue-600">ONBOARD</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Créez votre compte en quelques secondes et accédez immédiatement à
              votre parcours de formation personnalisé.
            </p>
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Créer un compte
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nom
                  </label>
                  <input
                    type="text"
                    placeholder="Dupont"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prénom
                  </label>
                  <input
                    type="text"
                    placeholder="Marie"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="marie.dupont@agence.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom de l&apos;agence
                </label>
                <input
                  type="text"
                  placeholder="Agence Voyages Plus"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
              {/* Profile selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Profil
                </label>
                <div className="relative">
                  <select
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-9 text-gray-700"
                  >
                    {staffType.map((st, index) => (
                      <option key={index} value={st.role_id}>
                        {st.role_name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors mt-2"
              >
                S&apos;inscrire
              </button>
            </div>
            <p className="text-center text-red-500 bold">{errorMessage}</p>
            <p className="text-center text-sm text-gray-500 mt-5">
              Déjà un compte ?{" "}
              <button
                onClick={() => handleSubmit()}
                className="text-blue-600 font-medium hover:underline"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Screen 3 — Login ─────────────────────────────────────────────────────────
function ScreenLogin({
  onNavigate,
  onLogin,
  expired = false,
}: {
  onNavigate: (s: Screen) => void;
  onLogin: (u: any) => void;
  expired?: boolean;
}) {
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");

async function handleLogin() {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    // Check if login failed 
    if (!response.ok) {
      setErrorMessage(
        data.message || data.error || "Login failed"
      );
      return;
    }

    // Login successful
    onLogin({
      name: data.user_name,
      profile: data.role_name,
    });

  } catch (error) {
    console.error("Login error:", error);

    setErrorMessage(
      "Unable to connect to the server."
    );
  }
}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full px-8 py-4 bg-white border-b border-gray-100 flex items-center">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Bon retour sur ONBOARD
          </h1>
          <p className="text-sm text-gray-500 mb-7">
            Entrez vos informations pour continuer.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="marie.dupont@agence.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mot de passe
              </label>
              <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
              </label>
            </div>
            <button className="text-blue-600 text-sm hover:underline block">
              Mot de passe oublié ?
            </button>

            {expired && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                ⚠️ Votre accès a expiré après 6 mois d&apos;inactivité. Veuillez
                contacter votre administrateur pour le renouveler.
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-5">
            Pas de compte ?{" "}
            <button
              onClick={() => onNavigate("signup")}
              className="text-blue-600 font-medium hover:underline"
            >
              S&apos;inscrire
            </button>
          </p>
          {!expired && (
            <button
              onClick={() => handleLogin()}
              className="w-full mt-3 border border-red-200 text-red-600 py-2 rounded-lg text-xs hover:bg-red-50 transition-colors"
            >
              Voir variante : accès expiré
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Screen 4 — Agent Home ────────────────────────────────────────────────────
const modules = [
  {
    id: 1,
    name: "Introduction à Airbooks",
    status: "done" as const,
  },
  {
    id: 2,
    name: "Gestion des réservations",
    status: "in-progress" as const,
  },
  {
    id: 3,
    name: "Émission de billets",
    status: "locked" as const,
  },
  {
    id: 4,
    name: "Facturation et paiements",
    status: "locked" as const,
  },
  {
    id: 5,
    name: "Rapports et exports",
    status: "locked" as const,
  },
];

function ModuleStatusBadge({
  status,
}: {
  status: "done" | "in-progress" | "locked";
}) {
  if (status === "done")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
        ✓ Terminé
      </span>
    );
  if (status === "in-progress")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full">
        ● En cours
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
      <Lock className="w-3 h-3" /> Verrouillé
    </span>
  );
}

function ScreenAgentHome({
  user,
  onNavigate,
  onLogout,
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        activeTab="accueil"
      />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {user.name} 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Profil : {PROFILE_LABELS[user.profile]} — Continuez votre formation
            Airbooks
          </p>
        </div>
        <div className="space-y-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`bg-white rounded-xl border px-6 py-5 flex items-center justify-between transition-shadow ${mod.status === "locked" ? "border-gray-100 opacity-60" : "border-gray-100 hover:shadow-sm"}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${mod.status === "done" ? "bg-green-50 text-green-700" : mod.status === "in-progress" ? "bg-yellow-50 text-yellow-700" : "bg-gray-100 text-gray-400"}`}
                >
                  {mod.id}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {mod.name}
                  </p>
                  <div className="mt-1">
                    <ModuleStatusBadge status={mod.status} />
                  </div>
                </div>
              </div>
              {mod.status !== "locked" ? (
                <button
                  onClick={() => onNavigate("lesson")}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                >
                  Consulter <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  disabled
                  className="border border-gray-200 text-gray-300 px-5 py-2 rounded-lg text-sm font-semibold cursor-not-allowed flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" /> Verrouillé
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ─── Screen 5 — Lesson / Video ────────────────────────────────────────────────
const sidebarModules = [
  {
    id: 1,
    name: "Introduction à Airbooks",
    lessons: [
      "Présentation générale",
      "Interface principale",
      "Paramétrage initial",
    ],
  },
  {
    id: 2,
    name: "Gestion des réservations",
    lessons: [
      "Créer une réservation",
      "Modifier une réservation",
      "Annuler et rembourser",
    ],
    active: true,
  },
];

function ScreenLesson({
  user,
  onNavigate,
  onLogout,
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}) {
  const [activeLesson, setActiveLesson] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal user={user} onNavigate={onNavigate} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col">
          <div className="flex-1 overflow-y-auto py-6 px-4">
            {sidebarModules.map((mod) => (
              <div key={mod.id} className="mb-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                  Module {mod.id}
                </p>
                <p className="text-sm font-semibold text-gray-700 px-2 mb-2">
                  {mod.name}
                </p>
                <ul className="space-y-0.5">
                  {mod.lessons.map((lesson, i) => (
                    <li key={i}>
                      <button
                        onClick={() => mod.active && setActiveLesson(i)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${mod.active && activeLesson === i ? "bg-blue-50 text-blue-700 font-medium" : mod.active ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 cursor-default"}`}
                      >
                        {mod.active && (
                          <span className="inline-block w-4 h-4 rounded-full border-2 border-current mr-2 align-middle" />
                        )}
                        {lesson}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 px-8 py-8 overflow-y-auto">
          {/* Title */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              Module 2 · Gestion des réservations
            </p>
            <h2 className="text-xl font-bold text-gray-900">
              Leçon {activeLesson + 1} —{" "}
              {sidebarModules[1].lessons[activeLesson]}
            </h2>
          </div>

          {/* Video + Description side by side */}
          <div className="flex gap-6 items-start">
            {/* Video player */}
            <div className="flex-1 min-w-0">
              <div className="bg-black rounded-2xl aspect-video w-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                <button className="relative w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs font-mono">0:00</span>
                    <div className="flex-1 h-1.5 bg-white/20 rounded-full">
                      <div className="h-full w-0 bg-blue-400 rounded-full" />
                    </div>
                    <span className="text-white text-xs font-mono">15:00</span>
                  </div>
                </div>
              </div>

              {/* Button below video */}
              <div className="mt-5">
                <button
                  onClick={() => onNavigate("quiz")}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Leçon suivante <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Course description panel */}
            <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-5">
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-2">
                  Description du cours
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {activeLesson === 0 &&
                    "Dans cette leçon, vous apprendrez à créer une réservation complète dans Airbooks : sélection du vol, du passager et du mode de paiement, jusqu'à la confirmation finale."}
                  {activeLesson === 1 &&
                    "Cette leçon couvre la modification d'une réservation existante : changement de date, mise à jour des informations passager et gestion des frais de modification appliqués par la compagnie."}
                  {activeLesson === 2 &&
                    "Nous verrons ici les procédures d'annulation et de remboursement : conditions tarifaires, délais de traitement et étapes à suivre dans Airbooks pour initier un remboursement."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-2">
                  Objectifs pédagogiques
                </h3>
                <ul className="space-y-2">
                  {activeLesson === 0 && (
                    <>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Naviguer dans l&apos;interface de réservation
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Saisir les informations passager correctement
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Valider et confirmer une réservation
                      </li>
                    </>
                  )}
                  {activeLesson === 1 && (
                    <>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Retrouver une réservation existante
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Modifier les détails du vol ou du passager
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Comprendre les frais de modification
                      </li>
                    </>
                  )}
                  {activeLesson === 2 && (
                    <>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Identifier les conditions d&apos;annulation
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Initier une demande de remboursement
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        Suivre le statut du remboursement
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Durée</span>
                  <span className="font-semibold text-gray-600">15 min</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1"></div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Quiz final</span>
                  <span className="font-semibold text-blue-600">Inclus</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Screen 6 — Quiz ──────────────────────────────────────────────────────────
let quizResults:any[] = [];

function ScreenQuiz({
  user,
  onNavigate,
  onLogout,
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}) {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [quizQuestions, setQuizQuestions] = useState<{
    q: string;
    question_id: number;
    choices: any[];
  }[]>([]);

  async function getQuestions() {
    try {
      const response = await fetch("http://localhost:5000/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          module_id: 1,
        }),
      });

      const data = await response.json();

      console.log(data);

      setQuizQuestions(data);

    } catch (error) {
      console.error(error);
    }
}

async function submitAnswers() {
  try {
    const response = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questions: selected,
      }),
    });

    const data = await response.json();

    quizResults = data.results;

    if (data.score === quizQuestions.length) {
      onNavigate("quiz-results-pass");
    } else {
      onNavigate("quiz-results-fail");
    }

  } catch (error) {
    console.error(error);
  }
}
  
useEffect(() => {
  getQuestions();
}, []);






  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal user={user} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Quiz</h1>
            <p className="text-sm text-gray-500">
              Module 2 — Gestion des réservations
            </p>
          </div>
        </div>
        <div className="space-y-6">
          {quizQuestions.map(({ question_id, q, choices }, qi) => (
            <div
              key={qi}
              className="bg-white rounded-xl border border-gray-100 p-6"
            >
              <p className="font-semibold text-gray-800 text-sm mb-4">
                {q}
              </p>
              <div className="space-y-2.5">
                {choices.map(({choice, choice_id}, ci) => (
                  <label
                    key={ci}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${selected[question_id] === choice_id ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:bg-gray-50"}`}
                  >
                    <input
                      type="radio"
                      name={`${question_id}`}
                      value={choice_id}
                      checked={selected[question_id] === choice_id}
                      onChange={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [question_id]: choice_id,
                        }))
                      }
                      className="accent-blue-600"
                    />
                    <span className="text-sm text-gray-700">{choice}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={submitAnswers}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Envoyer
          </button>
          {/* <button
            onClick={() => onNavigate("quiz-results-fail")}
            className="border border-gray-200 text-gray-500 px-5 py-3 rounded-xl text-sm hover:bg-gray-50"
          >
            Voir résultat échoué
          </button> */}
        </div>
      </main>
    </div>
  );
}

// ─── Screen 7 — Quiz Results ──────────────────────────────────────────────────
// const quizResults = [
//   {
//     q: "Q1. Fonctionnalité pour créer une réservation ?",
//     correct: "Bouton « Nouvelle réservation »",
//     explanation:
//       "Ce bouton est accessible depuis l'écran d'accueil principal d'Airbooks.",
//   },
//   {
//     q: "Q2. Comment modifier le nom d'un passager ?",
//     correct: "Depuis la fiche réservation",
//     explanation:
//       "Ouvrez la réservation puis cliquez sur l'icône crayon à côté du nom.",
//   },
//   {
//     q: "Q3. Statut indiquant un billet émis ?",
//     correct: "Émis",
//     explanation:
//       "Le statut « Émis » confirme que le billet a été transmis aux compagnies.",
//   },
//   {
//     q: "Q4. Délai de remboursement ?",
//     correct: "3 à 5 jours ouvrés",
//     explanation:
//       "Les délais peuvent varier selon la compagnie aérienne et le type de tarif.",
//   },
// ];

function ScreenQuizResults({
  pass,
  user,
  onNavigate,
  onLogout,
}: {
  pass: boolean;
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal user={user} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Résultats du Quiz
        </h1>
        <p className="text-sm text-gray-500 mb-7">
          Module 2 — Gestion des réservations
        </p>
        <div className="space-y-4 mb-8">
          {quizResults.map((result, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <p className="text-sm font-semibold text-gray-700 mb-2">{result.question}</p>
              <div className="flex items-start gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-700 font-medium">
                  {result.reponse_recue}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 pl-6">{result.reponse_correcte}</p>
            </div>
          ))}
        </div>
        {pass ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-green-600" />
              <p className="text-green-800 font-semibold">
                Quiz réussi, allez on avance !
              </p>
            </div>
            <button
              onClick={() => onNavigate("lesson")}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Cours suivant
            </button>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <XCircle className="w-7 h-7 text-red-500" />
              <p className="text-red-700 font-semibold">
                Quiz non réussi — révisez et réessayez.
              </p>
            </div>
            <button
              onClick={() => onNavigate("quiz")}
              className="bg-red-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              Recommencer
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Screen 8 — Manager Dashboard ────────────────────────────────────────────
const employees: Record<
  string,
  {
    name: string;
    module: string;
    done: number;
    total: number;
  }[]
> = {
  accountant: [
    {
      name: "Jean Koffi",
      module: "Module 3 — Émission de billets",
      done: 2,
      total: 4,
    },
    {
      name: "Fatou Diallo",
      module: "Module 2 — Gestion des réservations",
      done: 1,
      total: 3,
    },
    {
      name: "Amara Traoré",
      module: "Module 4 — Facturation",
      done: 3,
      total: 4,
    },
  ],
  booking: [
    {
      name: "Marie Dupont",
      module: "Module 2 — Gestion des réservations",
      done: 2,
      total: 3,
    },
    {
      name: "Luc Mensah",
      module: "Module 1 — Introduction",
      done: 3,
      total: 3,
    },
  ],
};

const moduleCompletion: Record<string, { module: string; pct: number }[]> = {
  accountant: [
    { module: "Module 1", pct: 100 },
    { module: "Module 2", pct: 82 },
    { module: "Module 3", pct: 60 },
    { module: "Module 4", pct: 40 },
    { module: "Module 5", pct: 15 },
  ],
  booking: [
    { module: "Module 1", pct: 100 },
    { module: "Module 2", pct: 75 },
    { module: "Module 3", pct: 50 },
    { module: "Module 4", pct: 30 },
    { module: "Module 5", pct: 10 },
  ],
};

function ScreenManagerDashboard({
  user,
  onNavigate,
  onLogout,
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}) {
  const [filter, setFilter] = useState<"accountant" | "booking">("accountant");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        activeTab="dashboard"
      />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "accountant" | "booking")
            }
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="accountant">Accountant / Comptable</option>
            <option value="booking">Booking Staff</option>
          </select>
        </div>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-1">
            Section 1 — Progression individuelle
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            <span className="inline-flex items-center gap-3">
              <span>● Module validée</span>
              <span>○ Module restant</span>
            </span>
          </p>
          <div className="space-y-4">
            {employees[filter].map((emp, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800">
                    {emp.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{emp.module}</p>
                  <div className="flex gap-1.5 mt-2">
                    {Array.from({ length: emp.total }).map((_, j) => (
                      <span
                        key={j}
                        className={`text-base leading-none ${j < emp.done ? "text-green-600" : "text-gray-300"}`}
                      >
                        {j < emp.done ? "●" : "○"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">
            Section 2 — Taux de complétion moyen par module
          </h2>
          <div className="space-y-4">
            {moduleCompletion[filter].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-700 font-medium">
                    {item.module}
                  </span>
                  <span className="text-gray-500 font-semibold">
                    {item.pct}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// ─── Screen 9 — Admin Modules ─────────────────────────────────────────────────
const adminModules = [
  { id: 1, name: "Introduction à Airbooks" },
  { id: 2, name: "Gestion des réservations" },
  { id: 3, name: "Émission de billets" },
  { id: 4, name: "Facturation et paiements" },
  { id: 5, name: "Rapports et exports" },
];

const moduleLessons: Record<number, string[]> = {
  1: ["Présentation générale", "Interface principale", "Paramétrage initial"],
  2: [
    "Créer une réservation",
    "Modifier une réservation",
    "Annuler et rembourser",
  ],
  3: ["Sélection de tarif", "Émission manuelle", "Contrôle des billets"],
  4: ["Création de facture", "Suivi des paiements", "Remboursements"],
  5: ["Exports PDF", "Rapports d'activité", "Statistiques avancées"],
};

function AdminSidebar({
  user,
  onNavigate,
  onLogout,
  activeTab,
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
  activeTab: string;
}) {
  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col">
      <div className="flex-1 py-6 px-4">
        <button
          onClick={() => onNavigate("admin-modules")}
          className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${activeTab === "modules" ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <BookOpen className="w-4 h-4" /> Modules
        </button>
        <button
          onClick={() => onNavigate("admin-activity")}
          className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === "activity" ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <BarChart2 className="w-4 h-4" /> Suivi d&apos;activité
        </button>
      </div>
    </aside>
  );
}

function ScreenAdminModules({
  user,
  onNavigate,
  onLogout,
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}) {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        activeTab="modules"
      />
      <div className="flex flex-1">
        <AdminSidebar
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
          activeTab="modules"
        />
        <main className="flex-1 px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900">
              Gestion des modules
            </h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Ajouter un module
            </button>
          </div>
          <div className="space-y-2">
            {adminModules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setExpandedModule(expandedModule === mod.id ? null : mod.id)
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-5">
                      {mod.id}.
                    </span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {mod.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <PenLine className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-300 transition-transform ${expandedModule === mod.id ? "rotate-90" : ""}`}
                    />
                  </div>
                </div>
                {expandedModule === mod.id && (
                  <div className="border-t border-gray-50 bg-gray-50 px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Leçons
                      </p>
                      <button className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:underline">
                        <Plus className="w-3 h-3" /> Ajouter une leçon
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {moduleLessons[mod.id]?.map((lesson, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg border border-gray-100"
                        >
                          <span className="text-sm text-gray-700">
                            {lesson}
                          </span>
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                              <PenLine className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Screen 10 — Admin Activity ───────────────────────────────────────────────
const activityUsers = [
  {
    name: "Marie Dupont",
    agency: "Voyages Plus",
    status: "active" as const,
    action: "Leçon 2 — Module 2 complétée",
    datetime: "14/07/2026 09:42",
  },
  {
    name: "Jean Koffi",
    agency: "Africa Travel",
    status: "active" as const,
    action: "Quiz Module 3 réussi",
    datetime: "14/07/2026 09:15",
  },
  {
    name: "Fatou Diallo",
    agency: "Africa Travel",
    status: "active" as const,
    action: "Leçon 1 — Module 2 démarrée",
    datetime: "14/07/2026 08:50",
  },
  {
    name: "Luc Mensah",
    agency: "Grand Bleu Tours",
    status: "completed" as const,
    action: "Module 1 terminé",
    datetime: "13/07/2026 17:30",
  },
  {
    name: "Amara Traoré",
    agency: "Voyages Plus",
    status: "active" as const,
    action: "Connexion",
    datetime: "13/07/2026 16:00",
  },
  {
    name: "Claire Bertrand",
    agency: "Grand Bleu Tours",
    status: "completed" as const,
    action: "Quiz Module 5 réussi",
    datetime: "12/07/2026 11:20",
  },
];

function ScreenAdminActivity({
  user,
  onNavigate,
  onLogout,
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        activeTab="activity"
      />
      <div className="flex flex-1">
        <AdminSidebar
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
          activeTab="activity"
        />
        <main className="flex-1 px-8 py-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            Suivi d&apos;activité global
          </h1>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    Agence
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    Dernière action
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    Date et heure
                  </th>
                </tr>
              </thead>
              <tbody>
                {activityUsers.map((u, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{u.agency}</td>
                    <td className="px-5 py-4">
                      {u.status === "active" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full">
                          ● Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                          ✓ Complété
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{u.action}</td>
                    <td className="px-5 py-4 text-gray-400 font-mono text-xs">
                      {u.datetime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Screen nav overlay ───────────────────────────────────────────────────────
function NavOverlay({
  onNavigate,
  current,
}: {
  onNavigate: (s: Screen) => void;
  current: Screen;
}) {
  const [open, setOpen] = useState(false);

  const screens: { label: string; screen: Screen }[] = [
    { label: "1 — Landing", screen: "landing" },
    { label: "2 — Inscription", screen: "signup" },
    { label: "3 — Connexion", screen: "login" },
    { label: "3b — Accès expiré", screen: "login-expired" },
    { label: "4 — Accueil Agent", screen: "agent-home" },
    { label: "5 — Leçon vidéo", screen: "lesson" },
    { label: "6 — Quiz", screen: "quiz" },
    {
      label: "7a — Résultats réussi",
      screen: "quiz-results-pass",
    },
    {
      label: "7b — Résultats échoué",
      screen: "quiz-results-fail",
    },
    {
      label: "8 — Dashboard Manager",
      screen: "manager-dashboard",
    },
    { label: "9 — Admin Modules", screen: "admin-modules" },
    { label: "10 — Admin Activité", screen: "admin-activity" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      {open && (
        <div className="fixed bottom-20 right-5 z-50 bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 w-64">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
            Écrans ONBOARD
          </p>
          <div className="space-y-0.5">
            {screens.map((s) => (
              <button
                key={s.screen}
                onClick={() => {
                  onNavigate(s.screen);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === s.screen ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
const DEFAULT_USER: AppUser = {
  name: "Utilisateur",
  profile: "booking",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [user, setUser] = useState<any>({});

  function navigate(s: Screen) {
    setScreen(s);
    window.scrollTo(0, 0);
  }

  function login(u: any) {
    setUser(u);
    navigate(homeScreen(u.role_name));
  }

  function logout() {
    setUser(DEFAULT_USER);
    navigate("login");
  }

  const sharedProps = {
    user,
    onNavigate: navigate,
    onLogout: logout,
  };

  return (
    <div className="font-[Inter,sans-serif]">
      {screen === "landing" && <ScreenLanding onNavigate={navigate} />}
      {screen === "signup" && (
        <ScreenSignup onNavigate={navigate} onLogin={login} />
      )}
      {screen === "login" && (
        <ScreenLogin onNavigate={navigate} onLogin={login} />
      )}
      {screen === "login-expired" && (
        <ScreenLogin onNavigate={navigate} onLogin={login} expired />
      )}
      {screen === "agent-home" && <ScreenAgentHome {...sharedProps} />}
      {screen === "lesson" && <ScreenLesson {...sharedProps} />}
      {screen === "quiz" && <ScreenQuiz {...sharedProps} />}
      {screen === "quiz-results-pass" && (
        <ScreenQuizResults pass {...sharedProps} />
      )}
      {screen === "quiz-results-fail" && (
        <ScreenQuizResults pass={false} {...sharedProps} />
      )}
      {screen === "manager-dashboard" && (
        <ScreenManagerDashboard {...sharedProps} />
      )}
      {screen === "admin-modules" && <ScreenAdminModules {...sharedProps} />}
      {screen === "admin-activity" && <ScreenAdminActivity {...sharedProps} />}
      <NavOverlay onNavigate={navigate} current={screen} />
    </div>
  );
}