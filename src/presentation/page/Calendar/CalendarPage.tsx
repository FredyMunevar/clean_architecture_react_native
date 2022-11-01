import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './CalendarPage.style';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import RNCalendarEvents from 'react-native-calendar-events';

const CalendarPage = () => {
  useEffect(() => {
    RNCalendarEvents.requestPermissions()
      .then(res => {
        console.log('permission reponse', res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CalendarComponent />
    </SafeAreaView>
  );
};

export default CalendarPage;
