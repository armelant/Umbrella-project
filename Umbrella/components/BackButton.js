import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BackButton = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  console.log('Rendering BackButton');

  return (
    <TouchableOpacity
      style={[styles.backButtonWrapper, { top: insets.top + 10 }]}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name={'arrow-back-outline'} color={'#fff'} size={23} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonWrapper: {
    position: 'absolute',
    left: 16,
    top: 40,
    backgroundColor: '#003d87',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30, // Сделаем кнопку немного меньше
    width: 30,
  },
});

export default BackButton;
