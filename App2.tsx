import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const App: React.FC = () => {
  const screenHeight = Dimensions.get('window').height; // Screen height
  const [blurViewHeight, setBlurViewHeight] = useState(0); // State to store BlurView height
  const animatedValue = useRef(new Animated.Value(0)).current; // Animated value
  const running = useRef(false); // Ref to ensure animation runs only once

  const startAnimation = () => {
    if (blurViewHeight > 0 && !running.current) {
      running.current = true; // Mark animation as running

      const startValue = -(screenHeight + blurViewHeight) / 2; // Start from outside the top of the screen
      const endValue = 0; // End in the middle of the screen

      animatedValue.setValue(startValue); // Start animation from the calculated position

      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: endValue, // Move to the center
          duration: 4000, // Duration for the first movement
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: startValue, // Move back outside the screen
          duration: 4000, // Duration for the second movement
          useNativeDriver: true,
        }),
      ]).start(() => {
        running.current = false; // Reset the flag
        startAnimation(); // Restart the animation
      });
    }
  };

  useEffect(() => {
    startAnimation(); // Start the animation when the component mounts
  }, [blurViewHeight, screenHeight]);

  return (
    <View style={styles.container}>
      {/* Background Image and Static Content */}
      <View style={styles.contentContainer}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZsb3dlcnxlbnwwfHx8fDE2ODgwMzA3NTg&ixlib=rb-4.0.3&q=80&w=1080',
          }}
          style={styles.background}>
          {/* Static Text */}
          <Text style={styles.title}>Glassmorphism Effect</Text>
        </ImageBackground>
      </View>

      {/* Animated BlurView Container */}
      <View style={styles.blurContainer}>
        <Animated.View
          style={[
            styles.animatedBlurView,
            {transform: [{translateY: animatedValue}]}, // Animate the Y position
          ]}>
          {/* BlurView with onLayout to measure its height */}
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
            onLayout={event => {
              const {height} = event.nativeEvent.layout;
              setBlurViewHeight(height); // Store the height dynamically
            }}
          />
          <Text style={styles.blurText}>Glassmorphism Effect</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1, // Take up the full screen
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 50,
  },
  blurContainer: {
    flex: 1, // Allow it to share space with the contentContainer
    position: 'absolute', // Ensure it layers on top of the background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBlurView: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, // Fill the Animated.View container
    backgroundColor: 'rgba(150, 150, 150, 0.4)', // Semi-transparent background
    borderRadius: 15, // Rounded corners
  },
  blurText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
