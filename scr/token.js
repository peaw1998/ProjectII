import SyncStorage from 'sync-storage';
import jwtDecode from 'jwt-decode'

SyncStorage.init();

export default {
  getToken: () => {
    return SyncStorage.get('token');
  },
  setToken: data => {
    SyncStorage.set('token', data);
  },
  getTokenData: () => {
    if (SyncStorage.get('token')) {
      return jwtDecode(SyncStorage.get('token'));
    } else {
      return null;
    }
  },
  removeToken: () => {
    SyncStorage.remove('token');
  },
};
