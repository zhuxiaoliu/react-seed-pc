/**
 * @file app.js
 * @author maoquan(maoquan@htsc.com)
 */

import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import _ from 'lodash';

import createSensorsLogger from './middlewares/sensorsLogger';
import createActivityIndicator from './middlewares/createActivityIndicator';
import routerConfig from './router';
import persistConfig from './config/persist';
import { getQuery } from './utils/helper';
import api from './api';

// 存储empId, deviceId, token等授权信息
const query = getQuery(location.search);
const authInfo = _.pick(query, 'empId', 'deviceId', 'token');
api.setAuthInfo(authInfo);

const extraEnhancers = [];
if (persistConfig.active) {
  extraEnhancers.push(autoRehydrate());
}

// 各平台出错信息不一样
// 貌似也没有status code
const NETWORK_ERROR_MESSAGE = [
  'Failed to fetch',
  'Network request failed',
];

const getMessage = (message) => {
  if (_.includes(NETWORK_ERROR_MESSAGE, message)) {
    return '网络异常';
  }
  return message;
};

// 错误处理
const onError = (e) => {
  const { message } = e;
  if (message === 'MAG0010') {
    // Toast.fail(
    //   '登录超时，请重新登录！',
    //   1,
    // );
  } else {
    // Toast.fail(getMessage(message), 1);
  }
};

// 1. Initialize
const app = dva({
  history: browserHistory,
  onAction: [createLogger(), createSensorsLogger()],
  extraEnhancers,
  onError,
});

// 2. Plugins
app.use(createLoading({ effects: true }));
app.use(createActivityIndicator());

// 3. Model
app.model(require('./models/kpi'));

// 4. Router
app.router(routerConfig);

// 5. Start
app.start('#app');

// 6. redux-persist
if (persistConfig.active) {
  persistStore(app._store, persistConfig); // eslint-disable-line
}
