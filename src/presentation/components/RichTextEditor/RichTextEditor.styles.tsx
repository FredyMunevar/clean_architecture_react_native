import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  editor: {
    margin: 0,
  },
  toolbarStyle: {
    position: 'absolute',
    bottom: 0,
  },
  buttonStyle: {
    marginHorizontal: 10,
  },
});

export default styles;
