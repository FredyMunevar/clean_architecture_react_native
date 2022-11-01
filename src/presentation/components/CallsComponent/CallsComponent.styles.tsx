import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    justifyContent: 'center',
    height: 60,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  list: {
    flex: 1,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'lightgray',
    padding: 16,
  },
  listItemText: {
    // width: '33%',
    fontSize: 16,
    color: '#333333',
  },
});

export default styles;
