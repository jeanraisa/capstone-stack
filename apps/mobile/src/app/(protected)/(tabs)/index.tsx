import { BlurView } from "expo-blur";
import type React from "react";
import { View } from "react-native";

const Home: React.FC = () => {
  return (
    <View>
      <BlurView
        intensity={30}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </View>
  );
};

export default Home;
