import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  const isAbout = pathname === "/about";

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 py-8 sm:py-12">
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <Link to="/" className="no-underline">
          <h1 className="font-arcade text-[11px] sm:text-[14px] text-accent tracking-wide mb-6 sm:mb-8 select-none cursor-pointer">
            Mazier
          </h1>
        </Link>

        <Outlet />
      </div>

      <footer className="mt-10 pt-4 border-t border-ink/10 w-full max-w-[520px] text-center">
        <p className="text-[11px] font-mono text-muted">
          &copy; {new Date().getFullYear()} Sihilel H &middot;{" "}
          <Link
            to={isAbout ? "/" : "/about"}
            className="text-muted hover:text-accent transition-colors duration-150"
          >
            {isAbout ? "Home" : "About"}
          </Link>
          {" "}&middot;{" "}
          <a
            href="https://github.com/sihilelh/mazier"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors duration-150"
          >
            Source
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
