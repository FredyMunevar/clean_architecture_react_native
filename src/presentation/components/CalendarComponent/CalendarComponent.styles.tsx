import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  // $outline: 1,
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'peru',
    paddingBottom: '0.5rem',
    // margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  itemDateNumberContainer: {
    width: '4rem',
    alignItems: 'center',
    // marginBottom: '1rem',
  },
  itemDateNumber: {
    fontSize: '2rem',
  },
  button: {
    alignItems: 'center',
    // backgroundColor: 'green',
    padding: 10,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: '1rem',
    // color: 'white',
  },
});

export default styles;
