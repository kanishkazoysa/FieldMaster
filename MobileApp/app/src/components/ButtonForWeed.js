import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';

export default function ButtonForWeed() {
  const [pressed, setPressed] = useState(null);

  return (
    <PaperProvider>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, marginTop: -5 }}>
        <Button
          style={[styles.button, pressed === 'low' && styles.pressedButton]}
          labelStyle={[styles.text, pressed === 'low' && styles.pressedText]}
          mode="contained-tonal"
          onPress={() => setPressed('low')}>
          Low
        </Button>
        <Button
          style={[styles.button, pressed === 'medium' && styles.pressedButton]}
          labelStyle={[styles.text, pressed === 'medium' && styles.pressedText]}
          mode="contained-tonal"
          onPress={() => setPressed('medium')}>
          Medium
        </Button>
        <Button
          style={[styles.button, pressed === 'high' && styles.pressedButton]}
          labelStyle={[styles.text, pressed === 'high' && styles.pressedText]}
          mode="contained-tonal"
          onPress={() => setPressed('high')}>
          High
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#CED0D4',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 11,
    width: 90,
    height: 40,
    marginBottom: 5,
    marginLeft: -70,
    marginTop: 25,
    padding: -10
  },
  pressedButton: {
    borderColor: '#0866FF', 
  },
  text: {
    marginLeft: 3,
    marginRight: 3,
    fontSize: 14,
    color: '#CED0D4',
  },
  pressedText: {
    color: '#0866FF', 
  },
});