import TrustMeter from './TrustMeter';
import { AlertTriangle, CheckCircle, Tag, Lightbulb } from 'lucide-react';
import { cn } from '../utils/cn';

export default function ResultsPanel({ result, onReset }) {
  if (!result) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-up">
      {/* Top Section: Trust Meter & Summary */}
      <div className="glass-panel p-8 grid md:grid-cols-3 gap-8 items-center relative overflow-hidden">
        <div className="md:col-span-1 border-r border-white/5 pr-4 flex justify-center">
          <TrustMeter score={result.trustScore} verdict={result.verdict} />
        </div>
        <div className="md:col-span-2 space-y-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-text-muted flex items-center gap-1.5 opacity-90">
              <Tag className="w-3 h-3" />
              {result.claimType}
            </span>
          </div>
          <h3 className="text-2xl font-display font-bold">Analysis Summary</h3>
          <p className="text-text-primary/90 leading-relaxed text-lg">
            {result.summary}
          </p>
        </div>
      </div>

      {/* Grid: Red Flags & Positive Signals */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border-danger/20 border-t-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-danger/5 rounded-bl-[100px] pointer-events-none group-hover:bg-danger/10 transition-colors" />
          <h4 className="flex items-center gap-2 text-xl font-display font-bold text-danger mb-4">
            <AlertTriangle className="w-5 h-5" />
            Red Flags
          </h4>
          <ul className="space-y-3">
            {result.redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-text-primary/80 bg-danger/5 p-3 rounded-lg border border-danger/10">
                <span className="text-danger mt-0.5">•</span>
                {flag}
              </li>
            ))}
            {result.redFlags.length === 0 && <p className="text-text-muted text-sm italic">No red flags detected.</p>}
          </ul>
        </div>
        
        <div className="glass-panel p-6 border-success/20 border-t-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-[100px] pointer-events-none group-hover:bg-success/10 transition-colors" />
          <h4 className="flex items-center gap-2 text-xl font-display font-bold text-success mb-4">
            <CheckCircle className="w-5 h-5" />
            Positive Signals
          </h4>
          <ul className="space-y-3">
            {result.positiveSignals.map((signal, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-text-primary/80 bg-success/5 p-3 rounded-lg border border-success/10">
                <span className="text-success mt-0.5">✓</span>
                {signal}
              </li>
            ))}
            {result.positiveSignals.length === 0 && <p className="text-text-muted text-sm italic">No positive signals detected.</p>}
          </ul>
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="glass-panel p-6 border-warning/20 border-l-4 flex items-start gap-4 bg-warning/5">
        <div className="p-3 bg-warning/20 rounded-full">
          <Lightbulb className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-warning mb-1">Recommendation</h4>
          <p className="text-text-primary">{result.recommendation}</p>
        </div>
      </div>

      {/* Reset Action */}
      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="px-8 py-3 rounded-full border border-white/10 hover:border-text-muted hover:bg-white/5 transition-all text-text-primary font-medium tracking-wide"
        >
          Analyze Something Else
        </button>
      </div>
    </div>
  );
}
