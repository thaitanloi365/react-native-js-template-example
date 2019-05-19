import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configStore } from "@ReduxManager";
import { Navigator, AppContainer } from "@Navigation";
import { StatusBar as RN } from "react-native";
import { Loading, Alert, Toast } from "rn-notifier";
import CodePushDialog from "rn-codepush-dialog";
import RNSplashScreen from "react-native-splash-screen";

const { store, persistor } = configStore();

export class App extends React.Component {
  componentWillMount() {
    if (__DEV__) {
      RNSplashScreen.hide();
    }
  }

  /**
   * @param {string} msg
   * @param {() => void} onShow
   */
  showLoading = (msg, onShow) => {
    this.loadingRef.show(msg, onShow);
  };

  /**
   * @param {() => void} onClose
   */
  hideLoading = onClose => this.loadingRef.hide(onClose);

  /**
   * @param {string} title
   * @param {string} msg
   * @param {() => void} onOK
   * @param {() => void} onCancel
   */
  showAlert = (title, msg, onOK, onCancel) => this.alertRef.show(title, msg, onOK, onCancel);

  /**
   * @param {string} title
   * @param {string} message
   * @param {import("rn-notifier").ToastType} type
   * @param {number} duration
   * @param {() => void} [onShow]
   * @param {() => void} [onClose]
   * @param {import("react-native").StatusBarStyle} [activeStatusBarType]
   * @param {import("react-native").StatusBarStyle} [deactiveStatusBarType]
   */
  showToast = (
    title,
    message,
    type = "Info",
    duration = 4000,
    onShow,
    onClose,
    activeStatusBarType = "light-content",
    deactiveStatusBarType = "default"
  ) => {
    // @ts-ignore
    const backupProps = RN._currentValues;
    let _deactiveStatusBarType = deactiveStatusBarType;
    if (backupProps && backupProps.barStyle) {
      const { value } = backupProps.barStyle;
      if (value) {
        _deactiveStatusBarType = value;
      }
    }
    this.toastRef.show(
      title,
      message,
      type,
      duration,
      onShow,
      onClose,
      activeStatusBarType,
      _deactiveStatusBarType
    );
  };

  /**
   * @param {() => void} onClose
   */
  hideToast = onClose => this.toastRef.hide(onClose);

  _getScreenProps() {
    return {
      showLoading: this.showLoading,
      hideLoading: this.hideLoading,
      alertShow: this.showAlert,
      showToast: this.showToast,
      hideToast: this.hideToast
    };
  }

  _setRoot = r => {
    Navigator.setRoot(r);
  };

  _onBeforeLift = () => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={this._onBeforeLift}>
          <AppContainer ref={this._setRoot} screenProps={this._getScreenProps()} />
          <Loading ref={r => (this.loadingRef = r)} />
          <Alert ref={r => (this.alertRef = r)} />
          <Toast ref={r => (this.toastRef = r)} />
          <CodePushDialog />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
