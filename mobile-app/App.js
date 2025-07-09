import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
          <View style={styles.container}>
      <Text style={styles.title}>Lilou Logistique</Text>
        <Text>Bienvenue dans l'application mobile !</Text>
            <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
    },
    title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
    },
});
