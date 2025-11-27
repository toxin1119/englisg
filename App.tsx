import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Volume2, Book, Menu, X, Gamepad2 } from 'lucide-react';
import TextToSpeech from './components/TextToSpeech';
import Vocabulary from './components/Vocabulary';
import Game from './components/Game';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('vocab');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'vocab': return <Vocabulary />;
      case 'tts': return <TextToSpeech />;
      case 'game': return <Game />;
      default: return <Vocabulary />;
    }
  };

  const navItems = [
    { id: 'vocab', label: '單字寶典', icon: Book, color: 'text-joy-purple', bg: 'bg-joy-purple' },
    { id: 'game', label: '遊戲間', icon: Gamepad2, color: 'text-joy-yellow', bg: 'bg-joy-yellow' },
    { id: 'tts', label: '發音練習', icon: Volume2, color: 'text-joy-green', bg: 'bg-joy-green' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F9FF] font-sans text-slate-800">
      <Router>
        {/* Navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-joy-blue to-joy-purple rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transform rotate-3">
                  J
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl tracking-tight text-gray-800 leading-none">Joy English</span>
                  <span className="text-xs text-gray-500 font-bold">國小英文小老師</span>
                </div>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex space-x-4 items-center">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={`flex items-center px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                      activeTab === item.id 
                      ? `${item.bg} text-white shadow-md transform scale-105` 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-2 ${activeTab === item.id ? 'text-white' : item.color}`} />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 p-2">
                  {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 px-4 py-2 shadow-lg absolute w-full z-50">
               {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as Tab);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-xl font-bold mb-2 transition-colors ${
                      activeTab === item.id 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-500'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${item.bg} bg-opacity-20`}>
                       <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    {item.label}
                  </button>
                ))}
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {renderContent()}
        </main>
      </Router>
    </div>
  );
};

export default App;