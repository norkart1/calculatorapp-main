import { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colorScheme = isDarkMode ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(formatNumber(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '−':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const formatNumber = (num: number): string => {
    if (num.toString().length > 10) {
      return num.toExponential(5);
    }
    return num.toString();
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(formatNumber(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({
    label,
    onPress,
    isOperation,
  }: {
    label: string;
    onPress: () => void;
    isOperation?: boolean;
  }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isOperation ? colors.accentButton : colors.buttonBackground,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: isOperation ? '#fff' : colors.buttonText,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.buttonBackground }]}>
        <Link href="/about" asChild>
          <Pressable style={styles.menuButton}>
            <View style={styles.infoIconWrapper}>
              <Text style={[styles.infoIconText, { color: colors.text }]}>i</Text>
            </View>
          </Pressable>
        </Link>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>Nork Calc</Text>
        <Pressable 
          onPress={toggleTheme}
          style={styles.themeButton}
        >
          <Text style={styles.themeButtonText}>
            {colorScheme === 'dark' ? '☀️' : '🌙'}
          </Text>
        </Pressable>
      </View>

      {/* Display */}
      <View style={[styles.display, { backgroundColor: colors.background }]}>
        <Text
          style={[
            styles.displayText,
            {
              color: colors.text,
              opacity: 0.6,
            },
          ]}
        >
          {operation && previousValue !== null
            ? `${formatNumber(previousValue)}${operation}${
                !waitingForNewValue ? display : ''
              }`.replace(/×/, '×').replace(/÷/, '÷').replace(/−/, '−')
            : ''}
        </Text>
        <Text
          style={[
            styles.mainDisplay,
            {
              color: colors.text,
            },
          ]}
        >
          {display}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button label="C" onPress={handleClear} />
          <Button label="÷" onPress={() => handleOperation('÷')} isOperation />
          <Button label="%" onPress={() => handleOperation('%')} isOperation />
          <Button label="+" onPress={() => handleOperation('+')} isOperation />
        </View>

        <View style={styles.row}>
          <Button label="7" onPress={() => handleNumber('7')} />
          <Button label="8" onPress={() => handleNumber('8')} />
          <Button label="9" onPress={() => handleNumber('9')} />
          <Button label="×" onPress={() => handleOperation('×')} isOperation />
        </View>

        <View style={styles.row}>
          <Button label="4" onPress={() => handleNumber('4')} />
          <Button label="5" onPress={() => handleNumber('5')} />
          <Button label="6" onPress={() => handleNumber('6')} />
          <Button label="−" onPress={() => handleOperation('−')} isOperation />
        </View>

        <View style={styles.row}>
          <Button label="1" onPress={() => handleNumber('1')} />
          <Button label="2" onPress={() => handleNumber('2')} />
          <Button label="3" onPress={() => handleNumber('3')} />
          <Button label="+" onPress={() => handleOperation('+')} isOperation />
        </View>

        <View style={styles.row}>
          <Button label="." onPress={handleDecimal} />
          <Button label="0" onPress={() => handleNumber('0')} />
          <Button label="⌫" onPress={handleBackspace} />
          <Button label="=" onPress={handleEquals} isOperation />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  menuButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  themeButton: {
    padding: 8,
    marginRight: -8,
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  displayText: {
    fontSize: 18,
    marginBottom: 8,
    minHeight: 24,
  },
  mainDisplay: {
    fontSize: 56,
    fontWeight: '700',
    marginBottom: 8,
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  infoIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIconText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  themeButtonText: {
    fontSize: 20,
  },
});
