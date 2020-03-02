import { all, delay, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* login() {
  try {
    // call은 순서가 중요할때, fork는 순서가 안중요할 떄 
    // yield call(loginAPI); //요청을 보내서 돌아오면 실행: call 순서가 중요할때
    // 서버로 요청이 보낸게 끝나야만 실행,
    // fork는 순서가 상관없이, eventListener처럼만일 때 쓴다. 
    yield delay(2000);
    yield put({ // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

//take는 뭐냐면, saga를 받겠다는 것. 들어오면 중단되었던 거를 풀겠다. 
function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
  //while true 를 숨길 수 있는!! 
}


function signUpAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* signUp() {
  try {
    // yield call(signUpAPI);
    yield delay(2000);
    throw new Error('에러에러에러');
    yield put({ // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
  ]);
}