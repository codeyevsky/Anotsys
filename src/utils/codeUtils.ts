// 'commentPatterns' objesini dışa aktarıyoruz

// 'commentPatterns' objesini dışa aktarıyoruz
export const commentPatterns = {
  python: {
    singleLine: /(#.*)$/gm,
    multiLine: /(?:"""[\s\S]*?""")|(?:'''[\s\S]*?''')/g,
  },
  javascript: {
    singleLine: /(\/\/.*)$/gm,
    multiLine: /(\/\*[\s\S]*?\*\/)/g,
  },
  java: {
    singleLine: /(\/\/.*)$/gm,
    multiLine: /(\/\*[\s\S]*?\*\/)/g,
  },
  "c++": {
    singleLine: /(\/\/.*)$/gm,
    multiLine: /(\/\*[\s\S]*?\*\/)/g,
  },
  css: {
    singleLine: null,
    multiLine: /(\/\*[\s\S]*?\*\/)/g,
  },
};

type Language = keyof typeof commentPatterns;

// 'removeComments' fonksiyonunu dışa aktarıyoruz
export const removeComments = (code: string, language: Language): string => {
  const patterns = commentPatterns[language];

  let cleanedCode = code;

  // Multi-line yorumlar varsa temizle
  if (patterns.multiLine) {
    cleanedCode = cleanedCode.replace(patterns.multiLine, "");
  }

  // Single-line yorumlar varsa temizle
  if (patterns.singleLine) {
    cleanedCode = cleanedCode.replace(patterns.singleLine, "");
  }

  // Fonksiyonun her zaman bir string döndürdüğünden emin ol
  return cleanedCode || "";
};

// 'supportedLanguages' dizisini dışa aktarıyoruz
export const supportedLanguages = Object.keys(commentPatterns) as Language[];