import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  child: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  }
});

export default styles;