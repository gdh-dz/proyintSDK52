import { Text, View } from "react-native";
import { Link } from 'expo-router';
import React from "react";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/">View user</Link>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
