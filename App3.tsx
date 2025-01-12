import React, {useRef, useState, useCallback} from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const App: React.FC = () => {
  const screenHeight = Dimensions.get('window').height; // Screen height
  const [blurViewHeight, setBlurViewHeight] = useState(0); // State to store BlurView height
  const animatedValue = useRef(new Animated.Value(0)).current; // Animated value

  // Material UI Easings
  const materialEaseOut = Easing.bezier(0.0, 0, 0.2, 1); // Ease out (entering)
  const materialEaseIn = Easing.bezier(0.4, 0, 1, 1); // Ease in (leaving)

  // Function to start the animation sequence
  const startAnimation = useCallback(() => {
    if (blurViewHeight > 0) {
      // Calculate the start and end positions dynamically
      const startValue = 0; // End in the middle of the screen
      const endValue = -(screenHeight + blurViewHeight) / 2; // Start from outside the top of the screen

      animatedValue.setValue(startValue); // Start animation from the calculated position

      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: endValue, // Move to the center
          duration: 1000, // Duration for the first movement
          easing: materialEaseOut, // Entering animation
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: endValue, // Hold at the center
          duration: 2000, // Pause for 4 seconds
          easing: Easing.linear, // Hold without easing
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: startValue, // Move back outside the screen
          duration: 1000, // Duration for the second movement
          easing: materialEaseIn, // Leaving animation
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    animatedValue,
    blurViewHeight,
    screenHeight,
    materialEaseOut,
    materialEaseIn,
  ]);

  return (
    <View style={styles.container}>
      {/* Background Image and Static Content */}
      <View style={styles.contentContainer}>
        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          style={styles.background}>
          {/* Static Text */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Glassmorphism Effect</Text>
          </View>
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

          {/* Button to Start the Animation */}
          <TouchableOpacity style={styles.button} onPress={startAnimation}>
            <Text style={styles.buttonText}>Start Animation</Text>
          </TouchableOpacity>
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
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    display: 'none',
    marginTop: 100,
    marginHorizontal: 20,
    padding: 20,
  },
  title: {
    color: '#242424',
    fontSize: 42,
    textAlign: 'center',
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
    height: 250, // Increased height for button
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
    marginBottom: 20, // Add spacing between the text and the button
  },
  button: {
    backgroundColor: '#242424',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
