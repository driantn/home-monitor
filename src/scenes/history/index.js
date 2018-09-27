import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'base/stores';
import { Text, FlatList, View } from 'react-native';
import timeStampConverter from 'base/utils/timestamp';
import { type MonitorItem } from 'base/stores/monitor';
import css from './styles';

type Props = {
  history: Array<MonitorItem>;
}

class History extends React.PureComponent<Props> {
  render() {
    const { history = [] } = this.props;
    const data = history.reverse();
    const keyExtractor = (item) => `${item.timestamp}`;
    return (
      <FlatList
        style={css.flatList}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <View style={css.container}>
            <Text style={css.child}>{`${item.temperature} °C`}</Text>
            <Text style={css.child}>{`${item.humidity} %`}</Text>
            <Text style={css.child}>{`${timeStampConverter(item.timestamp)}`}</Text>
          </View>
        )}
      />
    );
  }
}

const mapStateToProps = ({ monitor }: AppState): Object => {
  return {
    history: monitor.history,
  };
};

export default connect(mapStateToProps, null)(History);
