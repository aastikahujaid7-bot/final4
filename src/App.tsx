import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { VulnerabilityLabs } from './components/VulnerabilityLabs';
import { VulnerableStore } from './components/VulnerableStore';
import { SecurityTools } from './components/SecurityTools';
import { LearningPath } from './components/LearningPath';
import { Progress } from './components/Progress';
import { AIAssistant } from './components/AIAssistant';
import { ToolPage } from './components/ToolPage';
import { VoiceGuide } from './components/VoiceGuide';

function MainApp() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('labs');
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showVoiceGuide, setShowVoiceGuide] = useState(true);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto"></div>
          <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (authView === 'signup') {
      return <Signup onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <Login onSwitchToSignup={() => setAuthView('signup')} />;
  }

  const handleLabSelect = (labType: string) => {
    setSelectedLab(labType);
  };

  const handleCloseStore = () => {
    setSelectedLab(null);
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleCloseToolPage = () => {
    setSelectedTool(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'labs' && (
          <>
            <Dashboard />
            <div className="mt-8">
              <VulnerabilityLabs onLabSelect={handleLabSelect} />
            </div>
          </>
        )}

        {activeTab === 'tools' && <SecurityTools onToolSelect={handleToolSelect} />}
        {activeTab === 'learn' && <LearningPath />}
        {activeTab === 'progress' && <Progress />}
        {activeTab === 'assistant' && <AIAssistant />}
      </main>

      {selectedLab && (
        <VulnerableStore
          vulnerabilityType={selectedLab}
          onClose={handleCloseStore}
        />
      )}

      {selectedTool && (
        <ToolPage
          toolId={selectedTool}
          onClose={handleCloseToolPage}
        />
      )}

      {showVoiceGuide && (
        <VoiceGuide onClose={() => setShowVoiceGuide(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
