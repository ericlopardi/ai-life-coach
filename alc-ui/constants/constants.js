export const UI_CONSTANTS = {
    MOOD_EMOJIS: ['🙁', '😕', '😐', '🙂', '😄'],
    MOOD_LABELS: ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'],
    DEFAULT_AFFIRMATION: "You are capable of achieving great things.",
};

export const ROUTES = {
  MOOD: '/(mood)',
  MOOD_NEW_ENTRY: '/(mood)/new-entry',
  JOURNAL: '/(journal)',
  JOURNAL_NEW_ENTRY: '/(journal)/new-entry',
  GOALS: '/(goals)',
  PUBLIC_REDIRECT: '/(auth)/signIn',
  PROTECTED_REDIRECT: '/(tabs)/(home)' 
};

export const GENERAL = {
  AUTHORIZATION_TOKEN: 'AuthorizationToken'
}