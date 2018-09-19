import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  historyBox: {
    alignItems: 'stretch',
    paddingTop: 10,
  },
  boxTitle: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
    paddingBottom: 25,
    paddingTop: 25,
    textAlign: 'center'
  }
});

export default styles;