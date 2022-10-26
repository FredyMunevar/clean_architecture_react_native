import React from 'react';
import {View, Text} from 'react-native';
import styles from './ContactItem.styles';
import type {Contact} from 'react-native-contacts';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

const ContactItem = ({
  contact,
  index,
  children,
}: {
  contact: Contact;
  index: number;
  children: any;
}) => {
  let row: any[] = [];
  let prevOpenedRow: {close: () => void};

  const closeRow = (index: number) => {
    console.log('closerow');
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderRightActions = (progress: {}, dragX: {}) => {
    return <View style={styles.contactOptions}>{children}</View>;
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX)
        }
        onSwipeableOpen={() => closeRow(index)}
        rightThreshold={-100}
        ref={ref => (row[index] = ref)}>
        <View style={styles.contactContainer}>
          <View>
            <View style={styles.contactAvatarContainer}>
              <Text style={styles.contactAvatarText}>
                {contact?.givenName[0]}
              </Text>
            </View>
          </View>
          <View style={styles.contactData}>
            <Text style={styles.contactName}>
              {contact?.givenName}{' '}
              {contact?.middleName && contact.middleName + ' '}
              {contact?.familyName}
            </Text>
            {contact?.phoneNumbers.length > 0 && (
              <Text style={styles.contactNumber}>
                {contact?.phoneNumbers[0]?.number}
              </Text>
            )}
            {contact?.emailAddresses.length > 0 && (
              <Text style={styles.contactNumber}>
                {contact?.emailAddresses[0]?.email}
              </Text>
            )}
            {contact?.postalAddresses.length > 0 && (
              <Text style={styles.contactNumber}>
                {contact?.postalAddresses[0]?.formattedAddress}
              </Text>
            )}
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ContactItem;
