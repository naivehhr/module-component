export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
};

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
};

export function incrementIfOdd() {
  return (dispatch, getState) => {
    var { counter, user } = getState();
    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
};

export function incrementAsync(delay) {
  delay = delay || 1000;
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
};

export function decrementAsync(delay) {
  delay = delay || 1000;
  return dispatch => {
    setTimeout(() => {
      dispatch(decrement());
    }, delay);
  };
};

export function login() {
  return (dispatch, getState) => {
    console.log('测试调用主项目http请求');
    //NOTE: 获取主项目网络请求方式
    const { serverModal } = getState()
    const httpGet = serverModal? serverModal.httpGet : null
    if(httpGet){
      console.log('test http master');
      let promise = dispatch(httpGet('/user/biz-login', {p: '15101075739', v: 'asdf'}))
      promise.then(data => {
        console.log('data==', d);
      }).catch(e => {
        console.log('error==', e);
      })
    }
    dispatch(increment());
  };
};