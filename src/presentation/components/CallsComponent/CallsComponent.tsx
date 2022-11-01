import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  SafeAreaView,
} from 'react-native';

import CallDetectorManager from 'react-native-call-detection';
import styles from './CallsComponent.styles';

const msToMinSec = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
};
const msToTime = (milliseconds: number) => {
  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  };
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
};

const CallsComponent = () => {
  let callDetector: {dispose: () => any} | undefined = undefined;
  const [callStates, setCallStates] = useState<any[]>([]);
  const [isStart, setIsStart] = useState(false);
  const [flatListItems, setFlatListItems] = useState<any[]>([]);

  const callFriendTapped = () => {
    Linking.openURL('tel:3042923745').catch(err => {
      console.log(err);
    });
  };
  let startTime: number;
  let endTime: number;
  let callDuration: number = 0;

  const startStopListener = () => {
    if (isStart) {
      callDetector && callDetector.dispose();
    } else {
      callDetector = new CallDetectorManager((event: string) => {
        const time = Date.now();
        switch (event) {
          case 'Connected':
            startTime = time;
            console.log('entro al ', event, ' ', startTime);
            break;
          case 'Offhook':
            startTime = time;
            console.log('entro al ', event, ' ', startTime);
            break;
          case 'Dialing':
            startTime = time;
            console.log('entro al ', event);
            break;
          case 'Incoming':
            console.log('entro al ', event);
            break;
          case 'Missed':
            console.log('entro al ', event);
            break;
          case 'Disconnected':
            endTime = time;
            console.log(
              'entro al ',
              event,
              'start time',
              startTime,
              'end time',
              endTime,
            );
            callDuration = endTime - startTime;
            console.log('callDuration adentro', callDuration);
            break;

          default:
            break;
        }
        console.log('callDuration afuera', callDuration);

        let updatedCallStates = callStates;
        updatedCallStates.push({
          event: event,
          time: msToTime(time).toLocaleLowerCase(),
          duration: msToMinSec(callDuration),
        });
        setFlatListItems(updatedCallStates);
        setCallStates(updatedCallStates);
      });
    }

    setIsStart(!isStart);
    callFriendTapped();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={flatListItems}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item.event}</Text>
              <Text style={styles.listItemText}>{item.duration}</Text>
              <Text style={styles.listItemText}>{item.time}</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={startStopListener}>
          <Text style={styles.buttonText}>
            {/* {isStart ? 'Stop Listener' : 'Start Listener'} */}
            start call
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          disabled={!isStart}
          onPress={callFriendTapped}>
          <Text style={styles.buttonText}>start call</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default CallsComponent;
