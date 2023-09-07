import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import moment from "moment";
import {
  STATUS_EMPLOYEE,
  STATUS_OF_END_EMPLOYEE,
} from "app/Constants/ListStatus";
import { useDispatch } from "react-redux";
import { updateEmployees } from "app/redux/actions/EmployeeActions";

const SubMissionDialog = ({
  open,
  handleCloseSubMissionDialog,
  employee,
  handleCloseRegisterDialog,
}) => {
  const [decisionInput, setDecisionInput] = useState({
    numberSaved: `NL${moment().format("MMYY")}${employee?.code?.slice(-3)}`,
    decisionDay: moment(new Date()).format("YYYY-MM-DD"),
  });

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setDecisionInput({
      ...decisionInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleDecisionSubmit = () => {
    const dataTemp = {
      ...employee,
      numberSaved: decisionInput?.numberSaved,
      decisionDay: decisionInput?.decisionDay,
      submitProfileStatus: STATUS_EMPLOYEE.DA_NOP_LUU.CODE,
    };
    dispatch(updateEmployees(dataTemp, STATUS_OF_END_EMPLOYEE));
    handleCloseRegisterDialog();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseSubMissionDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <span className="styleColor">Nộp lưu hồ sơ</span>
        </DialogTitle>
        <ValidatorForm onSubmit={handleDecisionSubmit}>
          <DialogContent className="no-scroll-dialog" dividers>
            <TextValidator
              className="mb-16 bold-value-textfield"
              label="Ngày nộp lưu"
              type="date"
              name="decisionDay"
              value={decisionInput?.decisionDay}
              onChange={handleInputChange}
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  min: moment().format("YYYY-MM-DD"),
                },
              }}
            />
            <TextValidator
              label="Mã nộp lưu"
              name="numberSaved"
              value={decisionInput?.numberSaved}
              onChange={handleInputChange}
              fullWidth
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              disabled
            />
          </DialogContent>
          <DialogActions className="mt-12">
            <Button
              className="mr-12 "
              color="primary"
              variant="contained"
              type="submit"
            >
              Xác nhận
            </Button>
            <Button
              onClick={handleCloseSubMissionDialog}
              variant="contained"
              className="mr-12"
              color="secondary"
            >
              Hủy
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default SubMissionDialog;
