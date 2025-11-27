import React, { useState } from 'react';
import { Play, Speaker, Languages } from 'lucide-react';
import { speakInstant } from '../services/geminiService';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSpeak = () => {
    if (!text.trim()) return;
    setLoading(true);
    
    // Use native TTS
    speakInstant(text, 'en', 0.85);

    // Simulate a small delay for visual feedback
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border-4 border-joy-green/20 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 text-joy-green">
          <div className="p-3 bg-joy-green/10 rounded-full">
             <Speaker className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold">發音練習 (Speak & Listen)</h2>
        </div>
        
        <p className="text-gray-600 mb-6 text-lg">
          輸入任何英文句子，我會唸給你聽，教你最標準的發音喔！
        </p>

        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="在這裡輸入英文... (例如: I go to school by bus.)"
            className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-joy-green focus:outline-none resize-none text-xl h-32 shadow-inner"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSpeak}
              disabled={loading || !text.trim()}
              className="flex items-center gap-2 bg-joy-green hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
              聽聽看
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-10 bg-green-50 rounded-2xl p-5 border border-green-100">
          <h3 className="font-bold text-green-800 flex items-center gap-2 mb-3">
            <Languages className="w-5 h-5" />
            每日練習小撇步
          </h3>
          <ul className="list-disc list-inside text-green-700 space-y-2">
            <li>試著問候朋友: "How are you?"</li>
            <li>形容今天的天氣: "It is rainy today."</li>
            <li>聊聊喜歡的食物: "I like ice cream."</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;