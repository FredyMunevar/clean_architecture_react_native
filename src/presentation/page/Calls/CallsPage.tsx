import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CallsComponent from '../../components/CallsComponent/CallsComponent';
import styles from './CallsPage.style';

const CallsPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CallsComponent />
    </SafeAreaView>
  );
};

export default CallsPage;
