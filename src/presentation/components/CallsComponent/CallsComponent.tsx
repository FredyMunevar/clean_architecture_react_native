import React, {useState} from 'react';
import {
  Text,
  View,
  Linking,
  FlatList,
  SafeAreaView,
  Button,
  RefreshControl,
} from 'react-native';

import CallDetectorManager from 'react-native-call-detection';
import styles from './CallsComponent.styles';

const msToMinSec = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
};

const msToTime = (milliseconds: number) => {
  const time = new Date(milliseconds).toTimeString().split(' ')[0];
  return time;
};

const CallsComponent = () => {
  let callDetector: {dispose: () => any} | undefined;
  const [isStart, setIsStart] = useState(false);
  const [callListItems, setCallListItems] = useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const callFriendTapped = () => {
    Linking.openURL('tel:3042923745').catch(err => {
      console.log(err);
    });
  };
  let startTime: number;
  let dialTime: number;
  let endTime: number;
  let callDuration: number = 0;

  const startStopListener = () => {
    if (isStart) {
      callDetector && callDetector.dispose();
    } else {
      callDetector = new CallDetectorManager((event: string) => {
        const time = new Date().getTime();
        switch (event) {
          case 'Dialing':
            dialTime = time;
            console.log('entro al ', event, ' ', dialTime);
            break;
          case 'Connected':
            startTime = time;
            console.log('entro al ', event, ' ', startTime);
            break;
          case 'Offhook':
            startTime = time;
            // console.log('entro al ', event, ' ', startTime);
            break;

          case 'Incoming':
            // console.log('entro al ', event);
            break;
          case 'Missed':
            // console.log('entro al ', event);
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
            // console.log('callDuration adentro', callDuration);
            break;

          default:
            break;
        }
        // console.log('callDuration afuera', callDuration);

        let updatedCallStates = callListItems;
        updatedCallStates.push({
          event: event,
          time: msToTime(time),
          duration: msToMinSec(callDuration),
        });
        setCallListItems(updatedCallStates);
      });
    }

    setIsStart(!isStart);
    callFriendTapped();
  };

  const onRefresh = () => {
    setRefreshing(true);
    callListItems;
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  console.log(callListItems);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.list}
          data={callListItems}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item.event}</Text>
              <Text style={styles.listItemText}>{item.duration}</Text>
              <Text style={styles.listItemText}>{item.time}</Text>
            </View>
          )}
        />
        <Button title="start call" onPress={startStopListener} />

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
