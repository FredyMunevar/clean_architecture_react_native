import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './CalendarComponent.styles';
import {
  Calendar,
  CalendarList,
  Agenda,
  AgendaSchedule,
  AgendaEntry,
  DateData,
  ExpandableCalendar,
  Timeline,
} from 'react-native-calendars';
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

const mockItems = {
  '2022-11-15': [
    {name: 'test 1', cookies: 'true'},
    {name: 'test 2', cookies: 'true'},
  ],
  '2022-11-16': [
    {name: 'test 3', cookies: 'true'},
    {name: 'test 4', cookies: 'true'},
  ],
  '2022-11-17': [
    {name: 'test 5', cookies: 'true'},
    {name: 'test 6', cookies: 'true'},
  ],
};

const CalendarComponent = () => {
  const [agendaItems, setAgendaItems] = useState<AgendaSchedule>({});
  const [markedItems, setMarkedItems] = useState<any[]>([]);

  const [date, setDate] = React.useState(
    new Date(moment().add(2, 'days').toISOString()),
  );
  const [eventTitle, setEventTile] = React.useState('test from button');
  const [eventLocation, setEventLocation] = React.useState('any location');

  const dataRangeStart = moment().subtract(3, 'weeks').toISOString();
  const dataRangeEnd = moment().add(3, 'weeks').toISOString();

  const formatDate = (date: moment.MomentInput) =>
    moment(date).format('yyyy-MM-DD').toString();

  useEffect(() => {
    const processEventsFromDevice = async () => {
      const getEventsFromDevice = await RNCalendarEvents.fetchAllEvents(
        dataRangeStart,
        dataRangeEnd,
      );

      // console.log('===============> getEventsFromDevice', getEventsFromDevice);

      setMarkedItems(getEventsFromDevice);

      // let eventAgenda: AgendaEntry[] = [];
      let agendaSchedule: AgendaSchedule = {};

      getEventsFromDevice.map((event, index) => {
        let agendaScheduleKey = formatDate(event.startDate);

        let setEventAgenda: AgendaEntry = {
          name: event.title,
          height: index,
          day: agendaScheduleKey,
        };

        // if (!agendaSchedule[agendaScheduleKey]) {
        //   console.log('no hay eventos');
        //   agendaSchedule = {
        //     [agendaScheduleKey]: [],
        //   };
        //   console.log('agendaSchedule', agendaSchedule);
        // }

        if (agendaSchedule[agendaScheduleKey]) {
          agendaSchedule[agendaScheduleKey].push(setEventAgenda);
        } else {
          // eventAgenda.push(setEventAgenda);
          // agendaSchedule = {
          //   [agendaScheduleKey]: eventAgenda,
          // };
          agendaSchedule = {
            ...agendaSchedule,
            [agendaScheduleKey]: [setEventAgenda],
          };
        }
      });
      setAgendaItems(agendaSchedule);
    };
    processEventsFromDevice();
  }, []);

  const getMarkedDates = (
    baseDate: moment.MomentInput,
    appointments: any[],
  ) => {
    const markedDates: any = {};

    markedDates[formatDate(baseDate)] = {selected: true};

    appointments.forEach(appointment => {
      const formattedDate = formatDate(appointment.startDate);
      markedDates[formattedDate] = {
        ...markedDates[formattedDate],
        marked: true,
        dotColor: 'red',
      };
    });

    return markedDates;
  };

  const createEvent = () => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 2);

    RNCalendarEvents.saveEvent(eventTitle, {
      // calendarId: '4',
      startDate: date.toISOString(),
      endDate: newDate.toISOString(),
      location: eventLocation,
    })
      .then(value => {
        console.log('Event Id--->', value);
      })
      .catch(error => {
        console.log(' Did Not work Threw an error --->', error);
      });
  };

  // console.log('===============> agendaItems', agendaItems);
  // console.log('===============> markedItems', markedItems);

  const renderItem = (item: {
    name:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
    height:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
    day: moment.MomentInput;
  }) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text>{item.name}</Text>
          <Text>{formatDate(item.day)}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => createEvent()}
        >
          <Text style={styles.buttonText}>editar</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderEmptyItem = (
    day:
      | string
      | number
      | boolean
      | React.ReactFragment
      | React.ReactPortal
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | null
      | undefined,
  ) => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty {day}!</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        // testID={testIDs.agenda.CONTAINER}
        items={agendaItems}
        // items={mockItems}
        // loadItemsForMonth={loadItems}
        // selected={formatDate(moment())}
        // selectedDay={formatDate(moment())}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyItem}
        // rowHasChanged={this.rowHasChanged}
        // hideKnob={false}
        showClosingKnob={true}
        // markingType={'dot'}
        markedDates={getMarkedDates(dataRangeStart, markedItems)}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // disableAllTouchEventsForDisabledDays={true}
        // onDayChange={day => {
        //   console.log('changed to day', day);
        // }}
        // calendarHeight={1300}
        // initialDate={dataRangeStart}
        minDate={dataRangeStart}
        maxDate={dataRangeEnd}
        // current={formatDate(moment())}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={renderDayItem}
        renderDay={(day, item) => {
          return (
            <View style={styles.itemDateNumberContainer}>
              <Text style={styles.itemDateNumber}>
                {day ? item?.day.substring(8, 11) : ''}
              </Text>
              <Text style={styles.itemDateMonth}>
                {day ? item?.day.substring(5, 7) : ''}
              </Text>
            </View>
          );
        }}
        // hideExtraDays={true}
        // showOnlySelectedDayItems
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
      <Button title="add event" onPress={() => createEvent()} />
    </SafeAreaView>
  );
};

export default CalendarComponent;
