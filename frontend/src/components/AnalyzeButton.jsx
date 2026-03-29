import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

export default function AnalyzeButton({ onClick, isLoading, disabled, activeTab }) {
  const isImageMode = activeTab === 'image';
  
  return (
    <div className="w-full max-w-sm mt-8 mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={cn(
          "relative group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden",
          disabled && !isLoading
            ? "bg-surface border border-white/5 text-text-muted cursor-not-allowed"
            : cn(
                "text-[#000] shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                isImageMode 
                  ? "bg-gradient-to-r from-accent-purple to-accent-pink shadow-accent-purple/20 hover:shadow-accent-purple/40" 
                  : "bg-gradient-to-r from-accent-teal to-accent-purple shadow-accent-teal/20 hover:shadow-accent-teal/40"
              )
        )}
      >
        {/* Glow effect box shadow overlay */}
        {!(disabled || isLoading) && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20" />
        )}

        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing {isImageMode ? 'Image' : 'Context'}...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Verify Authenticity</span>
          </>
        )}
      </button>
    </div>
  );
}
