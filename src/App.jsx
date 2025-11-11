import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, CheckCircle, XCircle, Award, Zap, TrendingUp, LogOut, Menu, X } from 'lucide-react';

// ==================== WORD PACKS ====================
const WORD_PACKS = {
  band5: {
    name: 'Band 5 Vocabulary',
    free: ['necessary', 'receive', 'immediately', 'beautiful', 'development'],
    full: ['necessary', 'receive', 'immediately', 'beautiful', 'development', 'accommodation', 'beginning', 'definitely', 'embarrass', 'environment']
  },
  band6: {
    name: 'Band 6 Vocabulary',
    free: ['consciously', 'commitment', 'persistent', 'significant', 'apparently'],
    full: ['consciously', 'commitment', 'persistent', 'significant', 'apparently', 'phenomenon', 'psychology', 'technique', 'sophisticated', 'agriculture']
  },
  band7: {
    name: 'Band 7 Vocabulary',
    free: ['contemporary', 'inevitably', 'ambiguous', 'peripheral', 'exacerbate'],
    full: ['contemporary', 'inevitably', 'ambiguous', 'peripheral', 'exacerbate', 'substantiate', 'proliferation', 'quintessential', 'paradigm', 'rhetoric']
  },
  band8: {
    name: 'Band 8 Vocabulary',
    free: ['ineffable', 'perspicacious', 'obfuscate', 'ephemeral', 'ubiquitous'],
    full: ['ineffable', 'perspicacious', 'obfuscate', 'ephemeral', 'ubiquitous', 'pernicious', 'oscillate', 'categorical', 'dialectical', 'sanguine']
  },
  academic: {
    name: 'Academic Words',
    free: ['methodology', 'hypothesis', 'analytical', 'empirical', 'theoretical'],
    full: ['methodology', 'hypothesis', 'analytical', 'empirical', 'theoretical', 'implementation', 'institutional', 'statistical', 'bibliographic', 'synthesis']
  },
  listening: {
    name: 'Listening-Specific',
    free: ['accommodation', 'environment', 'necessary', 'government', 'occasion'],
    full: ['accommodation', 'environment', 'necessary', 'government', 'occasion', 'separate', 'definitely', 'technology', 'development', 'beginning']
  },
  writing: {
    name: 'Writing-Specific',
    free: ['separate', 'definitely', 'technology', 'development', 'beginning'],
    full: ['separate', 'definitely', 'technology', 'development', 'beginning', 'accommodation', 'environment', 'necessary', 'government', 'occasion']
  }
};

const CRITICAL_LISTENING_WORDS = [
  'accommodation',
  'environment',
  'necessary',
  'government',
  'occasion',
  'separate',
  'definitely',
  'technology',
  'development',
  'beginning'
];

const COUNTRIES = [
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦' },
  { name: 'UAE', code: 'AE', flag: '🇦🇪' },
  { name: 'Kuwait', code: 'KW', flag: '🇰🇼' },
  { name: 'Qatar', code: 'QA', flag: '🇶🇦' },
  { name: 'Bahrain', code: 'BH', flag: '🇧🇭' },
  { name: 'Oman', code: 'OM', flag: '🇴🇲' },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬' },
  { name: 'Jordan', code: 'JO', flag: '🇯🇴' },
  { name: 'Lebanon', code: 'LB', flag: '🇱🇧' },
  { name: 'Iraq', code: 'IQ', flag: '🇮🇶' },
  { name: 'Other', code: 'OTHER', flag: '🌍' }
];

// ==================== MAIN APP ====================
export default function IELTSSpellingPlatform() {
  const [currentView, setCurrentView] = useState('landing'); // landing, samples, trial, payment, dashboard, admin
  const [userType, setUserType] = useState(null); // student or admin
  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPack, setSelectedPack] = useState(null);
  const [studentData, setStudentData] = useState({
    email: '',
    name: '',
    country: '',
    paid: false,
    scores: {},
    totalPoints: 0,
    streaks: 0,
    badges: [],
    completedPacks: []
  });
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [trialUsed, setTrialUsed] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ==================== PAYMENT HANDLER ====================
  const handlePayment = () => {
    // When implemented: redirect to Stripe
    alert('Redirecting to payment (99 AED)...\nIn production: window.location.href = YOUR_STRIPE_LINK');
    // Simulate payment
    setTimeout(() => {
      setStudentData({...studentData, paid: true});
      setShowPaymentPopup(false);
      setCurrentView('dashboard');
    }, 1000);
  };

  // ==================== COMPONENTS ====================

  // 1. LANDING PAGE
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-blue-500/20 sticky top-0 bg-slate-900/80 backdrop-blur">
        <div className="text-2xl font-bold text-blue-400">✨ IELTS Spelling</div>
        <button
          onClick={() => setShowAdminLogin(!showAdminLogin)}
          className="text-sm text-slate-400 hover:text-blue-400 transition"
        >
          Admin
        </button>
      </nav>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-80">
            <h3 className="text-xl font-bold mb-4">Admin Login</h3>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 rounded mb-4 text-white"
            />
            <button
              onClick={() => {
                if (adminPassword === 'admin123') {
                  setIsAdminLoggedIn(true);
                  setCurrentView('admin');
                  setShowAdminLogin(false);
                } else {
                  alert('Wrong password');
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
            >
              Login
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Stop Losing Points on Spelling
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-blue-300">
            توقف عن خسارة الدرجات بسبب الإملاء
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Master the 500 words that appear in IELTS exams. Perfect British pronunciation. Proven results.
          </p>
          <button
            onClick={() => setCurrentView('samples')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition transform hover:scale-105"
          >
            Try Free Sample <ChevronRight className="inline ml-2" size={24} />
          </button>
        </div>

        {/* Critical Words Alert */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 mb-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <span className="text-red-400 mr-3">⚠️</span> 10 Words Arab Students Always Get Wrong
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CRITICAL_LISTENING_WORDS.map((word) => (
              <div key={word} className="bg-slate-800/50 p-3 rounded text-center font-mono text-blue-300">
                {word}
              </div>
            ))}
          </div>
          <p className="text-slate-300 mt-6 text-sm">
            These 10 words appear in almost EVERY IELTS test. Master them, and watch your score jump.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-500/20 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-slate-300">IELTS Words</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-500/20 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">7</div>
            <div className="text-slate-300">Difficulty Levels</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-500/20 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">🇬🇧</div>
            <div className="text-slate-300">British Pronunciation</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-slate-500 border-t border-blue-500/20">
        <p className="text-sm">Built with <span className="text-blue-400">Claude AI</span></p>
      </div>
    </div>
  );

  // 2. SAMPLES PAGE (Choose section)
  const SamplesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentView('landing')}
          className="mb-8 text-blue-400 hover:text-blue-300 flex items-center gap-2"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold mb-8">Choose Your Free Sample</h1>
        <p className="text-slate-300 mb-12">Select one section to try our free 10-word sample. No payment required yet.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(WORD_PACKS).map(([key, pack]) => (
            <div
              key={key}
              onClick={() => {
                setSelectedPack(key);
                setTrialUsed(false);
                setCurrentView('trial');
              }}
              className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6 cursor-pointer hover:border-blue-400 hover:bg-slate-800/80 transition group"
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300">{pack.name}</h3>
              <p className="text-slate-400 text-sm mb-4">10 words included</p>
              <div className="flex items-center text-blue-400">
                Try Sample <ChevronRight size={20} className="ml-auto group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <p className="text-slate-300">
            After your free sample, you'll see how these words improve your IELTS writing and listening scores. Then unlock all 500+ words for just <span className="text-yellow-400 font-bold">99 AED</span>.
          </p>
        </div>
      </div>
    </div>
  );

  // 3. TRIAL PAGE (Spelling Test)
  const TrialPage = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [results, setResults] = useState([]);
    const [testComplete, setTestComplete] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const packData = WORD_PACKS[selectedPack];
    const words = trialUsed ? packData.free : packData.full.slice(0, 10);
    const currentWord = words[currentWordIndex];
    const correctCount = results.filter(r => r.correct).length;

    const handleSubmit = () => {
      const isCorrect = userAnswer.toLowerCase().trim() === currentWord.toLowerCase();
      setResults([...results, { word: currentWord, answer: userAnswer, correct: isCorrect }]);
      setShowAnswer(true);
      setUserAnswer('');

      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setShowAnswer(false);
        } else {
          setTestComplete(true);
          setTrialUsed(true);
        }
      }, 1500);
    };

    if (testComplete) {
      const percentage = Math.round((correctCount / words.length) * 100);
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-12 text-center">
              <h2 className="text-4xl font-bold mb-6">Test Complete! 🎉</h2>
              <div className="text-6xl font-bold text-blue-400 mb-4">{correctCount}/{words.length}</div>
              <div className="text-2xl text-green-400 mb-8">{percentage}% Correct</div>

              {percentage < 70 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
                  <p className="text-red-300 mb-4">
                    Don't worry! This is exactly why you need our full program. These mistakes are costing you IELTS points.
                  </p>
                  <p className="text-slate-300">Unlock all 500+ words and track your improvement day by day.</p>
                </div>
              )}

              {percentage >= 70 && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-8">
                  <p className="text-green-300">Great start! But there's so much more to master.</p>
                </div>
              )}

              <button
                onClick={() => {
                  setShowPaymentPopup(true);
                  setCurrentView('payment');
                }}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg mb-4 transition text-lg"
              >
                Unlock All Packs - 99 AED 🔓
              </button>

              <button
                onClick={() => {
                  setSelectedPack(null);
                  setCurrentView('samples');
                }}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3 rounded-lg transition"
              >
                Try Another Sample
              </button>
            </div>

            {/* Review */}
            <div className="mt-8 bg-slate-800/30 rounded-lg p-6">
              <h3 className="font-bold mb-4">Your Answers</h3>
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span>{r.word}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{r.answer || '(blank)'}</span>
                    {r.correct ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <XCircle size={20} className="text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => {
                setSelectedPack(null);
                setCurrentView('samples');
              }}
              className="text-blue-400 hover:text-blue-300"
            >
              ← Back
            </button>
            <div className="text-slate-400">
              Word {currentWordIndex + 1} / {words.length}
            </div>
          </div>

          <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-6">Spell This Word</h2>
              <button
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(currentWord);
                  utterance.rate = 0.8;
                  speechSynthesis.speak(utterance);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition text-lg"
              >
                🔊 Play Word
              </button>
            </div>

            <div className="mb-8">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Type your answer..."
                className="w-full px-6 py-3 bg-slate-700 rounded-lg text-white text-lg border border-blue-500/30 focus:border-blue-400 focus:outline-none"
                autoFocus
              />
            </div>

            {showAnswer && (
              <div className={`text-center py-4 rounded-lg mb-8 font-bold ${
                results[results.length - 1].correct
                  ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                  : 'bg-red-500/20 text-red-300 border border-red-500/50'
              }`}>
                {results[results.length - 1].correct
                  ? '✓ Correct!'
                  : `✗ Correct spelling: ${currentWord}`}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Check Answer
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-6 bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  // 4. PAYMENT POPUP
  const PaymentPopup = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-slate-800 rounded-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-bold mb-6">Ready to Master IELTS Spelling?</h2>
        
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
          <div className="text-4xl font-bold text-yellow-400 mb-2">99 AED</div>
          <p className="text-slate-300">Lifetime Access • All 500+ Words • All Packs</p>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-400" />
            <span>7 Complete Word Packs</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-400" />
            <span>British Pronunciation</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-400" />
            <span>Progress Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-400" />
            <span>Badges & Achievements</span>
          </div>
        </div>

        <form className="space-y-4 mb-6">
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email (for receipt & updates)</label>
            <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-blue-400 focus:outline-none"
            >
              <option value="">Select your country</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>
        </form>

        <button
          onClick={handlePayment}
          disabled={!studentName || !studentEmail || !selectedCountry}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-black font-bold px-8 py-3 rounded-lg transition text-lg mb-3"
        >
          Proceed to Payment 💳
        </button>

        <button
          onClick={() => {
            setShowPaymentPopup(false);
            setCurrentView('samples');
          }}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3 rounded-lg transition"
        >
          Maybe Later
        </button>

        <p className="text-center text-slate-500 text-xs mt-4">
          💳 Secure payment via Stripe • Money-back guarantee
        </p>
      </div>
    </div>
  );

  // 5. STUDENT DASHBOARD
  const StudentDashboard = () => {
    const totalScore = studentData.totalPoints || 0;
    const level = Math.floor(totalScore / 100) + 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 bg-slate-800/50 rounded-lg p-6 border border-blue-500/20">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {studentData.name}!</h1>
              <p className="text-slate-400">🇬🇧 British English • 500+ Words • Lifetime Access</p>
            </div>
            <button
              onClick={() => {
                setCurrentView('landing');
                setStudentData({...studentData, email: '', name: '', paid: false});
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">{totalScore}</div>
              <div className="text-blue-100">Total Points</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Level {level}</div>
              <div className="text-green-100">Your Level</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">{studentData.streaks}</div>
              <div className="text-yellow-100">Current Streak</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">{studentData.badges.length}</div>
              <div className="text-purple-100">Badges Earned</div>
            </div>
          </div>

          {/* Word Packs Grid */}
          <h2 className="text-2xl font-bold mb-6">Start Practicing</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {Object.entries(WORD_PACKS).map(([key, pack]) => (
              <div key={key} className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400 hover:bg-slate-800/80 transition cursor-pointer group">
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300">{pack.name}</h3>
                <p className="text-slate-400 text-sm mb-4">10 words in this pack</p>
                <div className="flex items-center text-blue-400">
                  Start Practice <ChevronRight size={20} className="ml-auto group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>
          <div className="grid md:grid-cols-6 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-yellow-500/30">
              <div className="text-4xl mb-2">🥇</div>
              <div className="text-sm">First Step</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700/30 opacity-50">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-sm">7-Day Streak</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700/30 opacity-50">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-sm">100% Score</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700/30 opacity-50">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-sm">Master</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700/30 opacity-50">
              <div className="text-4xl mb-2">💎</div>
              <div className="text-sm">500 Points</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700/30 opacity-50">
              <div className="text-4xl mb-2">👑</div>
              <div className="text-sm">Legend</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 6. ADMIN DASHBOARD
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              setIsAdminLoggedIn(false);
              setCurrentView('landing');
              setAdminPassword('');
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-blue-500/20">
            <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
            <div className="text-slate-300">Total Students</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-green-500/20">
            <div className="text-3xl font-bold text-green-400 mb-2">0 AED</div>
            <div className="text-slate-300">Revenue</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-yellow-500/20">
            <div className="text-3xl font-bold text-yellow-400 mb-2">0</div>
            <div className="text-slate-300">Email List</div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-blue-500/20">
          <h2 className="text-2xl font-bold mb-6">Recent Student Signups</h2>
          <p className="text-slate-400">No students yet. When students sign up, their data appears here.</p>
          <table className="w-full mt-4">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Country</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data will populate here */}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <h3 className="font-bold mb-2">Integration Setup</h3>
          <p className="text-slate-300 text-sm mb-4">Stripe Key: <span className="font-mono text-blue-300">pk_live_YOUR_KEY</span></p>
          <p className="text-slate-300 text-sm">Firebase Config: Setup in environment variables</p>
        </div>
      </div>
    </div>
  );

  // ==================== RENDER ====================
  return (
    <div>
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'samples' && <SamplesPage />}
      {currentView === 'trial' && selectedPack && <TrialPage />}
      {currentView === 'payment' && showPaymentPopup && <PaymentPopup />}
      {currentView === 'dashboard' && studentData.paid && <StudentDashboard />}
      {currentView === 'admin' && isAdminLoggedIn && <AdminDashboard />}
    </div>
  );
}
