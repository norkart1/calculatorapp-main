import { StyleSheet, ScrollView, Pressable, Text, View, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { APP_INFO } from '@/constants/app-info';

export default function AboutScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.buttonBackground }]}>
        <Pressable 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About Calculator</Text>
          <Text style={[styles.text, { color: colors.text }]}>
            A simple and elegant calculator app with support for basic arithmetic operations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
          <Text style={[styles.text, { color: colors.text }]}>• Basic arithmetic operations (addition, subtraction, multiplication, division)</Text>
          <Text style={[styles.text, { color: colors.text }]}>• Modulo (remainder) calculations</Text>
          <Text style={[styles.text, { color: colors.text }]}>• Decimal support</Text>
          <Text style={[styles.text, { color: colors.text }]}>• Clear function to reset</Text>
          <Text style={[styles.text, { color: colors.text }]}>• Backspace to delete last digit</Text>
          <Text style={[styles.text, { color: colors.text }]}>• Dark and light mode support</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>How to Use</Text>
          <Text style={[styles.text, { color: colors.text }]}>1. Enter numbers using the number buttons (0-9)</Text>
          <Text style={[styles.text, { color: colors.text }]}>2. Select an operation (+, −, ×, ÷, %)</Text>
          <Text style={[styles.text, { color: colors.text }]}>3. Enter the second number</Text>
          <Text style={[styles.text, { color: colors.text }]}>4. Press = to see the result</Text>
          <Text style={[styles.text, { color: colors.text }]}>Use C to clear or ⌫ to delete the last digit</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Developer</Text>
          <Text style={[styles.text, { color: colors.text }]}>{APP_INFO.developer}</Text>
          <Pressable
            onPress={() => Linking.openURL('https://github.com/norkart1')}
            style={[styles.githubLink, { backgroundColor: colors.buttonBackground }]}
          >
            <Text style={[styles.githubText, { color: colors.accentButton }]}>GitHub Profile</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Version</Text>
          <Text style={[styles.text, { color: colors.text }]}>Calculator v{APP_INFO.version}</Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  githubLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  githubText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
