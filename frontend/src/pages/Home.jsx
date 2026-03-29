import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TabSwitcher from '../components/TabSwitcher';
import TextInputArea from '../components/TextInputArea';
import ImageUploadArea from '../components/ImageUploadArea';
import AnalyzeButton from '../components/AnalyzeButton';
import ResultsPanel from '../components/ResultsPanel';

export default function Home() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('text');
  const [textModeInput, setTextModeInput] = useState("");
  const [imageModeInput, setImageModeInput] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Reset state when navigating to home (including clicks on active route)
  useEffect(() => {
    handleReset();
  }, [location.key]);

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    setResult(null); // Reset result on switch
    setError(null);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      if (activeTab === 'text') {
        const res = await fetch('http://localhost:5050/api/v1/analyze/text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: textModeInput })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to analyze text');
        setResult(data);
      } else {
        const formData = new FormData();
        formData.append('image', imageModeInput.file);
        
        const res = await fetch('http://localhost:5050/api/v1/analyze/image', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to analyze image');
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect to backend service.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setTextModeInput("");
    setImageModeInput(null);
    setError(null);
  };

  const isEvaluateDisabled = activeTab === 'text' 
    ? textModeInput.trim().length < 20 
    : imageModeInput === null;

  return (
    <div className="flex flex-col items-center justify-start h-full pt-12 pb-24 relative z-10 w-full">
      {/* Hero Section */}
      {!result && (
        <div className="w-full max-w-2xl text-center mb-10 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
            Verify the <span className="text-gradient">Unknown.</span>
          </h2>
          <p className="text-text-muted text-lg font-medium">
            Detect fake news, deepfake images, and AI-generated<br className="hidden sm:block" /> misinformation instantly with our multi-modal engine.
          </p>
        </div>
      )}

      {result ? (
        <ResultsPanel result={result} onReset={handleReset} />
      ) : (
        <div className="w-full max-w-3xl flex flex-col items-center">
          <TabSwitcher activeTab={activeTab} setActiveTab={handleSwitchTab} />
          
          <div className="w-full relative z-10">
            {activeTab === 'text' ? (
              <TextInputArea text={textModeInput} setText={setTextModeInput} />
            ) : (
              <ImageUploadArea image={imageModeInput} setImage={setImageModeInput} />
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 w-full max-w-sm rounded-lg border border-danger/20 bg-danger/10 text-danger text-sm font-medium text-center animate-fade-up">
              {error}
            </div>
          )}

          <AnalyzeButton 
            onClick={handleAnalyze} 
            isLoading={isAnalyzing} 
            disabled={isEvaluateDisabled}
            activeTab={activeTab}
          />
        </div>
      )}
    </div>
  );
}
