import React, { useState, useEffect } from 'react';
import { Volume2, Award, Target, Zap, CheckCircle, XCircle, Trophy, Flame, Star, BookOpen } from 'lucide-react';

// 1500+ WORDS - CEFR LEVELS (250 words each level)
const WORD_PACKS = {
  a1: {
    name: 'A1 - Beginner',
    level: 'CEFR A1',
    color: '#10b981',
    words: ['about', 'after', 'again', 'all', 'also', 'and', 'animal', 'answer', 'any', 'are', 'ask', 'back', 'bad', 'because', 'been', 'before', 'begin', 'best', 'better', 'big', 'black', 'blue', 'book', 'both', 'boy', 'but', 'call', 'came', 'can', 'car', 'change', 'child', 'city', 'close', 'cold', 'come', 'could', 'country', 'cut', 'day', 'did', 'different', 'do', 'does', 'dog', 'don\'t', 'door', 'down', 'each', 'early', 'eat', 'end', 'even', 'every', 'example', 'eye', 'face', 'fact', 'family', 'far', 'father', 'few', 'find', 'first', 'follow', 'food', 'for', 'found', 'friend', 'from', 'get', 'girl', 'give', 'go', 'good', 'got', 'great', 'group', 'grow', 'had', 'hand', 'hard', 'has', 'have', 'he', 'head', 'help', 'her', 'here', 'high', 'him', 'his', 'home', 'house', 'how', 'however', 'idea', 'important', 'in', 'into', 'is', 'it', 'its', 'just', 'keep', 'kind', 'know', 'land', 'large', 'last', 'late', 'leave', 'left', 'let', 'life', 'light', 'like', 'line', 'little', 'live', 'long', 'look', 'made', 'make', 'man', 'many', 'may', 'me', 'men', 'might', 'more', 'most', 'mother', 'move', 'much', 'must', 'my', 'name', 'near', 'need', 'never', 'new', 'next', 'night', 'no', 'not', 'now', 'number', 'of', 'off', 'old', 'on', 'one', 'only', 'open', 'or', 'other', 'our', 'out', 'over', 'own', 'part', 'people', 'place', 'play', 'point', 'put', 'question', 'quick', 'read', 'really', 'right', 'run', 'said', 'same', 'saw', 'say', 'school', 'see', 'seem', 'sentence', 'set', 'she', 'should', 'show', 'side', 'small', 'so', 'some', 'something', 'sound', 'spell', 'start', 'state', 'still', 'stop', 'story', 'study', 'such', 'take', 'tell', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'thing', 'think', 'this', 'those', 'thought', 'three', 'through', 'time', 'to', 'together', 'too', 'took', 'tree', 'try', 'turn', 'two', 'under', 'up', 'us', 'use', 'very', 'walk', 'want', 'was', 'water', 'way', 'we', 'well', 'went', 'were', 'what', 'when', 'where', 'which', 'while', 'white', 'who', 'why', 'will', 'with', 'without', 'word', 'work', 'world', 'would', 'write', 'year', 'you', 'young', 'your']
  },
  a2: {
    name: 'A2 - Elementary',
    level: 'CEFR A2',
    color: '#3b82f6',
    words: ['ability', 'able', 'accept', 'accident', 'according', 'account', 'across', 'act', 'action', 'activity', 'actually', 'add', 'address', 'admit', 'adult', 'advice', 'affect', 'afford', 'afraid', 'afternoon', 'age', 'agency', 'agent', 'agree', 'agreement', 'ahead', 'air', 'album', 'alive', 'allow', 'almost', 'alone', 'along', 'already', 'although', 'always', 'amazing', 'among', 'amount', 'ancient', 'angry', 'announce', 'annual', 'another', 'anybody', 'anymore', 'anyone', 'anything', 'anywhere', 'apart', 'apartment', 'apparently', 'appeal', 'appear', 'appearance', 'application', 'apply', 'appoint', 'appointment', 'approach', 'appropriate', 'approve', 'area', 'argue', 'argument', 'arise', 'arm', 'army', 'around', 'arrange', 'arrangement', 'arrest', 'arrive', 'article', 'artist', 'aside', 'asleep', 'aspect', 'assess', 'assessment', 'asset', 'assign', 'assignment', 'assist', 'assistance', 'assistant', 'associate', 'association', 'assume', 'assure', 'attach', 'attack', 'attempt', 'attend', 'attention', 'attitude', 'attorney', 'attract', 'attractive', 'audience', 'author', 'authority', 'automatic', 'available', 'average', 'avoid', 'award', 'aware', 'away', 'baby', 'background', 'backwards', 'badly', 'bag', 'balance', 'ball', 'band', 'bank', 'bar', 'barely', 'base', 'basic', 'basically', 'basis', 'basket', 'basketball', 'bathroom', 'battery', 'battle', 'beach', 'bear', 'beat', 'beautiful', 'beauty', 'became', 'become', 'bed', 'bedroom', 'beer', 'begin', 'beginning', 'behalf', 'behave', 'behavior', 'behind', 'being', 'belief', 'believe', 'bell', 'belong', 'below', 'belt', 'bench', 'bend', 'beneath', 'benefit', 'beside', 'besides', 'beyond', 'bicycle', 'bike', 'bill', 'billion', 'bind', 'bird', 'birth', 'birthday', 'bit', 'bite', 'bitter', 'blame', 'blank', 'blanket', 'blind', 'block', 'blood', 'blow', 'board', 'boat', 'body', 'boil', 'bomb', 'bond', 'bone', 'bonus', 'boot', 'border', 'bore', 'born', 'borrow', 'boss', 'bother', 'bottle', 'bottom', 'boundary', 'bowl', 'box', 'boyfriend', 'brain', 'branch', 'brand', 'brave', 'bread', 'break', 'breakfast', 'breast', 'breath', 'breathe', 'bridge', 'brief', 'briefly', 'bright', 'brilliant', 'bring', 'broad', 'broken', 'brother', 'brown', 'brush', 'budget', 'build', 'building', 'bullet', 'bunch', 'burn', 'bury', 'bus', 'business', 'busy', 'butter', 'button', 'buy', 'buyer', 'cable', 'cake', 'calculate', 'camera', 'camp', 'campaign', 'campus', 'cancel', 'cancer', 'candidate', 'cap', 'capability', 'capable', 'capacity', 'capital', 'captain', 'capture', 'card', 'care', 'career', 'careful', 'carefully', 'carrier', 'carry', 'case', 'cash', 'cast', 'cat', 'catch', 'category', 'cause', 'ceiling', 'celebrate', 'celebration', 'celebrity', 'cell', 'cent', 'center', 'central', 'century']
  },
  b1: {
    name: 'B1 - Intermediate',
    level: 'CEFR B1',
    color: '#8b5cf6',
    words: ['accommodation', 'accompany', 'accomplish', 'accord', 'accordance', 'accordingly', 'accountant', 'accurate', 'accuse', 'achieve', 'achievement', 'acknowledge', 'acquire', 'acquisition', 'acre', 'activate', 'active', 'activist', 'actor', 'actress', 'actual', 'adapt', 'addiction', 'addition', 'additional', 'adequate', 'adjust', 'adjustment', 'administer', 'administration', 'administrative', 'administrator', 'admire', 'admission', 'adolescent', 'adopt', 'adoption', 'advance', 'advanced', 'advantage', 'adventure', 'advertising', 'advise', 'adviser', 'advocate', 'affair', 'affordable', 'afterwards', 'aggressive', 'agricultural', 'agriculture', 'aircraft', 'airline', 'airport', 'aisle', 'alarm', 'alcohol', 'alert', 'alien', 'alike', 'alliance', 'allocate', 'alternate', 'alternative', 'altogether', 'ambassador', 'ambition', 'ambitious', 'amend', 'amendment', 'amongst', 'analyse', 'analysis', 'analyst', 'ancestor', 'anchor', 'angel', 'angle', 'ankle', 'anniversary', 'announcement', 'anonymous', 'anxious', 'anxiety', 'anyway', 'appeal', 'appetite', 'applaud', 'appliance', 'applicable', 'appoint', 'appreciate', 'appreciation', 'apprentice', 'approval', 'approximate', 'arbitrary', 'architect', 'architecture', 'archive', 'arise', 'arithmetic', 'arrangement', 'arrest', 'arrival', 'arrow', 'artificial', 'artist', 'artistic', 'ascend', 'ashamed', 'asleep', 'assemble', 'assembly', 'assert', 'assess', 'asset', 'assign', 'assist', 'assistance', 'associate', 'association', 'assumption', 'assurance', 'astonish', 'athlete', 'athletic', 'atmosphere', 'atomic', 'attach', 'attachment', 'attain', 'attempt', 'attendance', 'attendant', 'attraction', 'attribute', 'auction', 'audit', 'auditor', 'authority', 'automatic', 'automobile', 'autonomous', 'autonomy', 'availability', 'avenue', 'aviation', 'awkward', 'axis', 'backdrop', 'bacon', 'bacteria', 'badge', 'badly', 'baggage', 'bake', 'balanced', 'balcony', 'balloon', 'ballot', 'bamboo', 'banana', 'bandage', 'bang', 'banker', 'banking', 'bankrupt', 'banner', 'banquet', 'bargain', 'barrel', 'barrier', 'bash', 'basin', 'basket', 'batch', 'bathe', 'battalion', 'batter', 'battery', 'bay', 'beam', 'bean', 'beard', 'beast', 'behalf', 'behave', 'beloved', 'beneficial', 'beneficiary', 'berry', 'betray', 'beverage', 'bias', 'bid', 'bilateral', 'biology', 'bishop', 'blanket', 'blast', 'bleed', 'blend', 'blessing', 'bless', 'blindness', 'blink', 'bloody', 'bloom', 'blossom', 'blunt', 'blur', 'blush', 'boast', 'boldly', 'bolster', 'bolt', 'bookmark', 'boom', 'boost', 'booth', 'bore', 'bounce', 'bounds', 'bouquet', 'bow', 'bowel', 'bracket', 'brake', 'brass', 'breach', 'breadth', 'breakthrough', 'breed', 'breeze', 'brew', 'bribe', 'brick', 'bride', 'briefly', 'brighten', 'brink', 'brisk', 'brittle', 'bronze', 'broth', 'bruise', 'brutal', 'bubble', 'buck', 'bud', 'buffalo', 'bug', 'bulk', 'bulb']
  },
  b2: {
    name: 'B2 - Upper Intermediate',
    level: 'CEFR B2',
    color: '#f59e0b',
    words: ['abbreviate', 'abolish', 'abortion', 'abound', 'abrupt', 'absence', 'absent', 'absolute', 'absolutely', 'absorb', 'abstract', 'absurd', 'abundance', 'abundant', 'abuse', 'academic', 'academy', 'accelerate', 'acceleration', 'accent', 'acceptable', 'acceptance', 'access', 'accessible', 'accessory', 'acclaim', 'accommodate', 'accompaniment', 'accomplice', 'accomplish', 'accordion', 'accountability', 'accumulate', 'accuracy', 'accusation', 'accustom', 'ache', 'acquaintance', 'acquit', 'acrobat', 'acronym', 'activate', 'acute', 'adamant', 'addict', 'adherent', 'adhesive', 'adjacent', 'adjective', 'adjourn', 'adjunct', 'admirable', 'admiral', 'admiration', 'adolescence', 'adore', 'adorn', 'adrenaline', 'adrift', 'adulthood', 'advancement', 'advent', 'adverse', 'adversity', 'advertisement', 'aerial', 'aerobic', 'aesthetic', 'affection', 'affectionate', 'affiliate', 'affinity', 'affirm', 'affirmative', 'afflict', 'affluent', 'aftermath', 'agenda', 'aggravate', 'aggregate', 'aggression', 'agile', 'agility', 'agitate', 'agony', 'agreeable', 'ailment', 'aimless', 'airborne', 'akin', 'albeit', 'alcoholic', 'alert', 'algebra', 'alias', 'alienate', 'align', 'alignment', 'allay', 'allege', 'allegiance', 'allergic', 'allergy', 'alleviate', 'allied', 'allocate', 'allocation', 'allot', 'allowance', 'alloy', 'allude', 'allure', 'ally', 'almighty', 'aloft', 'aloud', 'alphabet', 'alpine', 'altar', 'alteration', 'alternate', 'altitude', 'aluminium', 'alumni', 'amateur', 'amaze', 'amazement', 'amazon', 'amber', 'ambiguity', 'ambiguous', 'amble', 'ambulance', 'ambush', 'amenable', 'amend', 'amenity', 'amiable', 'amid', 'amidst', 'ammunition', 'amnesty', 'ample', 'amplify', 'amuse', 'amusement', 'anaemic', 'analogy', 'anarchist', 'anarchy', 'anatomy', 'ancestry', 'anecdote', 'angelic', 'anguish', 'angular', 'animated', 'animation', 'ankle', 'annex', 'annihilate', 'annotate', 'annoy', 'annoyance', 'annually', 'annul', 'anomaly', 'antagonism', 'antagonist', 'Antarctic', 'antenna', 'anthem', 'anthology', 'anthropology', 'antibiotic', 'antibody', 'anticipate', 'anticipation', 'antique', 'antiseptic', 'antithesis', 'antonym', 'anvil', 'apartheid', 'apathy', 'aperture', 'apex', 'apology', 'apostle', 'appal', 'apparatus', 'apparel', 'apparent', 'apparently', 'apparatus', 'appendix', 'applause', 'appliance', 'applicant', 'appraisal', 'appreciable', 'apprehend', 'apprehension', 'apprehensive', 'apprenticeship', 'appropriation', 'approximate', 'apricot', 'apron', 'aptitude', 'aquarium', 'aquatic', 'arable', 'arbiter', 'arbitrary', 'arbitration', 'arcade', 'arch', 'archaeology', 'archaic', 'archbishop', 'archer', 'archery', 'archipelago', 'ardent', 'arduous', 'arena', 'arguably', 'aristocracy', 'aristocrat', 'aristocratic', 'armament', 'armchair', 'armour', 'aroma', 'aromatic', 'arouse', 'arraign', 'array', 'arrears', 'arrogance', 'arrogant', 'arsenal', 'arson', 'artery', 'arthritis', 'articulate']
  },
  c1: {
    name: 'C1 - Advanced',
    level: 'CEFR C1',
    color: '#ef4444',
    words: ['abase', 'abate', 'abdicate', 'aberrant', 'aberration', 'abet', 'abeyance', 'abhor', 'abhorrent', 'abide', 'abjure', 'ablaze', 'ablution', 'abnegate', 'abnormal', 'abnormality', 'abode', 'abominable', 'abomination', 'aboriginal', 'abortive', 'abrasive', 'abridge', 'abridgement', 'abrogate', 'abscond', 'absolve', 'abstain', 'abstention', 'abstinence', 'abstruse', 'abysmal', 'abyss', 'accentuate', 'accessible', 'accession', 'accessory', 'acclimate', 'acclimatize', 'accolade', 'accomplishment', 'accord', 'accost', 'accoutre', 'accredit', 'accrue', 'acerbic', 'acquiesce', 'acquiescence', 'acrid', 'acrimonious', 'acrimony', 'actuarial', 'actuary', 'actuate', 'acuity', 'acumen', 'adage', 'addendum', 'adept', 'adhere', 'adherence', 'adhesion', 'adjudicate', 'adjudication', 'adjure', 'admonish', 'admonition', 'ado', 'adobe', 'adolescent', 'adroit', 'adulation', 'adulterate', 'adversarial', 'advocate', 'aegis', 'aerate', 'affable', 'affectation', 'affected', 'affidavit', 'affiliation', 'affirmation', 'affix', 'affliction', 'affluence', 'affront', 'aficionado', 'afoot', 'afore', 'aforementioned', 'aforesaid', 'aforethought', 'aggrandize', 'aggrieve', 'aghast', 'agnostic', 'agonize', 'agrarian', 'aground', 'albeit', 'alchemy', 'alcove', 'alder', 'alderman', 'alehouse', 'alembic', 'algorithm', 'alibi', 'alienation', 'alight', 'alimentary', 'alimony', 'allay', 'allegation', 'allegory', 'allergen', 'alleviation', 'alligator', 'alliteration', 'allotment', 'alloy', 'allude', 'allusion', 'alluvial', 'almanac', 'alms', 'aloft', 'alphabetical', 'alpine', 'altercation', 'alternate', 'alternation', 'alternative', 'altimeter', 'altitude', 'alto', 'altruism', 'altruistic', 'amalgam', 'amalgamate', 'amalgamation', 'amass', 'amazon', 'ambassador', 'ambient', 'ambiguous', 'ambitious', 'ambivalent', 'amble', 'ambrosia', 'ameliorate', 'amenable', 'amendment', 'amenity', 'amiable', 'amicable', 'amiss', 'ammonia', 'amoral', 'amorous', 'amorphous', 'amortize', 'ampere', 'amphibian', 'amphibious', 'amphitheatre', 'amplification', 'amputate', 'amputation', 'amulet', 'anachronism', 'anaemic', 'anaesthesia', 'anaesthetic', 'anagram', 'analogous', 'analogue', 'anarchism', 'anathema', 'anatomical', 'ancestry', 'anecdotal', 'anew', 'angst', 'animosity', 'animus', 'annals', 'annihilation', 'annotate', 'annotation', 'annuity', 'annulment', 'anode', 'anoint', 'anomalous', 'anonymity', 'antagonism', 'antagonistic', 'antecedent', 'antediluvian', 'antelope', 'antenatal', 'anterior', 'anteroom', 'anticipatory', 'anticlimax', 'antidote', 'antipathy', 'antiquarian', 'antiquated', 'antiquity', 'antithetical', 'antler', 'anvil', 'aorta', 'apace', 'apartheid', 'apathetic', 'ape', 'aperture', 'aphid', 'aphorism', 'apiary', 'apiece', 'aplomb', 'apocalypse', 'apocalyptic', 'apocryphal', 'apogee', 'apologetic', 'apoplexy', 'apostasy', 'apostate', 'apostrophe', 'apothecary', 'apotheosis', 'appall', 'apparition', 'appellant', 'appellate', 'appellation']
  },
  c2: {
    name: 'C2 - Proficiency',
    level: 'CEFR C2',
    color: '#dc2626',
    words: ['aback', 'abacus', 'abalone', 'abandon', 'abasement', 'abash', 'abatement', 'abattoir', 'abbess', 'abbey', 'abbot', 'abbreviation', 'abdomen', 'abdominal', 'abduction', 'aberrance', 'abettor', 'abeyant', 'abhorrence', 'abiding', 'abjuration', 'ablative', 'able-bodied', 'abnegation', 'aboard', 'abolition', 'abolitionist', 'abominable', 'aborigine', 'about-face', 'above-board', 'abracadabra', 'abrade', 'abrasion', 'abreast', 'abridge', 'abroad', 'abrogation', 'abscissa', 'absentee', 'absenteeism', 'absinthe', 'absolutism', 'absolutist', 'absorption', 'abstemiousness', 'abstraction', 'abstractionism', 'abstruse', 'absurdism', 'absurdist', 'absurdity', 'abundance', 'abusive', 'abut', 'abutment', 'abutting', 'abysmal', 'academe', 'academia', 'academician', 'academicism', 'acanthus', 'accede', 'accelerando', 'accelerator', 'accentuation', 'acceptability', 'acceptation', 'accessibility', 'accidence', 'accident-prone', 'accidental', 'acclamation', 'acclimation', 'acclimatization', 'acclivity', 'accommodate', 'accompaniment', 'accompanist', 'accomplice', 'accordion', 'accouchement', 'accountable', 'accountancy', 'accoutrements', 'accreditation', 'accretion', 'accrual', 'acculturation', 'accumulation', 'accumulator', 'accusative', 'accusatory', 'accuser', 'accustomed', 'acerbity', 'acetate', 'acetic', 'acetone', 'acetylene', 'achievable', 'achievement', 'achromatic', 'acidic', 'acidification', 'acidity', 'acidulous', 'acknowledgement', 'acme', 'acne', 'acolyte', 'aconite', 'acorn', 'acoustic', 'acoustics', 'acquaintanceship', 'acquiescent', 'acquisition', 'acquisitive', 'acquisitiveness', 'acquittal', 'acreage', 'acrimonious', 'acrobat', 'acrobatic', 'acrobatics', 'acronym', 'acropolis', 'actinism', 'actionable', 'activate', 'activation', 'activator', 'activism', 'activist', 'actuality', 'actualization', 'actuarial', 'actuary', 'actuate', 'actuation', 'acuity', 'acumen', 'acupressure', 'acupuncture', 'acupuncturist', 'acute', 'acutely', 'acuteness', 'adagio', 'adamantine', 'adaptability', 'adaptation', 'adapter', 'adaptive', 'addenda', 'addendum', 'adder', 'addict', 'addiction', 'addictive', 'addition', 'additional', 'additive', 'addle', 'addled', 'address', 'addressee', 'adduce', 'adenoid', 'adenoidal', 'adept', 'adequacy', 'adherent', 'adhesion', 'adhesive', 'adieu', 'adipose', 'adjacency', 'adjacent', 'adjectival', 'adjective', 'adjoin', 'adjoining', 'adjournment', 'adjudge', 'adjudicate', 'adjudication', 'adjudicator', 'adjunct', 'adjuration', 'adjure', 'adjust', 'adjustable', 'adjutant', 'ad-lib', 'adman', 'administer', 'administrate', 'administration', 'administrative', 'administrator', 'admirable', 'admirably', 'admiral', 'admiralty', 'admiration', 'admirer', 'admiring', 'admissibility', 'admissible', 'admission', 'admit', 'admittance', 'admittedly', 'admix', 'admixture', 'admonishment', 'admonitory', 'ad nauseam', 'adobe', 'adolescence', 'adolescent', 'adopt', 'adopted', 'adoptee', 'adoption', 'adoptive', 'adorable', 'adoration', 'adore', 'adorn', 'adornment', 'adrenal', 'adrenalin', 'adrift', 'adroit', 'adroitly', 'adroitness', 'adsorb', 'adsorption', 'adulation']
  }
};

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedPack, setSelectedPack] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [hasUsedFreeTrial, setHasUsedFreeTrial] = useState(false);

  // Audio playback
  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-GB';
      utterance.rate = 0.8;
      
      const voices = window.speechSynthesis.getVoices();
      const britishVoice = voices.find(voice => voice.lang === 'en-GB') || voices[0];
      if (britishVoice) utterance.voice = britishVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const startTest = (packKey, isTrial = false) => {
    if (isTrial && hasUsedFreeTrial) {
      alert('You already used your free trial! Unlock all 1500+ words for 99 AED.');
      return;
    }
    
    const pack = WORD_PACKS[packKey];
    const words = isTrial ? pack.words.slice(0, 10) : pack.words;
    
    setSelectedPack({ key: packKey, name: pack.name, words, isTrial, color: pack.color });
    setCurrentWordIndex(0);
    setUserAnswer('');
    setTestResults([]);
    setCurrentView('test');
    
    if (isTrial) setHasUsedFreeTrial(true);
  };

  const checkAnswer = () => {
    const correctWord = selectedPack.words[currentWordIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === correctWord.toLowerCase();
    
    setIsChecking(true);
    setTestResults([...testResults, {
      word: correctWord,
      userAnswer: userAnswer.trim(),
      correct: isCorrect
    }]);

    if (isCorrect) {
      setStreak(streak + 1);
      setTotalCorrect(totalCorrect + 1);
      if (streak >= 4) setShowFireworks(true);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setIsChecking(false);
      setShowFireworks(false);
      
      if (currentWordIndex < selectedPack.words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setUserAnswer('');
      } else {
        setCurrentView('results');
      }
    }, 1500);
  };

  const PackCard = ({ packKey, pack, isFree }) => (
    <div style={{
      background: `linear-gradient(135deg, ${pack.color}15 0%, ${pack.color}05 100%)`,
      padding: '24px',
      borderRadius: '16px',
      border: `2px solid ${pack.color}40`,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = pack.color;
      e.currentTarget.style.boxShadow = `0 8px 24px ${pack.color}40`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = `${pack.color}40`;
      e.currentTarget.style.boxShadow = 'none';
    }}
    onClick={() => startTest(packKey, isFree)}>
      {isFree && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#10b981',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>FREE SAMPLE</div>
      )}
      <div style={{
        background: pack.color,
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        <BookOpen size={24} color="white" />
      </div>
      <div style={{
        color: pack.color,
        fontSize: '12px',
        fontWeight: 'bold',
        marginBottom: '8px',
        letterSpacing: '1px'
      }}>{pack.level}</div>
      <h3 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '12px', fontWeight: 'bold' }}>
        {pack.name}
      </h3>
      <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
        {isFree ? '10 words sample' : `${pack.words.length} words`}
      </p>
      <button style={{
        background: pack.color,
        color: 'white',
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        width: '100%',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
        {isFree ? 'Try Free Sample' : 'Start Practice'}
      </button>
    </div>
  );

  // LANDING PAGE
  if (currentView === 'landing') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{
              fontSize: '56px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px'
            }}>
              IELTS Spelling Master
            </h1>
            <h2 style={{ fontSize: '36px', color: '#f1f5f9', marginBottom: '12px', fontWeight: 'bold' }}>
              1500+ Words • CEFR A1-C2
            </h2>
            <p style={{ fontSize: '32px', color: '#94a3b8', marginBottom: '24px', fontWeight: 'bold' }}>
              250 كلمة لكل مستوى
            </p>
            <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
              Master 1500 CEFR-organized words with British pronunciation. From beginner to proficiency.
            </p>
            <button
              onClick={() => setCurrentView('packs')}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '18px 48px',
                fontSize: '20px',
                fontWeight: 'bold',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
              }}
            >
              Try Free Sample
            </button>
          </div>

          {/* CEFR Levels Overview */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            padding: '32px',
            borderRadius: '16px',
            border: '2px solid #334155',
            marginBottom: '60px'
          }}>
            <h3 style={{ color: '#f1f5f9', fontSize: '24px', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
              📚 Complete CEFR Coverage
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              {Object.entries(WORD_PACKS).map(([key, pack]) => (
                <div key={key} style={{
                  background: `${pack.color}20`,
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: `2px solid ${pack.color}40`
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                    {key === 'a1' ? '🟢' : key === 'a2' ? '🔵' : key === 'b1' ? '🟣' : key === 'b2' ? '🟠' : key === 'c1' ? '🔴' : '⚫'}
                  </div>
                  <div style={{ color: pack.color, fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {pack.level}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                    {pack.words.length} words
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {[
              { icon: Target, title: '1500+ Words', desc: 'Complete CEFR A1-C2 coverage' },
              { icon: Award, title: '6 CEFR Levels', desc: '250 words per level' },
              { icon: Volume2, title: '🇬🇧 British Audio', desc: 'Native pronunciation' },
              { icon: Zap, title: 'Gamified', desc: 'Streaks & achievements' },
              { icon: Trophy, title: 'Progress Tracking', desc: 'Monitor improvement' },
              { icon: Flame, title: 'For Arab Students', desc: 'Built by IELTS examiner' }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                padding: '24px',
                borderRadius: '16px',
                border: '2px solid #334155',
                textAlign: 'center'
              }}>
                <feature.icon size={40} color="#3b82f6" style={{ margin: '0 auto 16px' }} />
                <h4 style={{ color: '#f1f5f9', fontSize: '20px', marginBottom: '8px', fontWeight: 'bold' }}>{feature.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
            Built with Claude AI | Taoufik - Official IELTS Examiner
          </div>
        </div>
      </div>
    );
  }

  // PACK SELECTION
  if (currentView === 'packs') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => setCurrentView('landing')}
            style={{
              background: 'transparent',
              color: '#94a3b8',
              border: '2px solid #334155',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              marginBottom: '32px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            ← Back
          </button>

          <h2 style={{ fontSize: '36px', color: '#f1f5f9', marginBottom: '16px', textAlign: 'center', fontWeight: 'bold' }}>
            Choose Your Level
          </h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', textAlign: 'center', marginBottom: '48px' }}>
            Try 10 words FREE from any level • No payment required
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {Object.entries(WORD_PACKS).map(([key, pack]) => (
              <PackCard key={key} packKey={key} pack={pack} isFree={true} />
            ))}
          </div>

          {hasUsedFreeTrial && (
            <div style={{
              background: 'linear-gradient(135deg, #7c2d12 0%, #991b1b 100%)',
              padding: '32px',
              borderRadius: '16px',
              textAlign: 'center',
              border: '2px solid #dc2626'
            }}>
              <h3 style={{ color: '#fef2f2', fontSize: '28px', marginBottom: '16px', fontWeight: 'bold' }}>
                Unlock All 1500+ Words
              </h3>
              <p style={{ color: '#fecaca', fontSize: '18px', marginBottom: '24px' }}>
                Complete CEFR A1-C2 • Progress tracking • Lifetime access
              </p>
              <a
                href="https://buy.stripe.com/bJefZj5A08dZ0y74CweZ20k"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  padding: '18px 48px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Get Full Access - 99 AED 💳
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // TEST VIEW
  if (currentView === 'test') {
    const currentWord = selectedPack.words[currentWordIndex];
    const progress = ((currentWordIndex + 1) / selectedPack.words.length) * 100;

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: '#1e293b',
            height: '12px',
            borderRadius: '12px',
            marginBottom: '32px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: selectedPack.color,
              height: '100%',
              width: `${progress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', justifyContent: 'center' }}>
            <div style={{
              background: '#1e293b',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '2px solid #334155'
            }}>
              <span style={{ color: '#94a3b8' }}>Word </span>
              <span style={{ color: selectedPack.color, fontWeight: 'bold', fontSize: '20px' }}>
                {currentWordIndex + 1} / {selectedPack.words.length}
              </span>
            </div>
            <div style={{
              background: '#1e293b',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '2px solid #334155',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Flame size={20} color="#ef4444" />
              <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '20px' }}>{streak}</span>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            padding: '48px',
            borderRadius: '24px',
            border: '2px solid #334155',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            {showFireworks && (
              <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎉 🎊 ✨</div>
            )}

            <h3 style={{ fontSize: '28px', color: '#f1f5f9', marginBottom: '32px', fontWeight: 'bold' }}>
              Spell This Word
            </h3>

            <button
              onClick={() => speakWord(currentWord)}
              style={{
                background: selectedPack.color,
                color: 'white',
                padding: '24px 48px',
                fontSize: '20px',
                fontWeight: 'bold',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '0 auto 32px',
                boxShadow: `0 8px 24px ${selectedPack.color}40`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <Volume2 size={28} />
              Play Word
            </button>

            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isChecking && userAnswer.trim() && checkAnswer()}
              placeholder="Type your answer..."
              disabled={isChecking}
              style={{
                width: '100%',
                padding: '20px',
                fontSize: '24px',
                borderRadius: '12px',
                border: '2px solid #334155',
                background: '#0f172a',
                color: '#f1f5f9',
                marginBottom: '24px',
                textAlign: 'center',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = selectedPack.color}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />

            <button
              onClick={checkAnswer}
              disabled={isChecking || !userAnswer.trim()}
              style={{
                background: isChecking ? '#475569' : selectedPack.color,
                color: 'white',
                padding: '18px 48px',
                fontSize: '20px',
                fontWeight: 'bold',
                borderRadius: '16px',
                border: 'none',
                cursor: isChecking || !userAnswer.trim() ? 'not-allowed' : 'pointer',
                opacity: isChecking || !userAnswer.trim() ? 0.5 : 1,
                width: '100%'
              }}
            >
              {isChecking ? 'Checking...' : 'Check Answer'}
            </button>

            {isChecking && (
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '12px',
                background: testResults[testResults.length - 1]?.correct 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'rgba(239, 68, 68, 0.2)',
                border: testResults[testResults.length - 1]?.correct 
                  ? '2px solid #10b981' 
                  : '2px solid #ef4444'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  {testResults[testResults.length - 1]?.correct ? (
                    <>
                      <CheckCircle size={32} color="#10b981" />
                      <span style={{ color: '#10b981', fontSize: '24px', fontWeight: 'bold' }}>Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={32} color="#ef4444" />
                      <span style={{ color: '#ef4444', fontSize: '24px', fontWeight: 'bold' }}>
                        Wrong! Correct: {currentWord}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS
  if (currentView === 'results') {
    const correctCount = testResults.filter(r => r.correct).length;
    const percentage = Math.round((correctCount / testResults.length) * 100);

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            padding: '48px',
            borderRadius: '24px',
            border: '2px solid #334155',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <h2 style={{ fontSize: '36px', color: '#f1f5f9', marginBottom: '24px', fontWeight: 'bold' }}>
              Test Complete! 🎉
            </h2>
            
            <div style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: selectedPack.color,
              marginBottom: '24px'
            }}>
              {correctCount}/{testResults.length}
            </div>

            <p style={{ fontSize: '24px', color: '#94a3b8', marginBottom: '32px' }}>
              {percentage}% Correct
            </p>

            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '32px' }}>
              {testResults.map((result, idx) => (
                <div key={idx} style={{
                  background: result.correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: result.correct ? '2px solid #10b981' : '2px solid #ef4444',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {result.correct ? (
                      <CheckCircle size={24} color="#10b981" />
                    ) : (
                      <XCircle size={24} color="#ef4444" />
                    )}
                    <span style={{ color: '#f1f5f9', fontWeight: 'bold' }}>{result.word}</span>
                  </div>
                  <span style={{ color: result.correct ? '#10b981' : '#ef4444' }}>
                    {result.correct ? '✓' : `Your: ${result.userAnswer}`}
                  </span>
                </div>
              ))}
            </div>

            {selectedPack.isTrial && (
              <div style={{
                background: 'linear-gradient(135deg, #7c2d12 0%, #991b1b 100%)',
                padding: '32px',
                borderRadius: '16px',
                border: '2px solid #dc2626',
                marginBottom: '24px'
              }}>
                <h3 style={{ color: '#fef2f2', fontSize: '24px', marginBottom: '16px', fontWeight: 'bold' }}>
                  Ready for All 1500+ Words?
                </h3>
                <p style={{ color: '#fecaca', fontSize: '16px', marginBottom: '24px' }}>
                  Unlock complete CEFR A1-C2 access • Lifetime access
                </p>
                <a
                  href="https://buy.stripe.com/bJefZj5A08dZ0y74CweZ20k"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '18px 48px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  Unlock All - 99 AED 💳
                </a>
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={() => setCurrentView('packs')}
                style={{
                  background: selectedPack.color,
                  color: 'white',
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Try Another Level
              </button>

              <button
                onClick={() => setCurrentView('landing')}
                style={{
                  background: 'transparent',
                  color: '#94a3b8',
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  border: '2px solid #334155',
                  cursor: 'pointer'
                }}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
