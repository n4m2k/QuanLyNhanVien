import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Tab, Tabs,useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/views/_pending.scss";
import "../../../../styles/views/_registerEmployee.scss";
import Box from "@mui/material/Box";
import ApproveDialog from "../ActionDialog/ApproveDialog";
import AdditionalDialog from "../ActionDialog/AdditionalDialog";
import RefuseDialog from "../ActionDialog/RefuseDialog";
import { getEmployeeByIdRequest } from "app/redux/actions/EmployeeActions";
import ProfileForm from "app/views/RegisterEmployees/TabPanelForm/ProfileForm";
import InformationForm from "app/views/RegisterEmployees/TabPanelForm/InformationForm";
import CertificateForm from "app/views/RegisterEmployees/TabPanelForm/CertificateForm";
import { VIEW_ONLY } from "../../../Constants/ListNameTab";
import { TAB_REGISTER } from "app/Constants/ListTab";
const useStyles = makeStyles({
  redColor: {
    color: "red",
  },
  iconClose: { position: "absolute", right: 8, top: 8 },
});

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

const EmployeeDetailDialog = ({
  open,
  onClose,
  employee,
  setEmployee,
  statusOfForm,
}) => {
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openAdditionalDialog, setOpenAdditionalDialog] = useState(false);
  const [openRefuseDialog, setOpenRefuseDialog] = useState(false);
  const isTablet = useMediaQuery("(max-width: 768px)");
  const styleClass = useStyles();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const employeeDetail = useSelector((state) => state.employees.employee);
  useEffect(() => {
    if (employee?.id) {
      dispatch(getEmployeeByIdRequest(employee?.id));
    }
  }, [dispatch, employee]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    onClose();
  };

  const handleApproveDialogOpen = () => {
    setOpenApproveDialog(true);
  };
  const handleApproveDialogClose = () => {
    setOpenApproveDialog(false);
  };
  const handleAdditionalDialogOpen = () => {
    setOpenAdditionalDialog(true);
  };
  const handleAdditionalDialogClose = () => {
    setOpenAdditionalDialog(false);
  };
  const handleRefuseDialogOpen = () => {
    setOpenRefuseDialog(true);
  };
  const handleRefuseDialogClose = () => {
    setOpenRefuseDialog(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg"  fullWidth={true}>
      <DialogTitle id="draggable-dialog-title">
        <span className="styleColor">Thông tin nhân viên</span>
        <IconButton aria-label="close" className={styleClass?.iconClose} onClick={handleClose}>
          <CloseIcon color="error" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="dialog-content-custom">
          <Box display={isTablet ? "" : "flex" } alignItems={isTablet ? "" : "stretch"} height={700}>
            <Tabs
              orientation={isTablet ? "horizontal" : "vertical"}
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
              className="custom-tab"
            >
              <Tab label={TAB_REGISTER.HO_SO.LABEL} className="tab-label" />
              <Tab
                label={TAB_REGISTER.SO_YEU_LY_LICH.LABEL}
                className="tab-label"
              />
              <Tab label={TAB_REGISTER.VAN_BANG.LABEL} className="tab-label" />
            </Tabs>
            <div className="flex-container">
              {value === TAB_REGISTER.HO_SO.KEY && (
                <ValidatorForm>
                  <ProfileForm
                   employee={employeeDetail}
                   setEmployee={setEmployee}
                   isViewMode={true}
                  />
                </ValidatorForm>
              )}
              {value === TAB_REGISTER.SO_YEU_LY_LICH.KEY && (
                <InformationForm employeeDetail={employeeDetail} />
              )}
              {value === TAB_REGISTER.VAN_BANG.KEY && (
                <CertificateForm employeeDetail={employeeDetail} />
              )}
            </div>
          </Box>
        </DialogContent>
      <DialogActions className="mt-12 button-center">
        {statusOfForm === VIEW_ONLY ? null : (
          <div>
            <Button
              className="mr-12 "
              color="primary"
              variant="contained"
              onClick={handleApproveDialogOpen}
            >
              Phê duyệt
            </Button>
            <Button
              variant="contained"
              className="mr-12"
              color="primary"
              onClick={handleAdditionalDialogOpen}
            >
              Yêu cầu bổ sung
            </Button>
            <Button
              className=" mr-12 buttonColorRed"
              color="error"
              variant="contained"
              onClick={handleRefuseDialogOpen}
            >
              Từ chối
            </Button>
          </div>
        )}
        <Button
          onClick={handleClose}
          variant="contained"
          className="mr-12"
          color="secondary"
        >
          {t("general.cancel")}
        </Button>
      </DialogActions>

      {openApproveDialog && (
        <ApproveDialog
          open={openApproveDialog}
          onClose={() => handleApproveDialogClose()}
          employee={employee}
          statusOfForm={statusOfForm}
          closeDialogDetail={handleClose}
        />
      )}
      {openAdditionalDialog && (
        <AdditionalDialog
          open={openAdditionalDialog}
          onClose={() => handleAdditionalDialogClose()}
          employee={employee}
          closeDialogDetail={handleClose}
        />
      )}
      {openRefuseDialog && (
        <RefuseDialog
          open={openRefuseDialog}
          onClose={() => handleRefuseDialogClose()}
          employee={employee}
          setEmployee={setEmployee}
          statusOfForm={statusOfForm}
          closeDialogDetail={handleClose}
        />
      )}
    </Dialog>
  );
};
export default EmployeeDetailDialog;
