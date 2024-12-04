
export type Language = 'en' | 'tr';

export function getTranslation(translations: Record<Language, Record<string, string>>, lang: Language = 'en') {
  return translations[lang];
}

export function replaceVariables(text: string, variables: Record<string, string>) {
  return Object.entries(variables).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    text
  );
} 