import { createUser } from "@/services/userservices";
import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Importar para navegación

export default function SignupScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Usar el hook para navegación

  const handleRegister = async () => {
    if (!email || !password || !name || !phone) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const user = await createUser(email, password, name, phone);
      Alert.alert("Success", `User ${user.name} created successfully!`);

      // Redirigir a la pantalla de Log In
      router.push("/login"); // Aquí se cambia a la ruta de la pantalla de inicio de sesión
    } catch (error) {
      Alert.alert("Error", "Failed to create user. Please try again.");
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/SignUp3.png')} // Verifica que la ruta sea correcta
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.outerFrame}>
        <TouchableOpacity style={styles.switchButton}>
          <Text style={styles.switchButtonText}>Log In / Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#A8A8A8"
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A8A8A8"
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#A8A8A8"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#A8A8A8"
          />
        </View>
        <TouchableOpacity
          style={[styles.registerButton, { opacity: loading ? 0.6 : 1 }]}
          onPress={loading ? undefined : handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? "Registrando..." : "Registrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  outerFrame: {
    width: '85%', 
    maxWidth: 310, 
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: "rgba(37, 104, 71, .9)",
    borderRadius: 20,
    alignItems: "center",
  },
  switchButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#5F7F1E",
    paddingHorizontal: 15,
    marginBottom: 41,
  },
  switchButtonText: {
    fontSize: 16,
    color: "#ffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 41,
    color: "#FFFF",
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  registerButton: {
    borderRadius: 20,
    backgroundColor: '#5F7F1E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'medium',
  },
});
