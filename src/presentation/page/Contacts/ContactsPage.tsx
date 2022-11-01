import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ContactsList from '../../components/ContactsList/ContactsList';
import styles from './ContactsPage.style';

const ContactsPage = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ContactsList />
    </SafeAreaView>
  );
};

export default ContactsPage;
