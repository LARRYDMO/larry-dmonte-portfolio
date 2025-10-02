// Centralized XP data and helpers
export const projects = [
  {
    id: 'moneymitra',
    title: 'MoneyMitra Mobile App',
    stack: 'React Native, Node.js, MongoDB, TypeScript',
    desc: 'Personal finance companion for tracking expenses, analyzing spending patterns, and budgeting effectively.',
    features: [
      'Cross‑platform React Native app (iOS / Android)',
      'Secure authentication & cloud data sync',
      'Visual analytics with categorized charts'
    ],
    links: { github: '', demo: '' }
  },
  {
    id: 'imvn',
    title: 'Interpreting Minds through Visual Narratives (IMVN)',
    stack: 'TrOCR, BERT, NLP, Flask',
    desc: 'Vision‑language system designed to extract and interpret narratives from images for mental health insights.',
    features: [
      'OCR extraction using TrOCR',
      'BERT-based sentiment / emotion interpretation',
      'Flask API backend for processing and serving results'
    ],
    links: { github: '', demo: '' }
  },
  {
    id: 'ovs',
    title: 'Online Voting System (OVS)',
    stack: 'PHP, MySQL',
    desc: 'Secure platform for conducting online elections with role-based access control.',
    features: [
      'Password hashing & session management',
      'Robust input validation & role authorization',
      'Optimized queries for real-time vote tallying'
    ],
    links: { github: '', demo: '' }
  },
  {
    id: 'movies',
    title: 'Movie Recommender System',
    stack: 'Flask, TF-IDF, Faiss, MovieLens',
    desc: 'Content-based movie recommendation system using TF‑IDF features and vector similarity search.',
    features: [
      'TF‑IDF feature extraction from movie metadata',
      'Faiss ANN index for efficient similarity lookup',
      'Interactive web UI for exploring recommendations'
    ],
    links: { github: '', demo: '' }
  },
  {
    id: 'news-sent',
    title: 'Indian News Sentiment Analysis',
    stack: 'LSTM, FastAPI, Live headlines',
    desc: 'Realtime sentiment analysis of Indian news headlines.',
    features: [
      'LSTM-based text classification',
      'FastAPI backend exposing sentiment endpoints',
      'Pipeline for streaming and processing live news feed'
    ],
    links: { github: '', demo: '' }
  },
  {
    id: 'audio-trans',
    title: 'Audio Translation Service',
    stack: 'Flask, SpeechRecognition, gTTS',
    desc: 'Speech‑to‑speech translation microservice with live streaming support.',
    features: [
      'Multilingual speech input & TTS output',
      'Streaming support for low-latency audio',
      'Flask APIs for translation & transcription'
    ],
    links: { github: '', demo: '' }
  },
  {
    id: 'speech-sent',
    title: 'Speech Sentiment Analyzer',
    stack: 'Flask, MongoDB, TextBlob, SpeechRecognition',
    desc: 'System to analyze sentiment directly from spoken audio.',
    features: [
      'Audio capture & transcription pipeline',
      'TextBlob-based sentiment scoring',
      'MongoDB storage for historical analytics'
    ],
    links: { github: '', demo: '' }
  }
];

export const projectXpMap: Record<string, number> = { moneymitra: 80, imvn: 120, ovs: 60, movies: 90, 'news-sent': 70, 'audio-trans': 50, 'speech-sent': 60 };
export const getProjectXp = (id: string) => projectXpMap[id] ?? 40;

export const skills = {
  Languages: [ { name: 'C/C++', prof: 'Advanced' }, { name: 'Java', prof: 'Advanced' }, { name: 'Python', prof: 'Expert' } ],
  Web: [ { name: 'HTML', prof: 'Expert' }, { name: 'CSS', prof: 'Advanced' }, { name: 'Bootstrap', prof: 'Advanced' }, { name: 'PHP', prof: 'Intermediate' }, { name: 'JavaScript', prof: 'Advanced' }, { name: 'React.js', prof: 'Advanced' } ],
  Databases: [ { name: 'MySQL', prof: 'Advanced' }, { name: 'PostgreSQL', prof: 'Intermediate' }, { name: 'MongoDB', prof: 'Advanced' } ],
  Tools: [
    { name: 'Git', prof: 'Advanced' },
    { name: 'Docker', prof: 'Basic' },
    { name: 'Redis', prof: 'Intermediate' },
    { name: 'Flask', prof: 'Advanced' },
    { name: 'LLM', prof: 'Advanced' },
    { name: 'RAG', prof: 'Intermediate' },
    { name: 'GenAI', prof: 'Intermediate' }
  ],
} as const;

export const profToXp = (prof: string) => {
  switch (prof.toLowerCase()) {
    case 'expert': return 80;
    case 'advanced': return 60;
    case 'intermediate': return 40;
    case 'beginner': return 20;
    default: return 30;
  }
};

export const experiences = [ {
  id: 'block-intel',
  title: 'AI Intern – Block Intelligence',
  timeframe: 'Feb–May 2025',
  xp: 120,
  summary: 'Built production AI features for an interior design generation & editing platform.',
  desc: 'Contributed end to end to an AI interior design platform integrating generative image models with 3D & segmentation tooling. Focused on rapid prototyping, inference optimization and building reusable backend modules that enabled faster iteration on new creative editing features.',
  responsibilities: [
    'Implemented Stable Diffusion based scene & furniture generation workflows with controllable prompts and safety filtering.',
    'Integrated Segment Anything (SAM) + GroundingDINO pipeline to enable object‑aware selection and localized in‑painting edits.'
  ],
  tech: ['Stable Diffusion', 'Python', 'Flask', 'SAM']
} ];

export const achievements = [ { name: 'Finalist – GDA', detail: 'Game Development Association', xp: 80 }, { name: 'Finalist – SIH 2023', detail: 'Smart India Hackathon', xp: 80 }, { name: 'Certified – OOP in Java', detail: 'Certification', xp: 40 } ];

export function getTotalXp() {
  const projectTotal = Object.values(projectXpMap).reduce((s, v) => s + v, 0);
  // skills: sum profToXp for all skills entries
  const skillTotal = Object.values(skills).flat().reduce((s: number, it: any) => s + profToXp(it.prof), 0);
  const expTotal = experiences.reduce((s, e) => s + (e.xp || 0), 0);
  const achTotal = achievements.reduce((s, a) => s + (a.xp || 0), 0);
  return projectTotal + skillTotal + expTotal + achTotal;
}
