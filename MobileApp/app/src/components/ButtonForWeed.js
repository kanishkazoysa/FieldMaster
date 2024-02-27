// import React,{useState} from 'react';
// import { StyleSheet,View } from 'react-native';
// import { PaperProvider, Button } from 'react-native-paper';

// export default function ButtonForWeed() {
  
//   return (
//     <PaperProvider>
//       <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, marginTop:-10}}>
//       <Button style={styles.button}
//       labelStyle={styles.text}
//         buttonColor='#FFFFFF' mode="contained-tonal" onPress={() => console.log('Pressed')}>
//         Low
//       </Button>
//       <Button style={styles.button}
//       labelStyle={styles.text}
//         buttonColor='#FFFFFF' mode="contained-tonal" onPress={() => console.log('Pressed')}>
//           Medium
//       </Button>
//       <Button style={styles.button}
//       labelStyle={styles.text}
//         buttonColor='#FFFFFF' mode="contained-tonal" onPress={() => console.log('Pressed')}>
//           High
//       </Button>
//       </View>
//     </PaperProvider>
    
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     borderColor: '#CED0D4',
//     borderWidth: 1,
//     backgroundColor: '#fff',
//     borderRadius: 11,
//     width: 90,
//     height: 40,
//     marginBottom: 5,
//     marginLeft:-70,
//     marginTop:40,
//   },
//   text:{
//     marginLeft:3,
//     marginRight:3,
//     fontSize:16,
//     color: '#CED0D4',
//   }

// })

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';

export default function ButtonForWeed() {
  const [pressed, setPressed] = useState(null);

  return (
    <PaperProvider>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
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
    marginLeft: -70,
    marginTop: 30,
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

