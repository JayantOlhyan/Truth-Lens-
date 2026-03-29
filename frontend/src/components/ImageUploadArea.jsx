import { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '../utils/cn';

export default function ImageUploadArea({ image, setImage }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError("Unsupported file type. Use JPG, PNG, or WEBP.");
      return;
    }
    
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage({
        file,
        previewUrl: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  if (image) {
    return (
      <div className="w-full relative animate-fade-up">
        <div className="w-full h-[220px] glass-panel p-2 flex items-center justify-center overflow-hidden group">
          <img src={image.previewUrl} alt="Preview" className="max-h-[200px] object-contain rounded-xl" />
          <div className="absolute inset-2 rounded-xl bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <label className="cursor-pointer px-4 py-2 bg-surface border border-white/10 rounded-full text-sm font-medium hover:border-accent-purple/50 hover:bg-white/5 transition-all text-text-primary shadow-lg shadow-black/50">
              Click to change
              <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
            </label>
            <button
              onClick={() => setImage(null)}
              className="absolute top-4 right-4 p-2 bg-surface/80 rounded-full hover:bg-danger/20 hover:text-danger border border-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative animate-fade-up">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "w-full h-[220px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300",
          isDragging
            ? "border-accent-purple bg-accent-purple/5"
            : "border-white/10 bg-surface/40 hover:border-accent-purple/50 hover:bg-surface/60"
        )}
      >
        <div className="w-16 h-16 rounded-full bg-surface/80 flex items-center justify-center mb-4 border border-white/5 shadow-inner">
          <UploadCloud className={cn("w-8 h-8", isDragging ? "text-accent-purple" : "text-text-muted")} />
        </div>
        <p className="text-lg font-medium text-text-primary mb-1">
          Drag & drop image here
        </p>
        <p className="text-sm text-text-muted mb-4">
          or click to browse from device
        </p>
        <span className="text-xs font-semibold text-text-muted/60 tracking-wider">
          JPG, PNG, WEBP (Max 10MB)
        </span>
        <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} />
      </label>
      {error && <p className="text-danger text-sm mt-3 font-medium text-center">{error}</p>}
    </div>
  );
}
