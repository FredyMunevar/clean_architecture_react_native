import {Platform} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import {PERMISSIONS, request} from 'react-native-permissions';

const requestPermissions = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    let status = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
    if (status === 'denied' || status === 'blocked') {
      throw Error('Permission not granted to access contacts');
    }
  }
};

const getAll = async (): Promise<any[]> => {
  await requestPermissions();
  return new Promise((res, rej) => {
    Contacts.getAll().then(contacts => {
      res(contacts);
    });
  });
};

export const getContacts = {getAll};

export const openContact = (contact: Contacts.Contact) => {
  Contacts.openExistingContact(contact);
};

export const addContact = (contactList: Contacts.Contact[]) => {
  Contacts.openContactForm({}).then(() => {
    contactList;
  });
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
