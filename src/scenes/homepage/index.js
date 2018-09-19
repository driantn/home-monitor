import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainView from 'base/components/main';
import { Dispatch, AppState } from 'base/stores';
import { watchForLastEntry, getMonitorHistory, type MonitorItem } from 'base/stores/monitor';
import { View, Text } from 'react-native';
import { StackedAreaChart } from 'react-native-svg-charts';
import ProgressBar from 'base/components/progress-bar';
import LoadingScreen from 'base/components/loading';
import timeStampConverter from 'base/utils/timestamp';

import css from './styles';

type Props = {
  lastItem: MonitorItem,
  history: Array<HistoryItem>;
  isLoading: boolean,
  onGetMonitorHistory: typeof getMonitorHistory;
  onNewEntry: typeof watchForLastEntry;
}

class Homepage extends React.PureComponent {
  colorMap = { blue: '#3FC7FA', green: '#85D262', red: '#d9534f' };
  componentDidMount() {
    const { onGetMonitorHistory, onNewEntry } = this.props;
    onNewEntry();
    onGetMonitorHistory();
  }

  getColorForTemperature = (): string => {
    const { lastItem: { temperature } } = this.props;
    if (temperature <= 15) {
      return this.colorMap.blue;
    }

    if (temperature > 15 && temperature <= 25) {
      return this.colorMap.green;
    }

    return this.colorMap.red;
  }

  getColorForHumidity = (): string => {
    const { lastItem: { humidity } } = this.props;
    if (humidity <= 40) {
      return this.colorMap.red;
    }

    if (humidity > 40 && humidity <= 60) {
      return this.colorMap.green;
    }

    return this.colorMap.red;
  }

  getChartData = () => {
    const { history = [] } = this.props;
    return history.map((item) => {
      if (item.timestamp === 0) item.timestamp = 1;
      return {
        name: item.timestamp,
        temperature: item.temperature,
        humidity: item.humidity,
      };
    });
  }

  render() {
    const { lastItem: { temperature, humidity, timestamp }, history, isLoading} = this.props;
    const colors = [ '#8800cc', '#aa00ff' ]
    const keys = [ 'temperature', 'humidity'];
    const dataArray = this.getChartData();
    if (isLoading) {
      return <LoadingScreen isLoading/>;
    }
    return (
      <MainView>
        <View style={css.box}>
            <Text style={css.boxTitle}>
              {timeStampConverter(timestamp)}
            </Text>
          </View>
          <View style={css.box}>
            <Text style={css.boxTitle}>{'Temperature'}</Text>
            <ProgressBar
              value={temperature}
              unit={'°C'}
              color={this.getColorForTemperature()}
            />
          </View>
          <View style={css.box}>
            <Text style={css.boxTitle}>{'Humidity'}</Text>
            <ProgressBar
              value={humidity}
              unit={'%'}
              color={this.getColorForHumidity()}
            />
          </View>
          <View style={[css.box, css.historyBox]}>
            <Text style={css.boxTitle}>{'History'}</Text>
            {!!history.length && (
              <StackedAreaChart
                style={ { height: 150 } }
                data={dataArray}
                keys={keys}
                colors={colors}
              />
            )}
          </View>
      </MainView>
    );
  }
}

const mapStateToProps = ({ monitor }: AppState): Object => {
  return {
    lastItem: monitor.lastItem,
    history: monitor.history,
    isLoading: monitor.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return bindActionCreators({
    onNewEntry: watchForLastEntry,
    onGetMonitorHistory: getMonitorHistory,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
