import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Button,
  TouchableOpacity,
  Text,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  addContact,
  // deleteContact,
  getContacts,
  openContact,
} from '../../../infrastructure/ContactsHandler';
import styles from './ContactsList.styles';
import Contacts, {Contact} from 'react-native-contacts';
import ContactItem from '../Contact/ContactItem';

const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // const deleteContact = ({item}: {item?: Contact}) => {
  //   if (item != null) {
  //     Contacts.deleteContact(item).then( () => {
  //       setContactList();
  //     });
  //   } else {
  //     console.log('recordId is', item);
  //   }
  // };

  const deleteAlert = (contactToDelete: Contact) => {
    console.log('contactToDelete', contactToDelete);

    return Alert.alert(
      'Are you sure to delete this contact?',
      'This action can not be undone',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          // onPress: () => deleteContact(contactToDelete),
          onPress: () =>
            Contacts.deleteContact(contactToDelete).then(() => {
              setContactList();
            }),
        },
      ],
    );
  };

  const setContactList = () => {
    getContacts.getAll().then(contacts => {
      setContacts(contacts);
    });
  };

  useEffect(() => {
    setContactList();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setContactList();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const keyExtractor = (
    item: {recordID: {toString: () => any}},
    idx: {toString: () => any},
  ) => {
    return item?.recordID?.toString() || idx.toString();
  };

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={contacts}
        renderItem={({item}: {item: Contact}) => {
          return (
            <ContactItem contact={item} index={+item.recordID.toString()}>
              <TouchableOpacity
                style={styles.contactEdit}
                onPress={() => openContact(item)}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactDeleteButton}
                onPress={() => deleteAlert(item)}>
                <Text style={styles.contactDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </ContactItem>
          );
        }}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
      <Button title="add contact" onPress={() => addContact(contacts)} />
    </>
  );
};
export default ContactsList;
