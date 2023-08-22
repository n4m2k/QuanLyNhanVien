import { call, takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListPendingSalaryIncrease, getListSalaryIncreaseByEmployeeId,createSalaryIncrease , deleteSalaryIncrease ,updateSalaryIncrease,} from "../api/apiSalaryIncrease";
import {
    getListPendingSalaryIncreaseFail,
    getListPendingSalaryIncreaseSuccess,
    getListSalaryIncreaseByEmployeeIdSuccess,
    getListSalaryIncreaseByEmployeeIdFail,
    createSalaryIncreaseSuccess,
    createSalaryIncreaseFail,
    deleteSalaryIncreaseSuccess,
    deleteSalaryIncreaseFail,
    getListSalaryIncreaseByEmployeeIdRequest,
    updateSalaryIncreaseFail,
    updateSalaryIncreaseSuccess,
    getListPendingSalaryIncreaseRequest
  } from "../actions/SalaryIncreaseAction";

  import * as EC from "../constants/SalaryIncreaseConstants";

  function* getListPendingSalaryIncreaseSaga() {
    const response = yield call(getListPendingSalaryIncrease);
    if (response?.code === 200) {
      yield put(getListPendingSalaryIncreaseSuccess(response?.data));
 
    } else {
      yield put(getListPendingSalaryIncreaseFail(response?.message));
      toast.error(response?.message);
    }
  }

  function* getListSalaryIncreaseByEmployeeIdSaga(action) {
    const response = yield call(getListSalaryIncreaseByEmployeeId , action?.employeeId);
    if (response?.code === 200) {
      yield put(getListSalaryIncreaseByEmployeeIdSuccess(response?.data));
    } else {
      yield put(getListSalaryIncreaseByEmployeeIdFail(response?.message));
      toast.error(response?.message);
    }
  }
    function* createSalaryIncreaseSaga(action) {
    const response = yield call( createSalaryIncrease,  action?.payload , action?.id);
    if (response?.code === 200) {
      yield put(createSalaryIncreaseSuccess(response?.data));
      toast.success("Tạo mới thành công");
      yield put(getListSalaryIncreaseByEmployeeIdRequest(action?.id) ) 
    } else {
      yield put(createSalaryIncreaseFail(response?.message));
      toast.error("Tạo mới không thành công");
    }
  }
  function* deleteSalaryIncreaseSaga(action) {
    const response = yield call( deleteSalaryIncrease,  action?.payload);
    if (response?.code === 200) {
      yield put(deleteSalaryIncreaseSuccess(response?.data));
      toast.success("Xóa Thành công");
      yield put(getListSalaryIncreaseByEmployeeIdRequest(action?.employeeId) ) 
    } else {
      yield put(deleteSalaryIncreaseFail(response?.message));
      toast.error("Xóa không thành công");
    }
  }

  function* updateSalaryIncreaseSaga(action) {
    const response = yield call( updateSalaryIncrease , action?.payload?.id ,  action?.payload );
    if (response?.code === 200) {
      yield put(updateSalaryIncreaseSuccess(response?.data));
      toast.success("Cập nhật Thành công");
      if(action?.employeeId){
        yield put(getListSalaryIncreaseByEmployeeIdRequest(action?.employeeId) ) 
      }else{
        yield put(getListPendingSalaryIncreaseRequest()) 
      }
    } else {
      yield put(updateSalaryIncreaseFail(response?.message));
      toast.error("Cập nhật Không Thành công");
    }
  }


  export default function* salaryIncreaseSaga() {
    yield takeEvery(EC.GET_LIST_PENDING_SALARY_INCREASE_REQUEST, getListPendingSalaryIncreaseSaga);
    yield takeEvery(EC.GET_LIST_SALARY_INCREASE_BY_EMPLOYEE_ID_REQUEST , getListSalaryIncreaseByEmployeeIdSaga);
    yield takeEvery(EC.CREATE_SALARY_INCREASE_REQUEST , createSalaryIncreaseSaga);
    yield takeEvery(EC.DELETE_SALARY_INCREASE_REQUEST, deleteSalaryIncreaseSaga);
    yield takeEvery(EC.UPDATE_SALARY_INCREASE_REQUEST, updateSalaryIncreaseSaga);
  }
  