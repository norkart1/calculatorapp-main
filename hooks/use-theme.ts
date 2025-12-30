import { useColorScheme as useSystemColorScheme } from 'react-native';

export function useTheme() {
  const systemScheme = useSystemColorScheme();
  const colorScheme = (systemScheme || 'light') as 'light' | 'dark';
  
  return {
    colorScheme,
    toggleTheme: () => {},
    isDarkMode: colorScheme === 'dark',
  };
}
