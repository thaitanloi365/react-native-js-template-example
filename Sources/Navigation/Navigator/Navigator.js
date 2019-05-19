import { NavigationActions, StackActions, DrawerActions } from "react-navigation";

class Navigator {
  static _instance = new Navigator();
  _rootNavigator = null;
  _drawerProps = null;
  _bookingFromDashboard = true;

  constructor() {
    if (Navigator._instance) {
      throw new Error("Error: Instantiation failed: Use Navigation.getInstance() instead of new.");
    }
    Navigator._instance = this;
  }

  static getInstance() {
    return Navigator._instance;
  }

  setRoot = rootNavigator => {
    if (this.rootNavigator) return;
    this.rootNavigator = rootNavigator;
  };

  /**
   * @param {import("@Models").RouteName} routeName
   * @param {any} params
   * @param {import("react-navigation").NavigationNavigateAction} action
   * @param {string} key
   */
  navTo = (routeName, params, action, key) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(NavigationActions.navigate({ routeName, params, action, key }));
    }
  };

  /**
   * @param {import("@Models").RouteName} forScreen
   * @param {boolean} [isVisible]
   */
  setTabbar(forScreen, isVisible = true) {
    const params = { tabBarVisible: isVisible };
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(NavigationActions.setParams({ params, key: forScreen }));
    }
  }

  /**
   * @param {string | null} key
   */
  back = key => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(NavigationActions.back({ key }));
    }
  };

  /**
   * @param {import("@Models").RouteName} routeName
   * @param {any} params
   * @param {import("react-navigation").NavigationNavigateAction} action
   * @param {string} key
   */
  reset = (routeName, params, action, key) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName, params, action, key })]
        })
      );
    }
  };

  /**
   * @param {import("@Models").RouteName} key
   * @param {boolean} immediate
   */
  popToTop = (key, immediate) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(StackActions.popToTop({ key, immediate }));
    }
  };

  /**
   * @param {import("@Models").RouteName} routeName
   * @param {any} params
   * @param {import("react-navigation").NavigationNavigateAction} action
   * @param {string} key
   */
  push = (routeName, params, action, key) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(StackActions.push({ routeName, params, action, key }));
    }
  };

  /**
   * @param {number} [n]
   * @param {boolean} [immediate]
   */
  pop = (n, immediate) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(StackActions.pop({ n, immediate }));
    }
  };

  closeDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.closeDrawer());
    }
  }

  openDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.openDrawer());
    }
  }

  toggleDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.toggleDrawer());
    }
  }

  getScreenProps() {
    if (this.rootNavigator) {
      return this.rootNavigator.props.screenProps;
    }
    return null;
  }

  /**
   * @param {string} [msg]
   */
  showLoading(msg) {
    if (this.rootNavigator) {
      const { showLoading } = this.rootNavigator.props.screenProps;
      if (showLoading) showLoading(msg);
    }
  }

  /**
   * @param {() => void} onClose
   */
  hideLoading(onClose) {
    if (this.rootNavigator) {
      const { hideLoading } = this.rootNavigator.props.screenProps;
      if (hideLoading) hideLoading(onClose);
    }
  }

  /**
   * @param {string} title
   * @param {string} msg
   * @param {() => void} [onOk]
   * @param {() => void} [onCancel]
   */
  showAlert = (title, msg, onOk, onCancel) => {
    if (this.rootNavigator) {
      const { alertConfirm } = this.rootNavigator.props.screenProps;
      if (alertConfirm) alertConfirm(title, msg, onOk, onCancel);
    }
  };

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
    type,
    duration,
    onShow,
    onClose,
    activeStatusBarType,
    deactiveStatusBarType
  ) => {
    if (this.rootNavigator) {
      const { showToast } = this.rootNavigator.props.screenProps;
      if (showToast)
        showToast(
          title,
          message,
          type,
          duration,
          onShow,
          onClose,
          activeStatusBarType,
          deactiveStatusBarType
        );
    }
  };

  /**
   * @param {() => void} onClose
   */
  hideToast = onClose => {
    if (this.rootNavigator) {
      const { hideToast } = this.rootNavigator.props.screenProps;
      if (hideToast) hideToast(onClose);
    }
  };

  /**
   * @param {any} drawerProps
   */
  setDrawer(drawerProps) {
    this.drawerProps = drawerProps;
  }

  getDrawerProps() {
    return this.drawerProps;
  }
}

export default Navigator.getInstance();
