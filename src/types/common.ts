// toastCode: 1 success, 2 warning, 3 error, 0 无
enum ToastCode {
    NO,
    SUCCESS,
    WARNING,
    ERROR,
}

/**
 * 系统版本号
 */
const SystemVersion = {
    major: 1,
    minor: 0,
    patch: 0,
};
  
  /**
   * API版本号
   */
const ApiVersion = {
    major: 1,
    minor: 0,
    patch: 0,
};

export { ToastCode, SystemVersion, ApiVersion };