import { ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import { toast } from "react-toastify";

ValidatorForm.addValidationRule("isAfterOrEqualToToday", (value) => {
  if (!value) {
    return true;
  }
  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
});

ValidatorForm.addValidationRule("noSpecialCharactersOrDigits", (value) => {
  if (!value) {
    return true;
  }
  const regex = /^[^0-9!@#$%^&*(),.?":{}|<>]+$/;
  return regex.test(value);
});

ValidatorForm.addValidationRule("equalEighteenYearsAgo", (value) => {
  if (!value) {
    return true;
  }
  const currentDate = moment();
  const eighteenYearsAgo = currentDate.subtract(18, "years");
  const selectedDate = moment(value, "YYYY-MM-DD");
  return selectedDate.isSameOrBefore(eighteenYearsAgo, "day");
});

ValidatorForm.addValidationRule("ageBelow65", (value) => {
  if (!value) {
    return true;
  }
  const currentDate = moment();
  const sixtyFiveYearsAgo = currentDate.subtract(65, "years");
  const selectedDate = moment(value, "YYYY-MM-DD");
  return selectedDate.isSameOrAfter(sixtyFiveYearsAgo, "day");
});

ValidatorForm.addValidationRule("ageBelow100", (value) => {
  if (!value) {
    return true;
  }
  const currentDate = moment();
  const sixtyFiveYearsAgo = currentDate.subtract(100, "years");
  const selectedDate = moment(value, "YYYY-MM-DD");
  return selectedDate.isSameOrAfter(sixtyFiveYearsAgo, "day");
});

ValidatorForm.addValidationRule(
  "citizenIdentificationNumberLength",
  (value) => {
    if (!value) {
      return true;
    }
    return /^\d{9}$|^\d{12}$/.test(value);
  }
);

ValidatorForm.addValidationRule("phoneNumber", (value) => {
  if (!value) {
    return true;
  }
  return /^0\d{9}$/.test(value);
});

export function isAfterOrEqualToToday(inputDate) {
  if(inputDate){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const input = new Date(inputDate);
    if (input.getTime() < today.getTime()) {
      toast.error("Ngày đã chọn không được là quá khứ");
      return false;
    }
    return true;
  }
}

export const validateFormSubmitLeader = (endDay, reasonForEnding) => {
  const isEndDayEmpty = !endDay;
  const isEndDayInPast = !isAfterOrEqualToToday(endDay);
  const isReasonForEndingEmpty = !reasonForEnding;
  if (isEndDayEmpty) {
    toast.error("Ngày kết thúc không được để trống");
    return false;
  } else if (isEndDayInPast) {
    return false;
  } else if (isReasonForEndingEmpty) {
    toast.error("Lý do kết thúc không được để trống");
    return false;
  } else {
    return true;
  }
};

ValidatorForm.addValidationRule("validSalary", (value) => {
  if (!value) {
    return true;
  }

  const validFormat = /^[1-9]\d*000$/.test(value);

  if (!validFormat) {
    return false;
  }

  const salaryValue = parseInt(value, 10);
  return salaryValue > 1000000;
});
