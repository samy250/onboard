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
// interface TrackedModule {
//   id: number;
//   name: string;
//   status: ModuleStatus;
//   order: number; // Optional order field for sorting
// }

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

let currentUser: any = null;
let currentModule: any = null;

// Maps a profile to its default home screen
function homeScreen(profile: string): Screen {
  console.log(`screen => ${JSON.stringify(profile)}`);
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
        setErrorMessage(data.message || data.error || "Login failed");
        return;
      }

      // Login successful
      onLogin({
        username: data.user_name,
        userId: data.userId,
        profile: data.role_name,
      });
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage("Unable to connect to the server.");
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

// ─── Screen 4 — Agent Home ─────────────────────────────────────────────

// export async function getTrackingByUser(
//   userId: number,
// ): Promise<TrackedModule[]> {
//   const res = await fetch(`http://localhost:5000/tracking`);
//   if (!res.ok) throw new Error("Erreur lors de la récupération du suivi");
//   return res.json();
// }

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

// Appelle le backend (GET /tracking) pour récupérer, pour chaque module,
// une ligne par question suivie par l'utilisateur (user_id=1 pour l'instant,
// codé en dur côté backend en attendant un vrai système de connexion).
async function fetchAgentModules() {
  const response = await fetch("http://localhost:5000/tracking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: currentUser }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des modules");
  }

  // Le backend renvoie un tableau du type :
  // [{ user_name, module_id, title, progression_status }, ...]
  // avec PLUSIEURS lignes pour le même module (une par question).
  return response.json();
}

// Regroupe les lignes reçues (une par question) en UNE seule ligne par
// module, avec un statut simple : "done" si toutes les questions du
// module sont "Completed", "in-progress" si au moins une question a
// été commencée, sinon "locked".
function groupRowsByModule(
  rows: { module_id: number; title: string; progression_status: string }[],
) {
  const parModule = new Map<
    number,
    { id: number; name: string; statuses: string[] }
  >();

  for (const row of rows) {
    if (!parModule.has(row.module_id)) {
      parModule.set(row.module_id, {
        id: row.module_id,
        name: row.title,
        statuses: [],
      });
    }
    parModule.get(row.module_id)!.statuses.push(row.progression_status);
  }

  return Array.from(parModule.values()).map((mod) => {
    const toutTermine = mod.statuses.every((s) => s === "Completed");
    const auMoinsUnCommence = mod.statuses.some((s) => s !== "Inactive");

    let status: "done" | "in-progress" | "locked";
    if (toutTermine) status = "done";
    else if (auMoinsUnCommence) status = "in-progress";
    else status = "locked";

    return { id: mod.id, name: mod.name, status };
  });
}

function ScreenAgentHome({
  user,
  onNavigate,
  onLogout,
  onOpenModule, // fonction reçue depuis App() : on lui donne l'id du module cliqué
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
  onOpenModule: (moduleId: number) => void;
}) {
  // Liste des modules affichés sur l'accueil, une fois reçus du backend.
  const [modules, setModules] = useState<
    { id: number; name: string; status: "done" | "in-progress" | "locked" }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Se déclenche une seule fois, quand l'écran d'accueil s'affiche.
  useEffect(() => {
    fetchAgentModules()
      .then((rows) => setModules(groupRowsByModule(rows)))
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger vos modules.");
      })
      .finally(() => setLoading(false));
  }, []);

  function nextLesson() {}

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
          {/* Cas 1 : on attend encore la réponse du serveur */}
          {loading && (
            <p className="text-sm text-gray-500">Chargement des modules…</p>
          )}

          {/* Cas 2 : l'appel API a échoué */}
          {!loading && error && <p className="text-sm text-red-600">{error}</p>}

          {/* Cas 3 : tout s'est bien passé, on affiche une carte par module */}
          {!loading &&
            !error &&
            modules.map((mod) => (
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
                    // ÉTAPE 1 : quand on clique ici, on envoie l'id de CE module
                    // précis (mod.id) à la fonction onOpenModule.
                    // C'est cette étape qui "capture" quel module a été choisi.
                    onClick={() => onOpenModule(mod.id)}
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

// Cette fonction fait UNE SEULE chose : demander au backend "donne-moi
// les cours (leçons) du module numéro X". Elle ne touche à aucun affichage,
// elle renvoie juste les données brutes reçues du serveur.
async function fetchCoursesByModule(moduleId: number) {
  // On envoie une requête POST à l'adresse de ton API, avec le module_id
  // dans le corps de la requête (body), comme ton backend l'attend.
  const response = await fetch("http://localhost:5000/course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ module_id: moduleId }),
  });

  // Si le serveur répond une erreur (ex: 400, 500), on arrête tout de suite
  // et on lève une erreur, qui sera récupérée plus bas par le .catch()
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des cours");
  }

  // Sinon, on transforme la réponse en JSON utilisable : un tableau
  // du type [{ course_id, course_name, module_id }, ...]
  return response.json();
}

const lessonDetails = [
  {
    description:
      "Dans cette leçon, vous découvrirez les fonctionnalités principales d'AirBooks ainsi que son interface afin de vous familiariser avec l'environnement de travail.",

    objectives: [
      "Découvrir l'interface d'AirBooks",
      "Comprendre les principales fonctionnalités",
      "Naviguer dans les différents menus",
    ],

    duration: "15 min",
  },

  {
    description:
      "Cette leçon explique comment utiliser l'interface principale d'AirBooks et accéder rapidement aux différentes fonctionnalités disponibles.",

    objectives: [
      "Identifier les menus principaux",
      "Utiliser le tableau de bord",
      "Comprendre les raccourcis de navigation",
    ],

    duration: "15 min",
  },

  {
    description:
      "Vous apprendrez à effectuer les premiers paramétrages nécessaires avant de commencer à utiliser AirBooks.",

    objectives: [
      "Configurer les paramètres de base",
      "Personnaliser l'environnement",
      "Vérifier les informations de l'agence",
    ],

    duration: "15 min",
  },

  {
    description:
      "Cette leçon présente les étapes nécessaires pour créer une nouvelle réservation dans AirBooks.",

    objectives: [
      "Sélectionner un vol",
      "Saisir les informations du passager",
      "Valider une réservation",
    ],

    duration: "15 min",
  },

  {
    description:
      "Vous apprendrez à rechercher une réservation existante et à modifier les informations du voyage ou du passager.",

    objectives: [
      "Rechercher une réservation",
      "Modifier les informations du passager",
      "Mettre à jour les dates du voyage",
    ],

    duration: "15 min",
  },

  {
    description:
      "Cette leçon explique comment annuler une réservation et effectuer un remboursement selon les règles de la compagnie aérienne.",

    objectives: [
      "Annuler une réservation",
      "Lancer un remboursement",
      "Suivre le statut du remboursement",
    ],

    duration: "15 min",
  },
];

function ScreenLesson({
  user,
  onNavigate,
  onLogout,
  moduleId, // reçu depuis App() : c'est l'id du module cliqué sur l'accueil
}: {
  user: AppUser;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
  moduleId: number | null;
}) {
  // "courses" contient la liste des leçons une fois reçues du backend.
  // Au début, elle est vide : rien n'est encore arrivé.
  const [courses, setCourses] = useState<
    { course_id: number; course_name: string; module_id: number }[]
  >([]);

  // "loading" sert à savoir si on est encore en train d'attendre la réponse
  // du serveur (utile pour afficher "Chargement..." à l'écran).
  const [loading, setLoading] = useState(true);

  // "error" contient un message si l'appel au backend a échoué.
  const [error, setError] = useState<string | null>(null);

  // "activeLesson" retient quelle leçon est actuellement affichée
  // (0 = la première leçon de la liste, 1 = la deuxième, etc.)
  const [activeLesson, setActiveLesson] = useState(0);

  // ÉTAPE 2 : ce bloc s'exécute automatiquement à chaque fois que
  // "moduleId" change (c'est-à-dire, à chaque fois qu'on clique sur un
  // module différent depuis l'accueil). C'est ici qu'on va chercher les
  // vraies données dans la base, via l'API.
  useEffect(() => {
    // Si aucun module n'a encore été choisi, on ne fait rien.
    if (moduleId == null) {
      setLoading(false);
      return;
    }

    // On réinitialise l'affichage avant chaque nouvel appel :
    // on remontre "Chargement...", on efface les anciennes erreurs,
    // et on revient à la première leçon.
    setLoading(true);
    setError(null);
    setActiveLesson(0);

    // ÉTAPE 3 : on appelle vraiment l'API avec le moduleId reçu.
    fetchCoursesByModule(moduleId)
      .then((data) => setCourses(data)) // si ça marche : on stocke les leçons reçues
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les leçons de ce module.");
      })
      .finally(() => setLoading(false)); // dans tous les cas : on arrête le "Chargement..."
  }, [moduleId]);

  function nextLesson() {
    // Vérifie qu'il reste une leçon après celle affichée
    if (activeLesson < courses.length - 1) {
      setActiveLesson(activeLesson + 1);
    } else {
      // Toutes les leçons sont terminées
      onNavigate("quiz");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal user={user} onNavigate={onNavigate} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar : liste des leçons du module en cours */}
        <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col">
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
              Module {moduleId ?? "—"}
            </p>
            <ul className="space-y-0.5">
              {/* On affiche une ligne cliquable par leçon reçue de l'API */}
              {courses.map((course, i) => (
                <li key={course.course_id}>
                  <button
                    onClick={() => setActiveLesson(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeLesson === i ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-current mr-2 align-middle" />
                    {course.course_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main : contenu de la leçon actuellement sélectionnée */}
        <main className="flex-1 px-8 py-8 overflow-y-auto">
          {/* Cas 1 : on attend encore la réponse du serveur */}
          {loading && (
            <p className="text-sm text-gray-500">Chargement des leçons…</p>
          )}

          {/* Cas 2 : l'appel API a échoué */}
          {!loading && error && <p className="text-sm text-red-600">{error}</p>}

          {/* Cas 3 : l'appel a réussi mais ce module n'a aucune leçon en base */}
          {!loading && !error && courses.length === 0 && (
            <p className="text-sm text-gray-500">
              Aucune leçon trouvée pour ce module.
            </p>
          )}

          {/* Cas 4 : tout s'est bien passé, on affiche la leçon active */}
          {!loading && !error && courses.length > 0 && (
            <>
              {/* Title */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  Module {moduleId}
                </p>
                <h2 className="text-xl font-bold text-gray-900">
                  Leçon {activeLesson + 1} —{" "}
                  {courses[activeLesson]?.course_name}
                </h2>
              </div>

              <div className="flex gap-6 items-start">
                {/* Vidéo */}
                <div className="flex-1 min-w-0">
                  <div className="bg-black rounded-2xl aspect-video w-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />

                    <button className="relative w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center hover:bg-white/30">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </button>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={nextLesson}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2"
                    >
                      {activeLesson === courses.length - 1
                        ? "Commencer le quiz"
                        : "Leçon suivante"}

                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Description à droite */}
                <div className="w-80 flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-800 mb-3">
                    Description du cours
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    {lessonDetails[activeLesson]?.description}
                  </p>

                  <h3 className="font-bold text-gray-800 mb-3">
                    Objectifs pédagogiques
                  </h3>

                  <ul className="space-y-2 mb-5">
                    {lessonDetails[activeLesson]?.objectives.map(
                      (objective, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-500"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />

                          {objective}
                        </li>
                      ),
                    )}
                  </ul>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Durée</span>

                      <span className="font-semibold">
                        {lessonDetails[activeLesson]?.duration}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-3">
                      <span>Quiz final</span>

                      <span className="text-blue-600 font-semibold">
                        Inclus
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Screen 6 — Quiz ──────────────────────────────────────────────────────────
let quizResults: any[] = [];

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
  const [quizQuestions, setQuizQuestions] = useState<
    {
      q: string;
      question_id: number;
      choices: any[];
    }[]
  >([]);

  async function getQuestions() {
    try {
      const response = await fetch("http://localhost:5000/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          module_id: currentModule,
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
              <p className="font-semibold text-gray-800 text-sm mb-4">{q}</p>
              <div className="space-y-2.5">
                {choices.map(({ choice, choice_id }, ci) => (
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
              <p className="text-sm font-semibold text-gray-700 mb-2">
                {result.question}
              </p>
              <div className="flex items-start gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-700 font-medium">
                  {result.reponse_recue}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 pl-6">
                {result.reponse_correcte}
              </p>
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

interface Module {
  title: string;
  module_order: number;
}

const ROLE_MAP: Record<"accountant" | "booking", number> = {
  accountant: 2,
  booking: 1,
};

function ScreenManagerDashboard({
  user,
  onNavigate,
  onLogout,
}: {
  user: AppUser;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}) {
  const [roles, setRoles] = useState<any[]>([]);
  const [role, setRole] = useState("");

  const [progressions, setProgressions] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  // ==============================
  // RECUPERER LES ROLES
  // ==============================

  async function getStaff() {
    try {
      const response = await fetch("http://localhost:5000/getStaff");

      const data = await response.json();

      // garder seulement Accountant et Booking

      const filteredRoles = data.filter(
        (item: any) =>
          item.role_name === "Accountant" || item.role_name === "Booking Staff",
      );

      setRoles(filteredRoles);

      // mettre le premier rôle par défaut

      if (filteredRoles.length > 0) {
        setRole(filteredRoles[0].role_name);
      }
    } catch (error) {
      console.log("Erreur récupération rôles", error);
    }
  }

  // ==============================
  // RECUPERER LA PROGRESSION
  // ==============================

  async function getProgression() {
    if (role === "") return;

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/progression?role=${role}`,
      );

      const data = await response.json();

      console.log("Progression : ", data);

      setProgressions(data);
    } catch (error) {
      console.log("Erreur progression", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStaff();
  }, []);

  useEffect(() => {
    getProgression();
  }, [role]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavInternal
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        activeTab="dashboard"
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Tableau de bord Manager
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Suivi de progression des employés
          </p>
        </div>

        {/* FILTRE ROLE */}

        <div className="bg-white rounded-xl border p-5 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filtrer par rôle
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="
            border
            border-gray-200
            rounded-lg
            px-4
            py-2
            text-sm
            bg-gray-50
            "
          >
            {roles.map((item) => (
              <option key={item.role_id} value={item.role_name}>
                {item.role_name}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-gray-500">Chargement...</p>}

        <div className="space-y-5">
          {progressions.map((employee, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-xl
                border
                border-gray-100
                p-6
                "
            >
              <h2
                className="
                text-lg
                font-semibold
                text-gray-900
                "
              >
                {employee.user_name}
              </h2>

              <p
                className="
                text-sm
                text-gray-500
                mt-2
                "
              >
                Module actuel :
                <span
                  className="
                  ml-1
                  font-semibold
                  text-blue-600
                  "
                >
                  Module {employee.actual_module || 0}
                </span>
              </p>

              {/* PROGRESSION */}

              <div
                className="
                flex
                gap-2
                mt-5
                "
              >
                {Array.from({
                  length: employee.total_modules,
                }).map((_, i) => {
                  const completed = i + 1 < employee.actual_module;

                  return (
                    <span key={i} className="text-3xl">
                      {completed ? "●" : "○"}
                    </span>
                  );
                })}
              </div>

              <p
                className="
                text-xs
                text-gray-400
                mt-3
                "
              >
                {Math.max(employee.actual_module - 1, 0)}/
                {employee.total_modules}
                modules terminés
              </p>
            </div>
          ))}
        </div>
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
  const [user, setUser] = useState<any>(DEFAULT_USER);

  // Cette variable retient l'id du DERNIER module sur lequel l'agent a
  // cliqué "Consulter". C'est elle qui fait le lien entre l'écran
  // d'accueil (où on choisit un module) et l'écran de la leçon
  // (qui doit savoir quel module afficher).
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  function navigate(s: Screen) {
    setScreen(s);
    window.scrollTo(0, 0);
  }

  // Appelée quand l'agent clique sur "Consulter" pour un module précis :
  // on retient l'id du module, puis on va vers l'écran de la leçon.
  function openModule(moduleId: number) {
    setSelectedModuleId(moduleId);
    currentModule = moduleId;
    navigate("lesson");
  }

  function login(u: any) {
    setUser(u);
    currentUser = u.userId;
    navigate(homeScreen(u.profile));
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
      {screen === "agent-home" && (
        <ScreenAgentHome {...sharedProps} onOpenModule={openModule} />
      )}
      {screen === "lesson" && (
        <ScreenLesson {...sharedProps} moduleId={selectedModuleId} />
      )}
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
