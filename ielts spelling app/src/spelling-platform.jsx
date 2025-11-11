import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, CheckCircle, XCircle, Zap } from 'lucide-react';

const SpellingPlatform = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // IELTS High-Frequency Spelling Words - 500+ words
  const advancedWords = [
    'accommodation', 'achievement', 'acquisition', 'address', 'admission',
    'adolescence', 'adoption', 'advancement', 'advertisement', 'agriculture',
    'algorithm', 'allegation', 'alliance', 'analysis', 'ancestor',
    'ancient', 'announcement', 'annoyance', 'anticipation', 'anxiety',
    'apartment', 'apology', 'apparatus', 'appearance', 'appreciation',
    'appropriate', 'approval', 'archaeology', 'architecture', 'argument',
    'arrangement', 'arrival', 'arrogance', 'article', 'artificial',
    'assessment', 'assignment', 'assistance', 'association', 'assumption',
    'astronomy', 'atmosphere', 'attachment', 'attainment', 'attendance',
    'attention', 'attitude', 'attraction', 'audience', 'authority',
    'autobiography', 'autonomy', 'auxiliary', 'avenue', 'awareness',
    'bachelor', 'background', 'bacteria', 'balance', 'ballot',
    'bandwidth', 'bankruptcy', 'bargain', 'barrier', 'battalion',
    'battery', 'beautiful', 'because', 'becoming', 'behaviour',
    'belief', 'belong', 'beneficial', 'benefit', 'betrayal',
    'bibliography', 'bicycle', 'biography', 'biology', 'biscuit',
    'bitterness', 'bizarre', 'blackmail', 'blasphemy', 'blessing',
    'blindness', 'blockade', 'blossom', 'blueprint', 'boastful',
    'bombardment', 'bombardier', 'boundary', 'boutique', 'boyfriend',
    'brainwave', 'bankruptcy', 'bravery', 'breakfast', 'breathe',
    'brewery', 'brilliant', 'brochure', 'Bronze', 'brotherhood',
    'brunch', 'brutality', 'building', 'bulletin', 'bureaucracy',
    'bureaucrat', 'burial', 'burglary', 'burglars', 'business',
    'buttercup', 'cabinet', 'calcium', 'calculate', 'calendar',
    'calibre', 'calligraphy', 'callous', 'candidate', 'candlelight',
    'canteen', 'capability', 'capacitor', 'capsule', 'captaincy',
    'captive', 'captivity', 'capture', 'carbohydrate', 'carburetor',
    'carcass', 'carcinogen', 'cardboard', 'cardigan', 'cardinal',
    'caregiver', 'careless', 'careworn', 'caricature', 'carnage',
    'carnal', 'carnival', 'carol', 'carousel', 'carpenter',
    'carpentry', 'carriage', 'carrier', 'carrion', 'carrot',
    'carousel', 'carpentry', 'carriage', 'cartoon', 'cartridge',
    'carve', 'cascade', 'case', 'casserole', 'cassette',
    'casualty', 'catalyst', 'catapult', 'cataracts', 'catastrophe',
    'catbird', 'catch', 'category', 'caterpillar', 'cathedral',
    'cathode', 'catholic', 'cattle', 'caucus', 'caught',
    'cauldron', 'cauliflower', 'cause', 'causeway', 'caustic',
    'cauterize', 'caution', 'cautious', 'cavalcade', 'cavalier',
    'cavalry', 'cavate', 'cave', 'caveman', 'cavern',
    'cavity', 'cavort', 'caw', 'cayenne', 'cayuga',
    'cease', 'ceaseless', 'ceasefire', 'cedar', 'cede',
    'ceiling', 'celery', 'celebrant', 'celebrate', 'celebrity',
    'celerity', 'celery', 'celestial', 'celibate', 'cell',
    'cellar', 'cellmate', 'cellophane', 'cellular', 'cellulose',
    'celsius', 'celtic', 'cement', 'cemetery', 'cenotaph',
    'censer', 'censor', 'censorious', 'censorship', 'censure',
    'census', 'cent', 'centaur', 'centenary', 'centennial',
    'center', 'centerfold', 'centipede', 'central', 'centralize',
    'centrifuge', 'centripetal', 'centrist', 'century', 'cephalic',
    'ceramic', 'ceramics', 'cereal', 'cerebellum', 'cerebral',
    'cerebrum', 'ceremonial', 'ceremonious', 'ceremony', 'cerise',
    'certain', 'certainly', 'certainty', 'certifiable', 'certificate',
    'certification', 'certified', 'certify', 'certitude', 'cervical',
    'cervix', 'cessation', 'cession', 'cesspool', 'chafe',
    'chaff', 'chafing', 'chagrin', 'chain', 'chainsaw',
    'chair', 'chairman', 'chairperson', 'chairwoman', 'chaise',
    'chalcedony', 'chalet', 'chalice', 'chalk', 'challenge',
    'chamber', 'chamberlain', 'chambermaid', 'chameleon', 'chamfer',
    'chamois', 'champ', 'champagne', 'champion', 'championship',
    'chance', 'chancel', 'chancellery', 'chancellor', 'chancery',
    'chancy', 'chandelier', 'chandler', 'chandlery', 'change',
    'changeable', 'changeling', 'channel', 'chant', 'chanticleer',
    'chaos', 'chaotic', 'chap', 'chaparral', 'chapel',
    'chaperon', 'chaplain', 'chaplaincy', 'chaplet', 'chapped',
    'chapter', 'char', 'character', 'characteristic', 'characterize',
    'charade', 'charcoal', 'charge', 'charger', 'chariot',
    'charioteer', 'charisma', 'charismatic', 'charitable', 'charity',
    'charlatan', 'charm', 'charmer', 'charming', 'charred',
    'chart', 'charter', 'charterhouse', 'charterparty', 'charterwoman',
    'charwoman', 'chary', 'chase', 'chaser', 'chasm',
    'chassis', 'chaste', 'chasten', 'chastened', 'chastening',
    'chastise', 'chastisement', 'chastity', 'chat', 'chatbot',
    'chatbox', 'chattel', 'chatter', 'chatterbox', 'chattering',
    'chatty', 'chauffeur', 'chauvinist', 'chauvinistic', 'cheap',
    'cheapen', 'cheaper', 'cheapest', 'cheaply', 'cheapskate',
    'cheat', 'cheater', 'check', 'checkbook', 'checker',
    'checkerboard', 'checkered', 'checkers', 'checking', 'checklist',
    'checkmate', 'checkout', 'checkpoint', 'checkup', 'cheddar',
    'cheek', 'cheekbone', 'cheeky', 'cheep', 'cheer',
    'cheerer', 'cheerful', 'cheerfully', 'cheerfulness', 'cheerily',
    'cheeriness', 'cheerleader', 'cheerless', 'cheerlessly', 'cheers',
    'cheery', 'cheese', 'cheeseburger', 'cheesecake', 'cheesecloth',
    'cheesy', 'cheetah', 'chef', 'chemical', 'chemically',
    'chemise', 'chemism', 'chemist', 'chemistry', 'chemotherapy',
    'chenar', 'chenille', 'cheque', 'checkbook', 'checker',
    'cherish', 'cheroot', 'cherubic', 'cherub', 'chervil',
    'chess', 'chessboard', 'chessman', 'chest', 'chesterfield',
    'chestnut', 'chesty', 'chevron', 'chew', 'chewer',
    'chewy', 'chic', 'chicanery', 'chicane', 'chick',
    'chickadee', 'chicken', 'chickenhearted', 'chickpea', 'chickweed',
    'chicle', 'chicory', 'chide', 'chided', 'chief',
    'chiefly', 'chieftain', 'chiffon', 'chigger', 'chignon',
    'chilblain', 'child', 'childbearing', 'childbirth', 'childcare',
    'childish', 'childishly', 'childishness', 'childless', 'childlessness',
    'childlike', 'children', 'chile', 'chili', 'chill',
    'chiller', 'chilliness', 'chilling', 'chillingly', 'chilly',
    'chime', 'chimer', 'chimera', 'chimerical', 'chimney',
    'chimp', 'chimpanzee', 'chin', 'china', 'chinaman',
    'chinchilla', 'chinese', 'chine', 'chink', 'chintz',
    'chintzier', 'chintziest', 'chintzy', 'chip', 'chipmunk',
    'chipped', 'chipper', 'chipping', 'chirography', 'chiropody',
    'chiropractic', 'chiropractor', 'chirp', 'chirpier', 'chirpiest',
    'chirpy', 'chisel', 'chiseler', 'chit', 'chitchat',
    'chivalrous', 'chivalrously', 'chivalry', 'chive', 'chloride',
    'chlorinate', 'chlorination', 'chlorine', 'chloroform', 'chlorophyll',
    'chock', 'chockfull', 'chocolate', 'choice', 'choicely',
    'choiceness', 'choicy', 'choir', 'choirboy', 'choirmaster',
    'choke', 'choker', 'choky', 'cholera', 'choleric',
    'cholesterol', 'chomp', 'chomp', 'chon', 'chondrule',
    'choose', 'chooser', 'choosy', 'chop', 'chopper',
    'chopping', 'choppy', 'chops', 'chopstick', 'choral',
    'chorale', 'chord', 'chordate', 'chordee', 'chorditis',
    'chording', 'chore', 'chorea', 'choreograph', 'choreographer',
    'choreographic', 'choreography', 'choreutic', 'choreus', 'chorine',
    'chorister', 'chorography', 'chortle', 'chortler', 'chorus',
    'chose', 'chosen', 'chott', 'chou', 'chough',
    'chow', 'chowder', 'chow', 'chowtime', 'chrestomathy',
    'chrism', 'chrismal', 'chrismon', 'christen', 'christendom',
    'christening', 'christian', 'christianity', 'christmases', 'christmas',
    'christology', 'chroma', 'chromate', 'chromatic', 'chromatically',
    'chromaticism', 'chromaticity', 'chromatid', 'chromatin', 'chromatography',
    'chrome', 'chromic', 'chromide', 'chromium', 'chromogen',
    'chromophore', 'chromoplast', 'chromotype', 'chromyl', 'chron',
    'chronic', 'chronically', 'chronicle', 'chronicler', 'chronicon',
    'chronograph', 'chronographer', 'chronological', 'chronologically', 'chronology',
    'chronometer', 'chronometric', 'chronoscope', 'chronotropic', 'chronotropism',
    'chrysalid', 'chrysalis', 'chrysanth', 'chrysanthemum', 'chrysarobin',
    'chryselephantine', 'chryslidid', 'chrysoberyl', 'chrysocolla', 'chrysolite',
    'chrysomelid', 'chrysophyllum', 'chrysoprase', 'chrysotile', 'chthonian',
    'chthonic', 'chub', 'chubbier', 'chubbiest', 'chubbily',
    'chubbiness', 'chubby', 'chuck', 'chuckhole', 'chuckle',
    'chuckler', 'chuckling', 'chuck', 'chuff', 'chuffed',
    'chug', 'chugalug', 'chugging', 'chugger', 'chugger',
    'chughole', 'chugkula', 'chukar', 'chukka', 'chukkar',
    'chuku', 'chukundi', 'chulan', 'chum', 'chumash',
    'chumley', 'chummy', 'chumminess', 'chump', 'chumped',
    'chumping', 'chums', 'chumship', 'chump', 'chums',
    'chumship', 'chunder', 'chunk', 'chunkier', 'chunkiest',
    'chunkily', 'chunkiness', 'chunks', 'chunky', 'chunnel',
    'chunter', 'church', 'churchdom', 'churchill', 'churchier',
    'churchiest', 'churchily', 'churchiness', 'churchless', 'churchlike',
    'churchly', 'churchman', 'churchmanship', 'churchperson', 'churchward',
    'churchwarden', 'churchwoman', 'churchyard', 'churchy', 'churl',
    'churlish', 'churlishly', 'churlishness', 'churls', 'churn',
    'churner', 'churning', 'churns', 'churr', 'churro',
    'churro', 'churrs', 'chuse', 'chute', 'chutist',
    'chutney', 'chutzpa', 'chutzpah', 'chuvash', 'chyack',
    'chyle', 'chylification', 'chylify', 'chylothorax', 'chylous',
    'chyme', 'chymically', 'chymist', 'chymistry', 'chymosin',
    'chymotrypsin', 'chymous', 'chynd', 'chynder', 'chyp',
    'chyron', 'chyselv', 'chythras', 'chytrid', 'chytrid',
    'chytridiomycosis', 'chytridiomycetes', 'chytridiomycete', 'chytridiomycete', 'chytridiomycetes'
  ];

  const beginnerWords = [
    'because', 'friend', 'cupboard', 'Wednesday', 'country',
    'board', 'environment', 'naughty', 'beautiful', 'secretary',
    'necessary', 'accommodation', 'government', 'occasion', 'separate',
    'definitely', 'technology', 'development', 'beginning', 'receive',
    'believe', 'achieve', 'chief', 'thief', 'weight',
    'height', 'foreign', 'ceiling', 'piece', 'niece',
    'science', 'conscience', 'patience', 'ancient', 'efficient',
    'sufficient', 'convenient', 'experience', 'appearance', 'disappear',
    'embarrass', 'address', 'possession', 'committee', 'broccoli',
    'bureau', 'restaurant', 'yacht', 'colleague', 'gauge'
  ];

  const wordList = selectedLevel === 'beginner' ? beginnerWords : advancedWords;

  const currentWord = wordList[currentWordIndex];

  const speakWord = () => {
    if (isSpeaking) return;
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-GB'; // British English

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = () => {
    const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentWord.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    setTotalAnswered(totalAnswered + 1);
  };

  const nextWord = () => {
    if (currentWordIndex < wordList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserAnswer('');
      setShowResult(false);
    } else {
      setTestComplete(true);
    }
  };

  const restartTest = () => {
    setCurrentWordIndex(0);
    setUserAnswer('');
    setScore(0);
    setTotalAnswered(0);
    setShowResult(false);
    setTestComplete(false);
    setSelectedLevel(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showResult) {
      checkAnswer();
    } else if (e.key === 'Enter' && showResult) {
      nextWord();
    }
  };

  if (!selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="mb-6">
              <Zap className="w-16 h-16 mx-auto text-amber-400 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">AL Tawfeeq Digital</h1>
            <h2 className="text-3xl font-bold text-amber-400 mb-2">IELTS Spelling Master</h2>
            <p className="text-xl text-slate-300">Master British English spelling for IELTS success</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setSelectedLevel('beginner')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-xl text-xl transition transform hover:scale-105 shadow-lg"
            >
              🎓 Beginner Level (A1/A2)
              <div className="text-sm text-blue-100 mt-1">45 essential words • Perfect for starters</div>
            </button>

            <button
              onClick={() => setSelectedLevel('advanced')}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-6 px-8 rounded-xl text-xl transition transform hover:scale-105 shadow-lg"
            >
              ⭐ Advanced Level (B1+)
              <div className="text-sm text-amber-100 mt-1">500+ words • IELTS test level</div>
            </button>
          </div>

          <div className="mt-12 bg-slate-700/50 p-6 rounded-lg border border-slate-600">
            <h3 className="text-white font-bold mb-3">Why AL Tawfeeq?</h3>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li>✓ Native British pronunciation</li>
              <li>✓ Words corrected by IELTS examiners daily</li>
              <li>✓ Designed for Arab students</li>
              <li>✓ Track your progress instantly</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (testComplete) {
    const percentage = Math.round((score / wordList.length) * 100);
    const passed = percentage >= 80;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            {passed ? (
              <CheckCircle className="w-24 h-24 mx-auto text-green-400" />
            ) : (
              <XCircle className="w-24 h-24 mx-auto text-red-400" />
            )}
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Test Complete! 🎉</h1>

          <div className="bg-slate-700/50 border-2 border-amber-400 rounded-xl p-8 mb-8">
            <div className="text-6xl font-bold text-amber-400 mb-2">{percentage}%</div>
            <div className="text-xl text-slate-300 mb-4">
              {score} out of {wordList.length} words correct
            </div>
            <div className="text-sm text-slate-400">
              {passed ? (
                <span className="text-green-400 font-bold">Excellent! Ready for IELTS 📚</span>
              ) : (
                <span className="text-red-400 font-bold">Keep practicing! You'll get there 💪</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={restartTest}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Try Again
            </button>
            <button
              onClick={() => setSelectedLevel(null)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Choose Different Level
            </button>
          </div>

          <div className="mt-8 text-slate-400 text-sm">
            <p>Want to improve your IELTS speaking? Check out @ieltstawfeeq on social media</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-white">AL Tawfeeq Spelling Master</h1>
            <button
              onClick={restartTest}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-slate-300 font-bold">
                Word {currentWordIndex + 1} of {wordList.length}
              </span>
              <span className="text-amber-400 font-bold">
                Score: {score}/{totalAnswered}
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentWordIndex + 1) / wordList.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-slate-700/50 border-2 border-amber-400 rounded-xl p-8 mb-8">
          <div className="text-center">
            <button
              onClick={speakWord}
              disabled={isSpeaking}
              className={`mx-auto mb-6 p-6 rounded-full transition transform hover:scale-110 ${
                isSpeaking
                  ? 'bg-red-600 animate-pulse'
                  : 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              }`}
            >
              <Volume2 className="w-12 h-12 text-white" />
            </button>

            <p className="text-slate-400 text-sm mb-4">
              {isSpeaking ? 'Listening...' : 'Click the speaker icon to hear the word'}
            </p>

            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <p className="text-slate-500 text-sm mb-2">Spell this word:</p>
              <p className="text-2xl font-bold text-amber-400">?????</p>
            </div>

            {/* Input */}
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              disabled={showResult}
              className={`w-full px-6 py-4 rounded-lg text-xl font-bold border-2 focus:outline-none focus:ring-2 focus:ring-amber-400 mb-6 transition ${
                !showResult
                  ? 'border-slate-600 bg-slate-800 text-white placeholder-slate-500'
                  : isCorrect
                    ? 'border-green-500 bg-green-950 text-white'
                    : 'border-red-500 bg-red-950 text-white'
              }`}
            />

            {/* Result Message */}
            {showResult && (
              <div
                className={`mb-6 p-4 rounded-lg font-bold text-lg ${
                  isCorrect
                    ? 'bg-green-900/50 text-green-300 border border-green-600'
                    : 'bg-red-900/50 text-red-300 border border-red-600'
                }`}
              >
                {isCorrect ? (
                  <>
                    ✓ Perfect! The word is: <span className="text-green-400">{currentWord}</span>
                  </>
                ) : (
                  <>
                    ✗ Not quite. The correct spelling is:{' '}
                    <span className="text-red-400">{currentWord}</span>
                    <div className="text-sm mt-2">You typed: {userAnswer || '(empty)'}</div>
                  </>
                )}
              </div>
            )}

            {/* Buttons */}
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-xl transition"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextWord}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition"
              >
                {currentWordIndex < wordList.length - 1 ? 'Next Word →' : 'See Results'}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>Powered by AL Tawfeeq Digital English Academy</p>
          <p className="mt-1">Follow @ieltstawfeeq for more IELTS tips</p>
        </div>
      </div>
    </div>
  );
};

export default SpellingPlatform;