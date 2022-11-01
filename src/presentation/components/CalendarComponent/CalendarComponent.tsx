import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './CalendarComponent.styles';
import {
  Calendar,
  CalendarList,
  Agenda,
  AgendaSchedule,
  AgendaEntry,
  DateData,
} from 'react-native-calendars';
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

const CalendarComponent = () => {
  const [items, setItems] = useState<any[]>([]);
  // const [items, setItems] = useState<{[key: string]: AgendaSchedule}>({});

  const startDate = moment().subtract(4, 'years').toISOString();
  const endDate = moment().add(1, 'years').toISOString();

  const loadItems = async () => {
    const allItems = await RNCalendarEvents.fetchAllEvents(startDate, endDate);

    const mappedData = allItems.map((post, index) => {
      return {
        ...post,
      };
    });

    const reduced = mappedData.reduce(
      (acc: {[date: string]: AgendaEntry[]}, currentItem) => {
        const {startDate, ...coolItem} = currentItem;

        console.log(coolItem);
        console.log(startDate);

        acc[startDate] = [coolItem];

        return acc;
      },
      {},
    );
    // console.log('reduced ============================= >', reduced);

    setItems(allItems);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // const loadItems = (day: DateData) => {
  //   // const items = state.items || {}

  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);

  //       console.log(strTime);
  //       // console.log(startDate);
  //       console.log(i);
  //       console.log(day.timestamp);

  //       if (!items[strTime]) {
  //         items[strTime] = [];

  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push(
  //             name: 'Item for ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //             day: strTime,
  //           });
  //         }
  //       }
  //     }

  //     const newItems: AgendaSchedule = {};
  //     Object.keys(items).forEach(key => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1000);
  // };

  const renderItem = (item: AgendaEntry) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
        <Text>{item.height}</Text>
        <Text>{item.day}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {/* <Agenda
          // testID={testIDs.agenda.CONTAINER}
          items={items}
          // loadItemsForMonth={loadItems}
          // selected={'2017-05-16'}
          renderItem={renderItem}
          // renderEmptyDate={this.renderEmptyDate}
          // rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
          // showOnlySelectedDayItems
          // reservationsKeyExtractor={this.reservationsKeyExtractor}
        /> */}
        <FlatList
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          data={items}
          renderItem={({item}) => {
            console.log(item);

            return <Text>test</Text>;
          }}
          // keyExtractor={keyExtractor}
          style={styles.list}
        />
      </View>
    </>
  );
};

export default CalendarComponent;
