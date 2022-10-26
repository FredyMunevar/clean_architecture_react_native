import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  list: {
    flex: 1,
  },
  contactEdit: {
    display: 'flex',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contactDeleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contactDeleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
