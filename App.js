import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

const BUTTON_SIZE = 80;

// Об'єкт операцій
const operations = {
  '+': (a, b) => parseFloat(a) + parseFloat(b),
  '-': (a, b) => parseFloat(a) - parseFloat(b),
  '*': (a, b) => parseFloat(a) * parseFloat(b),
  '/': (a, b) => parseFloat(a) / parseFloat(b),
};

export default function App() {
  const [display, setDisplay] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handlePress = (num) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op) => {
    setFirstValue(display);
    setOperator(op);
    setDisplay('0');
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstValue(null);
    setOperator(null);
  };

  const handleDot = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleToggleSign = () => setDisplay((parseFloat(display) * -1).toString());
  const handlePercentage = () => setDisplay((parseFloat(display) / 100).toString());

  const handleEqual = () => {
    if (firstValue !== null && operator !== null) {
      let result = operations[operator](firstValue, display);
      result = parseFloat(result.toPrecision(12)); 
      setDisplay(result.toString());
      setFirstValue(null);
      setOperator(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.keypad}>
        {/* Ряд 1 */}
        <View style={styles.row}>
          <MyButton title="C" onPress={clearDisplay} color="#a5a5a5" textColor="#000" />
          <MyButton title="+/-" onPress={handleToggleSign} color="#a5a5a5" textColor="#000" />
          <MyButton title="%" onPress={handlePercentage} color="#a5a5a5" textColor="#000" />
          <MyButton title="÷" onPress={() => handleOperator('/')} color="#ff9f0a" />
        </View>

        {/* Ряд 2 */}
        <View style={styles.row}>
          <MyButton title="7" onPress={() => handlePress('7')} />
          <MyButton title="8" onPress={() => handlePress('8')} />
          <MyButton title="9" onPress={() => handlePress('9')} />
          <MyButton title="×" onPress={() => handleOperator('*')} color="#ff9f0a" />
        </View>

        {/* Ряд 3 */}
        <View style={styles.row}>
          <MyButton title="4" onPress={() => handlePress('4')} />
          <MyButton title="5" onPress={() => handlePress('5')} />
          <MyButton title="6" onPress={() => handlePress('6')} />
          <MyButton title="-" onPress={() => handleOperator('-')} color="#ff9f0a" />
        </View>

        {/* Ряд 4 */}
        <View style={styles.row}>
          <MyButton title="1" onPress={() => handlePress('1')} />
          <MyButton title="2" onPress={() => handlePress('2')} />
          <MyButton title="3" onPress={() => handlePress('3')} />
          <MyButton title="+" onPress={() => handleOperator('+')} color="#ff9f0a" />
        </View>

        <View style={styles.row}>
          <MyButton title="0" onPress={() => handlePress('0')} style={styles.buttonZero} />
          <MyButton title="." onPress={handleDot} />
          <MyButton title="=" onPress={handleEqual} color="#ff9f0a" />
        </View>
      </View>
    </SafeAreaView>                                               
  );
}


const MyButton = ({ title, onPress, color = '#333333', textColor = '#fff', style }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }, style]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '300',
  },
  keypad: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    marginBottom: 15,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonZero: {
    width: BUTTON_SIZE * 2 + 15, 
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '400',
  },
});