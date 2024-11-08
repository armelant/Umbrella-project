// ProfileButton.js
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileButton = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[styles.profileButton, { top: insets.top + 10 }]}
      onPress={() => navigation.navigate('Profile')}
    >
      <Image
        source={require('../assets/user.png')}
        style={styles.profileIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#003d87',
    borderRadius: 15,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
});

export default ProfileButton;
