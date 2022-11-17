import React, {useEffect, useState} from 'react';
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

  const newContact: Contact = {
    emailAddresses: [
      {
        label: 'work',
        email: 'test-from-new-contact@example.com',
      },
    ],
    familyName: 'test',
    givenName: 'contact',
    recordID: '',
    backTitle: '',
    company: '',
    displayName: '',
    middleName: '',
    jobTitle: '',
    phoneNumbers: [],
    hasThumbnail: false,
    thumbnailPath: '',
    isStarred: false,
    postalAddresses: [],
    prefix: '',
    suffix: '',
    department: '',
    birthday: undefined,
    imAddresses: [],
    note: '',
  };

  const deleteAlert = (contactToDelete: Contact) => {
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
    getContacts.getAll().then(contactsList => {
      setContacts(contactsList);
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
  console.log(contacts);
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
      <Button title="add contact" onPress={() => addContact(newContact)} />
    </>
  );
};
export default ContactsList;
