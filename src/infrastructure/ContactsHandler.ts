import {Platform} from 'react-native';
import Contacts from 'react-native-contacts';
import {PERMISSIONS, request} from 'react-native-permissions';

const requestPermissions = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    let statusRead = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
    let statusWrite = await request(PERMISSIONS.ANDROID.WRITE_CONTACTS);
    if (statusRead === 'denied' || statusRead === 'blocked') {
      throw Error('Permission not granted to access contacts');
    }
    if (statusWrite === 'denied' || statusWrite === 'blocked') {
      throw Error('Permission not granted to access contacts');
    }
  }
};

const getAll = async (): Promise<any[]> => {
  await requestPermissions();
  return new Promise(res => {
    Contacts.getAll().then(contacts => {
      res(contacts);
    });
  });
};

export const getContacts = {getAll};

export const openContact = (contact: Contacts.Contact) => {
  // Contacts.openExistingContact(contact); // This is to edit current contact with native contact form
  contact.emailAddresses.push({
    label: 'junk',
    email: 'test-from-edit-contact@test.com',
  });
  Contacts.updateContact(contact).then(() => {
    console.log(`contact ${contact.recordID} updated`);
  });
};

export const addContact = (contactList: Contacts.Contact) => {
  // Contacts.openContactForm({}).then(() => { // This is to add a contact with native contact form
  //   contactList;
  // });

  Contacts.addContact(contactList);
};
// export const deleteContact = ({item}: {item: Contact}) => {
//   if (item != null) {
//     // Contacts.deleteContact({
//     //   recordID: item.toString(),
//     // });
//     Contacts.deleteContact(item).then(recordId => {
//       console.log('recordId', recordId);
//     });
//   } else {
//     console.log('recordId is', item);
//   }
// };
