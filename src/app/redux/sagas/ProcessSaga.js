import { call, takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListPendingProcess, getListProcessByEmployeeId,createProcess , deleteProcess ,updateProcess} from "../api/apiProcess";
import {
    getListPendingProcessFail,
    getListPendingProcessSuccess,
    getListProcessByEmployeeIdSuccess,
    getListProcessByEmployeeIdFail,
    createProcessSuccess,
    createProcessFail,
    deleteProcessSuccess,
    deleteProcessFail,
    getListProcessByEmployeeIdRequest,
    updateProcessFail,
    updateProcessSuccess,
    getListPendingProcessRequest
  } from "../actions/ProcessAction";

  import * as EC from "../constants/ProcessConstants";

  function* getListPendingProcessSaga() {
    const response = yield call(getListPendingProcess);
    if (response?.code === 200) {
      yield put(getListPendingProcessSuccess(response?.data));
    } else {
      yield put(getListPendingProcessFail(response?.message));
      toast.error(response?.message);
    }
  }
  function* getListProcessByEmployeeIdSaga(action) {
    const response = yield call(getListProcessByEmployeeId , action?.employeeId);
    if (response?.code === 200) {
      yield put(getListProcessByEmployeeIdSuccess(response?.data));
 
    } else {
      yield put(getListProcessByEmployeeIdFail(response?.message));
      toast.error(response?.message);
    }
  }
    function* createProcessSaga(action) {
    const response = yield call( createProcess,  action?.payload , action?.id);
    if (response?.code === 200) {
      yield put(createProcessSuccess(response?.data));
      toast.success("Thành công");
      yield put(getListProcessByEmployeeIdRequest(action?.id) ) 
    } else {
      yield put(createProcessFail(response?.message));
      toast.error(response?.message);
    }
  }
  function* deleteProcessSaga(action) {
    const response = yield call( deleteProcess,  action?.payload);
    if (response?.code === 200) {
      yield put(deleteProcessSuccess(response?.data));
      toast.success("Xóa Thành công");
      yield put(getListProcessByEmployeeIdRequest(action?.employeeId) ) 
    } else {
      yield put(deleteProcessFail(response?.message));
      toast.error(response?.message);
    }
  }

  function* updateProcessSaga(action) {
    const response = yield call( updateProcess , action?.payload?.id ,  action?.payload );
    if (response?.code === 200) {
      yield put(updateProcessSuccess(response?.data));
      toast.success("Cập nhật Thành công");
      if(action?.employeeId){
        yield put(getListProcessByEmployeeIdRequest(action?.employeeId) ) 
      }else{
        yield put(getListPendingProcessRequest()) 
      }
    
    } else {
      yield put(updateProcessFail(response?.message));
      toast.error(response?.message);
    }
  }

  export default function* ProcessSaga() {
    yield takeEvery(EC.GET_LIST_PROCESS_BY_EMPLOYEE_ID_REQUEST , getListProcessByEmployeeIdSaga);
    yield takeEvery(EC.CREATE_PROCESS_REQUEST , createProcessSaga);
    yield takeEvery(EC.DELETE_PROCESS_REQUEST, deleteProcessSaga);
    yield takeEvery(EC.UPDATE_PROCESS_REQUEST, updateProcessSaga);
    yield takeEvery(EC.GET_LIST_PENDING_PROCESS_REQUEST, getListPendingProcessSaga);
  }
  