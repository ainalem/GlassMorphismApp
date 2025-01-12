import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const App: React.FC = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZsb3dlcnxlbnwwfHx8fDE2ODgwMzA3NTg&ixlib=rb-4.0.3&q=80&w=1080',
      }}
      style={styles.background}>
      <View style={styles.container}>
        {/* Blurred Glass Effect */}
        <BlurView
          style={styles.glassEffect}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />

        {/* Clear Text Positioned Above the BlurView */}
        <Text style={styles.text}>Glassmorphism Effect</Text>
      </View>
    </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassEffect: {
    width: 300,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Subtle border
    position: 'absolute',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute', // Position the text over the BlurView
    top: '50%',
    left: '50%',
    transform: [{translateX: -150}, {translateY: -10}], // Center the text
    width: 300,
  },
});
