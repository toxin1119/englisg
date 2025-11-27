import React, { useState } from 'react';
import { Gamepad2, Trophy, RotateCcw, Check, HelpCircle, BrainCircuit, PenTool, Volume2, Keyboard, Link as LinkIcon, Target, GraduationCap } from 'lucide-react';
import { VOCAB_DATA } from '../data/vocabData';
import { VocabWord } from '../types';
import { speakInstant } from '../services/geminiService';

type GameMode = 'MENU' | 'MATCH' | 'QUIZ' | 'FILL' | 'SPELL' | 'ASSOCIATION';
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'SENTENCE';

type MatchCard = {
  id: number;
  content: string;
  type: 'en' | 'zh';
  wordRef: VocabWord;
  isFlipped: boolean;
  isMatched: boolean;
};

type SpellLetter = {
  id: string;
  char: string;
  isUsed: boolean;
};

const Game: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('MENU');
  const [score, setScore] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all'); // NEW: Grade selection for game
  
  // Spelling Game Specific State
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [spellingStats, setSpellingStats] = useState({ perfect: 0, total: 0 });
  const [currentMistakes, setCurrentMistakes] = useState(0);
  const [spellingTarget, setSpellingTarget] = useState(''); // The actual text to spell (word or sentence)

  // Match Game State
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MatchCard[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mismatchIds, setMismatchIds] = useState<number[]>([]);
  const [tempMatchIds, setTempMatchIds] = useState<number[]>([]);

  // Quiz/Fill/Association Game State
  const [currentQuestion, setCurrentQuestion] = useState<VocabWord | null>(null);
  const [targetAnswer, setTargetAnswer] = useState<string | null>(null); // For Association mode
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Spelling Game State
  const [shuffledLetters, setShuffledLetters] = useState<SpellLetter[]>([]);
  const [userSpelling, setUserSpelling] = useState<SpellLetter[]>([]);

  const playSound = (text: string) => {
    // Use the new instant offline TTS
    speakInstant(text);
  };

  // Helper to filter data by grade
  const getGameData = () => {
    if (selectedGrade === 'all') return VOCAB_DATA;
    return VOCAB_DATA.filter(w => w.grade === selectedGrade);
  };

  // --- Match Game Logic ---
  const startMatchGame = () => {
    const pool = getGameData();
    // Fallback if pool is too small (should be rare)
    const dataToUse = pool.length >= 6 ? pool : VOCAB_DATA;
    
    // Select 6 random pairs
    const shuffledVocab = [...dataToUse].sort(() => 0.5 - Math.random()).slice(0, 6);
    const gameCards: MatchCard[] = [];
    
    shuffledVocab.forEach((word, index) => {
      gameCards.push({
        id: index * 2,
        content: word.word,
        type: 'en',
        wordRef: word,
        isFlipped: false,
        isMatched: false
      });
      gameCards.push({
        id: index * 2 + 1,
        content: word.chinese,
        type: 'zh',
        wordRef: word,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(gameCards.sort(() => 0.5 - Math.random()));
    setScore(0);
    setMismatchIds([]);
    setTempMatchIds([]);
    setMode('MATCH');
  };

  const handleCardClick = (clickedCard: MatchCard) => {
    if (isProcessing || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Play sound if it's an English card
    if (clickedCard.type === 'en') {
      playSound(clickedCard.wordRef.word);
    }

    const newCards = cards.map(c => 
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [card1, card2] = newFlipped;
      
      // Check match
      if (card1.wordRef.word === card2.wordRef.word) {
        // Match!
        setTempMatchIds([card1.id, card2.id]); // Show visual success cue
        
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.wordRef.word === card1.wordRef.word ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setTempMatchIds([]);
          setIsProcessing(false);
          setScore(s => s + 10);
          // Success sound could go here
        }, 600);
      } else {
        // No Match
        setMismatchIds([card1.id, card2.id]);
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === card1.id || c.id === card2.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setMismatchIds([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  // --- Quiz/Fill/Association Logic ---
  const startGame = (gameMode: 'QUIZ' | 'FILL' | 'SPELL' | 'ASSOCIATION') => {
    setScore(0);
    setMode(gameMode);
    
    // Reset stats for spelling
    if (gameMode === 'SPELL') {
      setSpellingStats({ perfect: 0, total: 0 });
      setDifficulty('EASY'); // Default start difficulty
      nextQuestion(gameMode, 'EASY');
    } else {
      nextQuestion(gameMode);
    }
  };

  const changeDifficulty = (newDiff: Difficulty) => {
    if (mode !== 'SPELL') return;
    setDifficulty(newDiff);
    // Immediately get a new question with the new difficulty
    nextQuestion('SPELL', newDiff);
  };

  const nextQuestion = (currentMode: 'QUIZ' | 'FILL' | 'SPELL' | 'ASSOCIATION', specificDiff?: Difficulty) => {
    setFeedback(null);
    setTargetAnswer(null);

    // Get the filtered pool based on selected Grade
    let basePool = getGameData();
    // Safety check: if pool is empty (e.g. no words for that grade), fallback to all
    if (basePool.length < 2) basePool = VOCAB_DATA;

    if (currentMode === 'ASSOCIATION') {
      // 1. Pick a random category that has at least 2 words WITHIN the current grade pool
      const categories = Array.from(new Set(basePool.map(w => w.category)));
      let selectedCategory = '';
      let categoryWords: VocabWord[] = [];
      
      // Try to find a valid category
      for (let i = 0; i < 10; i++) {
        selectedCategory = categories[Math.floor(Math.random() * categories.length)];
        categoryWords = basePool.filter(w => w.category === selectedCategory);
        if (categoryWords.length >= 2) break;
      }
      
      // Fallback if strict grade filtering results in too few related words
      // Try searching whole database if grade specific fail
      if (categoryWords.length < 2) {
         basePool = VOCAB_DATA;
         const allCats = Array.from(new Set(basePool.map(w => w.category)));
         selectedCategory = allCats[Math.floor(Math.random() * allCats.length)];
         categoryWords = basePool.filter(w => w.category === selectedCategory);
      }

      // 2. Pick Question Word and Correct Answer Word from same category
      const shuffledCatWords = [...categoryWords].sort(() => 0.5 - Math.random());
      const qWord = shuffledCatWords[0];
      const aWord = shuffledCatWords[1];
      
      setCurrentQuestion(qWord);
      setTargetAnswer(aWord.word);
      playSound(qWord.word);

      // 3. Pick 3 distractors from OTHER categories
      // Distractors can come from the full database to ensure variety
      const otherWords = VOCAB_DATA.filter(w => w.category !== selectedCategory);
      const distractors = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);

      // 4. Set options
      const allOptions = [aWord.word, ...distractors.map(d => d.word)].sort(() => 0.5 - Math.random());
      setOptions(allOptions);
      return;
    }

    // Standard Logic for QUIZ, FILL, SPELL
    let pool = basePool;

    if (currentMode === 'SPELL') {
      const diffToUse = specificDiff || difficulty;
      let targetText = '';

      if (diffToUse === 'SENTENCE') {
        // For Sentence mode, use filtered pool
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        setCurrentQuestion(randomWord);
        // Construct the full sentence
        targetText = randomWord.sentence
          .replace(/_+/g, randomWord.word)
          .replace(/(\b\w+\b)\s+\1\b/gi, '$1');
      } else {
        // Filter based on word length/complexity within the grade pool
        if (diffToUse === 'EASY') {
          pool = basePool.filter(w => w.word.replace(/\s/g, '').length <= 4);
        } else if (diffToUse === 'MEDIUM') {
          pool = basePool.filter(w => {
            const len = w.word.replace(/\s/g, '').length;
            return len >= 5 && len <= 7;
          });
        } else if (diffToUse === 'HARD') {
          pool = basePool.filter(w => w.word.replace(/\s/g, '').length > 7);
        }
        
        // Fallback if pool is empty for that difficulty
        if (pool.length === 0) pool = basePool;
        
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        setCurrentQuestion(randomWord);
        targetText = randomWord.word;
      }

      setSpellingTarget(targetText);
      playSound(targetText);
      setCurrentMistakes(0); // Reset mistakes
      
      // Remove spaces AND punctuation for the letter pool
      // Only require user to spell alpha-numeric characters
      const alphaNumeric = targetText.replace(/[^a-zA-Z0-9]/g, '');
      const chars = alphaNumeric.split('');
      
      const lettersObj = chars.map((char, i) => ({
        id: `${char}-${i}-${Date.now()}`,
        char: char,
        isUsed: false
      }));
      setShuffledLetters(lettersObj.sort(() => 0.5 - Math.random()));
      setUserSpelling([]);
      return;
    }

    // Quiz / Fill Logic
    const randomWord = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(randomWord);

    // Generate 3 wrong answers (Distractors can be from ANY grade to make it properly challenging/random)
    const wrongOptions = VOCAB_DATA
      .filter(w => w.word !== randomWord.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
      
    if (currentMode === 'QUIZ') {
      const allOptions = [...wrongOptions.map(w => w.chinese), randomWord.chinese].sort(() => 0.5 - Math.random());
      setOptions(allOptions);
      playSound(randomWord.word);
    } else {
      // FILL MODE
      const allOptions = [...wrongOptions.map(w => w.word), randomWord.word].sort(() => 0.5 - Math.random());
      setOptions(allOptions);
    }
  };

  const handleOptionClick = (selectedOption: string) => {
    if (feedback || !currentQuestion) return;

    let isCorrect = false;
    
    if (mode === 'QUIZ') {
      isCorrect = selectedOption === currentQuestion.chinese;
    } else if (mode === 'FILL') {
      isCorrect = selectedOption === currentQuestion.word;
    } else if (mode === 'ASSOCIATION') {
      isCorrect = selectedOption === targetAnswer;
    }

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 10);
      
      // Audio feedback based on mode
      let transitionDelay = 2000;

      if (mode === 'FILL') {
        let fullSentence = currentQuestion.sentence.replace(/_+/g, currentQuestion.word);
        // Fix potential duplicates from data (e.g. "get up up" -> "get up")
        fullSentence = fullSentence.replace(/(\b\w+\b)\s+\1\b/gi, '$1');
        
        // Play word... then sentence
        playSound(`${currentQuestion.word}... ${fullSentence}`);
        
        // Increase delay to ensure sentence finishes playing
        transitionDelay = 3500;
      } else if (mode === 'ASSOCIATION') {
        // Play the pair: "Sun. Rain."
        playSound(`${currentQuestion.word}. ${selectedOption}.`);
      } else {
        playSound(currentQuestion.word);
      }
      
      setTimeout(() => nextQuestion(mode as any), transitionDelay);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  // --- Spelling Game Logic ---
  const handleSpellClick = (letterObj: SpellLetter) => {
    if (feedback === 'correct') return;

    // Add to user spelling
    const newSpelling = [...userSpelling, letterObj];
    setUserSpelling(newSpelling);

    // Mark as used in pool
    setShuffledLetters(prev => prev.map(l => l.id === letterObj.id ? { ...l, isUsed: true } : l));

    // Check if complete
    // We strictly compare alphanumeric characters only
    const targetAlphaNumeric = spellingTarget.replace(/[^a-zA-Z0-9]/g, '');
    const currentLength = newSpelling.length;
    
    if (currentLength === targetAlphaNumeric.length) {
      const spelledWord = newSpelling.map(l => l.char).join('');
      
      if (spelledWord.toLowerCase() === targetAlphaNumeric.toLowerCase()) {
        // Correct Spelling
        setFeedback('correct');
        setScore(s => s + (difficulty === 'SENTENCE' ? 25 : 15)); // More points for sentences
        
        // Update Stats
        setSpellingStats(prev => ({
          total: prev.total + 1,
          perfect: prev.perfect + (currentMistakes === 0 ? 1 : 0)
        }));

        playSound(`${spellingTarget}. Excellent!`);
        setTimeout(() => nextQuestion('SPELL'), 2500);
      } else {
        // Wrong Spelling
        setFeedback('wrong');
        setCurrentMistakes(prev => prev + 1);
        
        // Reset after delay
        setTimeout(() => {
          setFeedback(null);
          setUserSpelling([]);
          setShuffledLetters(prev => prev.map(l => ({ ...l, isUsed: false })));
        }, 1000);
      }
    }
  };

  const handleUndoSpell = () => {
    if (userSpelling.length === 0 || feedback) return;
    
    const lastLetter = userSpelling[userSpelling.length - 1];
    setUserSpelling(prev => prev.slice(0, -1));
    setShuffledLetters(prev => prev.map(l => l.id === lastLetter.id ? { ...l, isUsed: false } : l));
  };

  // Helper to render sentence with blank
  const getSentenceWithBlank = (sentence: string, word: string) => {
    const parts = sentence.split(new RegExp(`(${word})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === word.toLowerCase() 
      ? <span key={i} className="inline-block w-24 border-b-4 border-joy-blue mx-1"></span> 
      : <span key={i}>{part}</span>
    );
  };

  // Stats Helper
  const getAccuracy = () => {
    if (spellingStats.total === 0) return 0;
    return Math.round((spellingStats.perfect / spellingStats.total) * 100);
  };

  const GRADES = [1, 2, 3, 4, 5, 6];

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-[600px]">
      <div className="bg-white rounded-3xl shadow-xl border-4 border-joy-yellow/50 overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Header */}
        <div className="bg-joy-yellow p-4 flex justify-between items-center text-yellow-900 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-8 h-8" />
            <h2 className="text-2xl font-bold">遊戲間 (Game Room)</h2>
          </div>
          {mode !== 'MENU' && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full font-bold">
                <Trophy className="w-4 h-4 text-orange-600" />
                <span>{score}</span>
              </div>
              <button onClick={() => setMode('MENU')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {/* Menu */}
        {mode === 'MENU' && (
          <div className="flex-1 flex flex-col items-center p-8 gap-6 animate-fade-in">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-700 mb-2">準備好挑戰了嗎？</h3>
              <p className="text-gray-500">選擇年級，開始玩遊戲！</p>
            </div>
            
            {/* Grade Selector for Game */}
            <div className="flex flex-wrap items-center justify-center gap-3 bg-yellow-50 p-4 rounded-2xl border border-yellow-100 w-full max-w-2xl">
              <div className="flex items-center gap-2 text-yellow-800 font-bold mr-2">
                <GraduationCap className="w-6 h-6" />
                年級:
              </div>
              
              <button
                onClick={() => setSelectedGrade('all')}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  selectedGrade === 'all'
                  ? 'bg-joy-yellow text-yellow-900 shadow-md transform scale-105 ring-2 ring-yellow-300'
                  : 'bg-white text-gray-500 border border-yellow-200 hover:bg-yellow-100'
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
                    ? 'bg-joy-yellow text-yellow-900 shadow-md transform scale-105 ring-2 ring-yellow-300'
                    : 'bg-white text-gray-500 border border-yellow-200 hover:bg-yellow-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-4">
              <button 
                onClick={startMatchGame}
                className="bg-joy-blue hover:bg-blue-400 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-6 group w-full"
              >
                <div className="p-4 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform flex-shrink-0">
                  <BrainCircuit className="w-10 h-10" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">單字配對</div>
                  <div className="opacity-90">翻牌記憶遊戲</div>
                </div>
              </button>

              <button 
                onClick={() => startGame('QUIZ')}
                className="bg-joy-green hover:bg-green-600 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-6 group w-full"
              >
                <div className="p-4 bg-white/20 rounded-2xl group-hover:-rotate-12 transition-transform flex-shrink-0">
                  <HelpCircle className="w-10 h-10" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">單字挑戰</div>
                  <div className="opacity-90">聽英文選中文</div>
                </div>
              </button>

              <button 
                onClick={() => startGame('FILL')}
                className="bg-joy-pink hover:bg-pink-600 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-6 group w-full"
              >
                <div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                  <PenTool className="w-10 h-10" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">句子填空</div>
                  <div className="opacity-90">選出缺少的字</div>
                </div>
              </button>

              <button 
                onClick={() => startGame('SPELL')}
                className="bg-joy-purple hover:bg-purple-600 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-6 group w-full"
              >
                <div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                  <Keyboard className="w-10 h-10" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">拼字練習</div>
                  <div className="opacity-90">聽音拼單字 (含句子)</div>
                </div>
              </button>

              <button 
                onClick={() => startGame('ASSOCIATION')}
                className="bg-orange-400 hover:bg-orange-500 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-6 group w-full md:col-span-2"
              >
                <div className="p-4 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform flex-shrink-0">
                  <LinkIcon className="w-10 h-10" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">單字聯想</div>
                  <div className="opacity-90">找出相關的字</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Match Game UI */}
        {mode === 'MATCH' && (
          <div className="flex-1 p-6 bg-yellow-50/50 flex items-center justify-center">
             <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full max-w-2xl">
               {cards.map(card => {
                 const isMismatch = mismatchIds.includes(card.id);
                 const isTempMatch = tempMatchIds.includes(card.id);
                 return (
                 <button
                   key={card.id}
                   onClick={() => handleCardClick(card)}
                   className={`aspect-square rounded-xl text-lg font-bold shadow-md transition-all duration-500 transform perspective-1000 border-b-4 ${
                     card.isFlipped || card.isMatched 
                     ? (isMismatch 
                         ? 'bg-red-50 text-red-500 rotate-y-180 border-red-300 ring-4 ring-red-200' 
                         : isTempMatch
                           ? 'bg-green-50 text-green-600 rotate-y-180 border-green-500 ring-4 ring-green-200'
                           : 'bg-white text-joy-purple rotate-y-180 border-gray-200'
                       )
                     : 'bg-joy-yellow border-yellow-500 text-transparent hover:bg-yellow-400'
                   }`}
                   disabled={card.isMatched}
                 >
                   <div className="w-full h-full flex items-center justify-center p-2 text-center leading-tight select-none">
                     {(card.isFlipped || card.isMatched) ? (
                       <span className="animate-fade-in">{card.content}</span>
                     ) : (
                       <span className="text-4xl opacity-50">?</span>
                     )}
                   </div>
                 </button>
               )})}
             </div>
             {cards.every(c => c.isMatched) && cards.length > 0 && (
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-20">
                 <div className="bg-white p-8 rounded-3xl text-center animate-bounce shadow-2xl border-4 border-joy-yellow">
                   <h3 className="text-4xl font-bold text-joy-green mb-2">太棒了！ 🎉</h3>
                   <p className="text-gray-600 mb-6 text-xl">你完成了所有配對！</p>
                   <button onClick={startMatchGame} className="px-8 py-3 bg-joy-purple hover:bg-purple-600 text-white rounded-full font-bold shadow-lg text-lg transition-colors">再玩一次</button>
                 </div>
               </div>
             )}
          </div>
        )}

        {/* Quiz, Fill, Association Game UI */}
        {(mode === 'QUIZ' || mode === 'FILL' || mode === 'ASSOCIATION') && currentQuestion && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-yellow-50/50 relative">
            
            {/* Question Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center mb-8 w-full max-w-lg relative overflow-hidden border-b-4 border-gray-200">
              <div className="absolute top-0 left-0 w-full h-3 bg-joy-green"></div>
              
              <h3 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-4">
                {mode === 'QUIZ' && '這個中文是什麼？'}
                {mode === 'FILL' && '填入正確的單字：'}
                {mode === 'ASSOCIATION' && '哪一個字跟它有關聯？'}
              </h3>
              
              {mode === 'QUIZ' || mode === 'ASSOCIATION' ? (
                <div className="mb-4">
                   <div className="text-5xl font-bold text-joy-blue mb-1">{currentQuestion.word}</div>
                   {/* Hide Chinese for QUIZ mode to avoid giving away the answer */}
                   {mode !== 'QUIZ' && (
                     <div className="text-xl text-gray-400 font-medium">({currentQuestion.chinese})</div>
                   )}
                </div>
              ) : (
                <div className="text-2xl font-medium text-gray-800 mb-4 leading-relaxed">
                  {getSentenceWithBlank(currentQuestion.sentence, currentQuestion.word)}
                </div>
              )}

              {/* Hints / Audio */}
              {mode === 'FILL' && (
                <div className="text-joy-purple font-bold text-lg mb-2">
                  (提示: {currentQuestion.chinese})
                </div>
              )}
              
              {/* Replay Audio Button */}
              <button 
                 onClick={() => playSound(currentQuestion.word)}
                 className="mx-auto w-12 h-12 bg-gray-100 hover:bg-joy-blue hover:text-white rounded-full flex items-center justify-center text-gray-500 transition-all"
                 title="再聽一次"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  disabled={feedback !== null}
                  className={`p-5 rounded-2xl text-xl font-bold shadow-md border-2 transition-all transform hover:scale-105 active:scale-95 ${
                    // Correct State
                    (feedback === 'correct' && (
                       (mode === 'QUIZ' && opt === currentQuestion.chinese) || 
                       (mode === 'FILL' && opt === currentQuestion.word) ||
                       (mode === 'ASSOCIATION' && opt === targetAnswer)
                    ))
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : (feedback === 'wrong' && (
                          (mode === 'QUIZ' && opt !== currentQuestion.chinese) || 
                          (mode === 'FILL' && opt !== currentQuestion.word) ||
                          (mode === 'ASSOCIATION' && opt !== targetAnswer)
                        ) && feedback)
                      ? 'bg-white border-gray-200 text-gray-400 opacity-50'
                      : 'bg-white border-gray-200 hover:border-joy-blue text-gray-700 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {opt}
                    {feedback === 'correct' && (
                       (mode === 'QUIZ' && opt === currentQuestion.chinese) || 
                       (mode === 'FILL' && opt === currentQuestion.word) ||
                       (mode === 'ASSOCIATION' && opt === targetAnswer)
                    ) && <Check className="w-6 h-6" />}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Feedback Overlay */}
            {feedback === 'correct' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-8xl animate-ping">🌟</div>
              </div>
            )}
          </div>
        )}

        {/* Spelling Game UI */}
        {mode === 'SPELL' && currentQuestion && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-yellow-50/50 relative overflow-y-auto">
            
            {/* Difficulty & Stats Bar */}
            <div className="w-full max-w-2xl flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-3 rounded-2xl shadow-sm gap-2">
              <div className="flex flex-wrap justify-center gap-2">
                {(['EASY', 'MEDIUM', 'HARD', 'SENTENCE'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => changeDifficulty(d)}
                    className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                      difficulty === d 
                      ? 'bg-joy-purple text-white shadow-md' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {d === 'EASY' ? '簡單' : d === 'MEDIUM' ? '中等' : d === 'HARD' ? '困難' : '句子'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm font-bold">
                <Target className="w-4 h-4 text-joy-green" />
                準確率: <span className="text-joy-green text-lg">{getAccuracy()}%</span>
              </div>
            </div>

            {/* Question Info */}
             <div className="mb-6 text-center">
               <button 
                 onClick={() => playSound(spellingTarget)}
                 className="w-16 h-16 bg-joy-purple text-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform"
               >
                 <Volume2 className="w-8 h-8" />
               </button>
               <p className="text-lg font-bold text-gray-600">
                 {difficulty === 'SENTENCE' ? '拼出完整的句子' : `中文提示: ${currentQuestion.chinese}`}
               </p>
               {difficulty === 'SENTENCE' && (
                 <p className="text-sm text-joy-blue mt-1">
                   ({currentQuestion.chinese})
                 </p>
               )}
             </div>

             {/* Answer Slots */}
             <div className="flex flex-wrap justify-center gap-1.5 mb-10 min-h-[50px] max-w-3xl">
               {/* Render characters */}
               {spellingTarget.split('').map((char, index) => {
                 // Check if it's alphanumeric
                 const isAlphaNumeric = /[a-zA-Z0-9]/.test(char);
                 
                 if (!isAlphaNumeric) {
                    // Render punctuation or space statically
                    return (
                      <div key={index} className={`flex items-end justify-center pb-2 text-2xl font-bold text-gray-400 ${char === ' ' ? 'w-4' : 'w-6'}`}>
                        {char === ' ' ? '' : char}
                      </div>
                    );
                 }
                 
                 // Find which letter from userSpelling goes here
                 // Logic: Count how many alphanumeric chars appeared before this index in the target
                 const alphaIndex = spellingTarget.slice(0, index).replace(/[^a-zA-Z0-9]/g, '').length;
                 const filledLetter = userSpelling[alphaIndex];
                 
                 // Dynamic size for sentence mode
                 const sizeClass = difficulty === 'SENTENCE' ? 'w-8 h-10 text-xl' : 'w-12 h-14 sm:w-14 sm:h-16 text-3xl';

                 return (
                   <button 
                     key={index}
                     onClick={handleUndoSpell}
                     className={`${sizeClass} rounded-lg border-b-4 font-bold flex items-center justify-center transition-all ${
                       filledLetter 
                       ? feedback === 'correct' 
                         ? 'bg-green-100 border-green-500 text-green-700'
                         : feedback === 'wrong'
                         ? 'bg-red-100 border-red-400 text-red-700 animate-shake'
                         : 'bg-white border-gray-300 text-gray-800'
                       : 'bg-gray-200/50 border-gray-300'
                     }`}
                   >
                     {filledLetter ? filledLetter.char : ''}
                   </button>
                 );
               })}
             </div>

             {/* Letter Pool */}
             <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
               {shuffledLetters.map((letterObj) => (
                 <button
                   key={letterObj.id}
                   onClick={() => handleSpellClick(letterObj)}
                   disabled={letterObj.isUsed || feedback === 'correct'}
                   className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-bold text-xl shadow-sm border-b-4 transition-all transform active:scale-95 ${
                     letterObj.isUsed 
                     ? 'opacity-0 pointer-events-none' // Hide used letters
                     : 'bg-white border-joy-blue text-joy-blue hover:bg-blue-50'
                   }`}
                 >
                   {letterObj.char}
                 </button>
               ))}
             </div>

             {/* Feedback Overlay */}
             {feedback === 'correct' && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                 <div className="text-8xl animate-ping">✨</div>
               </div>
             )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Game;