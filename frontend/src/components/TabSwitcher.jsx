import { FileText, Image as ImageIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export default function TabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 bg-surface/50 backdrop-blur-md rounded-2xl border border-white/5 mx-auto w-full max-w-sm mb-8 shadow-inner z-10 relative gap-2 sm:gap-0">
      <button
        onClick={() => setActiveTab('text')}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300",
          activeTab === 'text' 
            ? "bg-white/10 text-accent-teal shadow-lg shadow-accent-teal/10 border border-accent-teal/20" 
            : "text-text-muted hover:text-text-primary hover:bg-white/5"
        )}
      >
        <FileText className="w-4 h-4" />
        <span className="text-sm shrink-0">Text / News</span>
      </button>
      <button
        onClick={() => setActiveTab('image')}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300",
          activeTab === 'image' 
            ? "bg-white/10 text-accent-purple shadow-lg shadow-accent-purple/10 border border-accent-purple/20" 
            : "text-text-muted hover:text-text-primary hover:bg-white/5"
        )}
      >
        <ImageIcon className="w-4 h-4" />
        <span className="text-sm shrink-0">Image / Media</span>
      </button>
    </div>
  );
}
