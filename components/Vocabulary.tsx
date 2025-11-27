import React, { useState } from 'react';
import { Volume2, BookOpen, Youtube, Turtle, Zap, GraduationCap } from 'lucide-react';
import { speakInstant } from '../services/geminiService';
import { VOCAB_DATA, CATEGORIES } from '../data/vocabData';

const Vocabulary: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [isSlow, setIsSlow] = useState(false);

  const handlePlay = (id: string, textToSpeak: string) => {
    // Use Instant Native TTS with configurable speed
    // 0.5 for Slow Mode, 0.85 for Normal Mode
    const rate = isSlow ? 0.5 : 0.85;
    
    setPlayingWord(id);
    speakInstant(textToSpeak, 'en', rate);
    
    // Visual feedback reset
    setTimeout(() => setPlayingWord(null), 1000);
  };

  // Filter Logic: Grade -> Category
  const gradeFilteredData = selectedGrade === 'all' 
    ? VOCAB_DATA 
    : VOCAB_DATA.filter(v => v.grade === selectedGrade);
    
  const finalFilteredData = filter === 'all' 
    ? gradeFilteredData 
    : gradeFilteredData.filter(v => v.category === filter);

  const currentCategory = CATEGORIES.find(c => c.id === filter);
  const GRADES = [1, 2, 3, 4, 5, 6];

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-joy-purple/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-joy-purple mb-2 flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              單字寶典 (Word Bank)
            </h2>
            <p className="text-gray-600">
              {selectedGrade === 'all' ? '全年級' : `${selectedGrade} 年級`}單字練習
            </p>
          </div>
          
          {/* Speed Toggle */}
          <button
            onClick={() => setIsSlow(!isSlow)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold shadow-md transition-all border-2 ${
              isSlow 
              ? 'bg-green-100 text-green-700 border-green-300 ring-2 ring-green-200' 
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isSlow ? (
              <>
                <Turtle className="w-5 h-5 fill-current" />
                <span>慢速模式</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                <span>正常速度</span>
              </>
            )}
          </button>
        </div>

        {/* Grade Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-purple-50 rounded-2xl border border-purple-100">
          <div className="flex items-center gap-2 mr-4 text-joy-purple font-bold">
            <GraduationCap className="w-6 h-6" />
            <span className="hidden sm:inline">選擇年級:</span>
          </div>
          
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              selectedGrade === 'all'
              ? 'bg-joy-purple text-white shadow-md transform scale-105'
              : 'bg-white text-gray-500 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            全部
          </button>
          
          {GRADES.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${
                selectedGrade === g
                ? 'bg-joy-purple text-white shadow-md transform scale-105 ring-2 ring-purple-200'
                : 'bg-white text-gray-500 border border-purple-200 hover:bg-purple-100'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full font-bold text-sm sm:text-base transition-all transform hover:scale-105 flex items-center gap-2 ${
                filter === cat.id 
                ? 'bg-joy-yellow text-yellow-900 shadow-md scale-105 ring-2 ring-yellow-200' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {finalFilteredData.length > 0 ? (
            finalFilteredData.map((item) => (
              <div key={item.word} className="bg-white border-2 border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-2 right-2 flex gap-1">
                   <span className="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full font-bold">
                     G{item.grade}
                   </span>
                </div>
                
                <div className="flex justify-between items-start mb-2 mt-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 capitalize">{item.word}</h3>
                    <p className="text-joy-purple font-medium text-lg">{item.chinese}</p>
                  </div>
                  <button 
                    onClick={() => handlePlay(item.word, item.word)}
                    className="p-2 bg-joy-blue text-white rounded-full hover:bg-blue-400 transition-colors flex-shrink-0 transform active:scale-95"
                    title="聽發音"
                  >
                    <Volume2 className={`w-5 h-5 ${playingWord === item.word ? 'animate-pulse' : ''}`} />
                  </button>
                </div>

                <div className="mt-3 bg-gray-50 rounded-xl p-3 text-sm text-gray-600 flex justify-between items-center">
                  <span>{item.sentence}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // SMART FIX: Replace underscores with the actual word for smooth sentence reading
                      const fullSentence = item.sentence
                        .replace(/_+/g, item.word)
                        .replace(/(\b\w+\b)\s+\1\b/gi, '$1');
                      
                      handlePlay(item.word + '_sentence', fullSentence);
                    }}
                    className="text-joy-blue hover:text-joy-purple text-xs font-bold whitespace-nowrap ml-2 flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    Listen
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
               <p className="text-xl font-bold">這個分類在 {selectedGrade} 年級暫時沒有單字喔！</p>
               <p>試試看選別的年級或分類吧。</p>
            </div>
          )}
        </div>

        {/* Video Section */}
        {filter !== 'all' && currentCategory?.videos && currentCategory.videos.length > 0 && (
          <div className="mt-8 pt-8 border-t-2 border-gray-100 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
              <Youtube className="w-8 h-8 text-red-500" />
              相關學習影片 (Learning Videos)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentCategory.videos.map((video) => (
                <div key={video.id} className="group">
                  <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video relative">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${video.id}`} 
                      title={video.title} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                  <p className="mt-2 font-bold text-gray-600 text-center group-hover:text-joy-blue transition-colors">
                    {video.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Vocabulary;