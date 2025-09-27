// Centralized XP data and helpers
export const projects = [
  { id: 'moneymitra', title: 'MoneyMitra Mobile App', stack: 'React Native, Node.js, MongoDB, TypeScript', desc: 'Personal finance companion enabling expense tracking, insights, and budgeting.', features: ['Cross-platform RN app', 'Secure auth & sync', 'Charts & categorization'], links: { github: '', demo: '' } },
  { id: 'imvn', title: 'Interpreting Minds through Visual Narratives', stack: 'TrOCR, BERT, NLP, Flask', desc: 'Vision-language system to extract and interpret narratives from images.', features: ['OCR with TrOCR', 'BERT-based text inference', 'Flask APIs'], links: { github: '', demo: '' } },
  { id: 'ovs', title: 'Online Voting System', stack: 'PHP, MySQL', desc: 'Designed and developed a secure online voting platform with authentication and role-based access.', features: ['Implemented password hashing, session handling, and input validation.', 'Optimized MySQL queries to support real-time vote tallying.'], links: { github: '', demo: '' } },
  { id: 'movies', title: 'Movie Recommender System', stack: 'Flask, TF-IDF, Faiss, MovieLens', desc: 'Content-based movie recommendations with vector search.', features: ['TF-IDF features', 'Faiss ANN index', 'Interactive UI'], links: { github: '', demo: '' } },
  { id: 'news-sent', title: 'Indian News Sentiment Analysis', stack: 'LSTM, FastAPI, live headlines', desc: 'Realtime sentiment over Indian news streams.', features: ['LSTM classifier', 'FastAPI backend', 'Live feed pipeline'], links: { github: '', demo: '' } },
  { id: 'audio-trans', title: 'Audio Translation Service', stack: 'Flask, SpeechRecognition, gTTS', desc: 'Speech-to-speech translation microservice.', features: ['Multilingual', 'Streaming input', 'TTS output'], links: { github: '', demo: '' } },
  { id: 'speech-sent', title: 'Speech Sentiment Analyzer', stack: 'Flask, MongoDB, TextBlob, SpeechRecognition', desc: 'Analyze sentiment directly from speech.', features: ['Audio capture', 'Sentiment pipeline', 'Results storage'], links: { github: '', demo: '' } },
];

export const projectXpMap: Record<string, number> = { moneymitra: 80, imvn: 120, ovs: 60, movies: 90, 'news-sent': 70, 'audio-trans': 50, 'speech-sent': 60 };
export const getProjectXp = (id: string) => projectXpMap[id] ?? 40;

export const skills = {
  Languages: [ { name: 'C/C++', prof: 'Advanced' }, { name: 'Java', prof: 'Advanced' }, { name: 'Python', prof: 'Expert' } ],
  Web: [ { name: 'HTML', prof: 'Expert' }, { name: 'CSS', prof: 'Advanced' }, { name: 'Bootstrap', prof: 'Advanced' }, { name: 'PHP', prof: 'Intermediate' }, { name: 'JavaScript', prof: 'Advanced' }, { name: 'React.js', prof: 'Advanced' } ],
  Databases: [ { name: 'MySQL', prof: 'Advanced' }, { name: 'PostgreSQL', prof: 'Intermediate' }, { name: 'MongoDB', prof: 'Advanced' } ],
  Tools: [ { name: 'Git', prof: 'Advanced' }, { name: 'VSCode', prof: 'Advanced' }, { name: 'Flask', prof: 'Advanced' }, { name: 'Pandas', prof: 'Advanced' }, { name: 'NumPy', prof: 'Advanced' } ],
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

export const experiences = [ { id: 'block-intel', title: 'AI Intern – Block Intelligence', timeframe: 'Feb–May 2025', xp: 120, bullets: ['AI-powered interior design platform (Stable Diffusion, Blender, SAM)', 'Inpainting + object-aware furniture editing', 'Modular Flask backend for AI workflows'] } ];

export const achievements = [ { name: 'Finalist – GDA', detail: 'Game Development Arena', xp: 80 }, { name: 'Finalist – SIH 2023', detail: 'Smart India Hackathon', xp: 80 }, { name: 'Certified – OOP in Java', detail: 'Certification', xp: 40 } ];

export function getTotalXp() {
  const projectTotal = Object.values(projectXpMap).reduce((s, v) => s + v, 0);
  // skills: sum profToXp for all skills entries
  const skillTotal = Object.values(skills).flat().reduce((s: number, it: any) => s + profToXp(it.prof), 0);
  const expTotal = experiences.reduce((s, e) => s + (e.xp || 0), 0);
  const achTotal = achievements.reduce((s, a) => s + (a.xp || 0), 0);
  return projectTotal + skillTotal + expTotal + achTotal;
}
