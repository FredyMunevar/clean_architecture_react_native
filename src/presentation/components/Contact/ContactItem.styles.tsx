import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  contactContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
    backgroundColor: 'white',
  },
  contactAvatarContainer: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactAvatarText: {
    fontSize: 18,
  },
  contactData: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  contactName: {
    fontSize: 16,
  },
  contactNumber: {
    color: '#888',
  },
  contactOptions: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default styles;
