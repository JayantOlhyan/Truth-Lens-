import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary relative overflow-hidden font-body flex flex-col">
      {/* Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent-teal/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-orb-float pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-purple/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-orb-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] bg-accent-pink/10 rounded-full blur-[100px] opacity-40 animate-orb-float pointer-events-none" style={{ animationDelay: '4s' }} />
      
      {/* SVG Noise Texture layer */}
      <div className="noise-overlay" />

      {/* Header */}
      <header className="relative z-50 w-full px-6 py-5 border-b border-white/5 bg-surface/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-teal to-accent-purple p-0.5 shadow-lg shadow-accent-teal/20">
              <div className="w-full h-full bg-surface rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-teal" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight">
              Truth<span className="text-gradient">Lens</span> AI
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-text-primary hover:text-accent-teal transition-colors">Analyzer</Link>
            <Link to="/history" className="text-text-muted hover:text-text-primary transition-colors">History</Link>
            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-5 py-2 rounded-full border border-white/10 hover:border-accent-teal/50 hover:bg-white/5 transition-all text-text-primary font-medium tracking-wide shadow-sm hover:shadow-accent-teal/20"
            >
              {isLoggedIn ? 'Sign Out' : 'Sign In'}
            </button>
          </nav>

          <button 
            className="md:hidden flex items-center justify-center p-2 text-text-primary bg-white/5 rounded-lg border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-white/5 py-6 px-6 flex flex-col gap-6 animate-fade-in z-50">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-text-primary">Analyzer</Link>
            <Link to="/history" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-text-muted">History</Link>
            <button 
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-center font-bold"
            >
              {isLoggedIn ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
        )}
      </header>

      {/* Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 mt-auto text-center border-t border-white/5 bg-surface/30 backdrop-blur-md">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} TruthLens AI. Hack Homies.
        </p>
      </footer>
    </div>
  );
}
