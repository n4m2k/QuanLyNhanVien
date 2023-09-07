import { IconButton, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExperiencesForm from "./ExperiencesForm";
import {
  deleteExperience,
  getExperienceById,
} from "app/redux/api/apiExperiences";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../styles/views/_profileForm.scss";
import ConfirmationDialog from "egret/components/ConfirmationDialog";

const ExperiencesComponent = ({ employee, isViewMode }) => {
  const { t } = useTranslation();
  const [listExperiences, setListExperiences] = useState([]);
  const [experiences, setExperiences] = useState({});
  const [experiencesId, setExperiencesId] = useState("");
  const [showDialogExp, setShowDialogExp] = useState(false);
  const [showDeleteDialogExp, setShowDeleteDialogExp] = useState(false);

  const handleOpenDialog = () => {
    setShowDialogExp(!showDialogExp);
  };

  const handleCloseDialog = () => {
    setShowDialogExp(false);
  };

  const handleAddExp = () => {
    handleOpenDialog();
    setExperiences({});
  };

  useEffect(() => {
    if (employee?.id) {
      handleGetExperience();
    }
  }, [employee]);

  const handleGetExperience = async () => {
    if (employee?.id) {
      const res = await getExperienceById(employee?.id);
      if (res?.code === 200) {
        setListExperiences(res?.data);
      }
    }
  };

  const handleEditExp = (item) => {
    setExperiences(item);
    setShowDialogExp(true);
  };

  const handleOpenDeleteDialogExp = () => {
    setShowDeleteDialogExp(true);
  };

  const handleCloseDeleteDialogExp = () => {
    setShowDeleteDialogExp(false);
  };

  const handleDeleteExp = (id) => {
    setExperiencesId(id);
    handleOpenDeleteDialogExp();
  };

  const handleDialogDeleteExp = async () => {
    const response = await deleteExperience(experiencesId);
    if (response?.code === 200) {
      handleGetExperience();
      toast.success("Xóa kinh nghiệm làm việc thành công!");
    } else {
      toast.error(response?.message);
    }
    handleCloseDeleteDialogExp();
  };

  return (
    <div>
      <div className="children-sort box-parent">
        <div className="box-title">
          <h3 className="change-title">Kinh nghiệm làm việc</h3>
          <IconButton
            size="medium"
            onClick={() => {
              handleAddExp();
            }}
            className={isViewMode ? "hidden" : ""}
          >
            <AddIcon fontSize="large" color="default"></AddIcon>
          </IconButton>
        </div>
        {showDialogExp && (
          <ExperiencesForm
            onClose={handleCloseDialog}
            experiences={experiences}
            employeeId={employee?.id}
            handleGetExperience={handleGetExperience}
          ></ExperiencesForm>
        )}
        <div className="experience-class">
          {listExperiences &&
            listExperiences.map((item ) => {
              return (
                <div key={item.id} className="box-time-line">
                  <div className="time-name-company">
                    <div className="box-date">
                      <div className="date-1">
                        {moment(item.startDate).format("DD/MM/YYYY")}
                      </div>
                      <span className="allow-select-time"> - </span>
                      <div className="date-1">
                        {moment(item.endDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
                    <div className="block-child">
                      <h3>{item.companyName}</h3>
                    </div>
                  </div>
                  <div className="description-title">
                    <h3>Mô tả công việc</h3>
                    <div className="buttons-exp">
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleEditExp(item);
                          }}
                          className={
                            isViewMode
                              ? "hidden experience-buttons-edit"
                              : "experience-buttons-edit"
                          }
                        >
                          <EditIcon color="primary"></EditIcon>
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleDeleteExp(item?.id);
                          }}
                          className={
                            isViewMode
                              ? "hidden experience-buttons-delete"
                              : "experience-buttons-delete"
                          }
                        >
                          <DeleteIcon color="error"></DeleteIcon>
                        </IconButton>
                      </span>
                    </div>
                  </div>
                  <div className="description-content">
                    <TextField
                      type="text"
                      value={item.jobDescription}
                      readOnly
                      multiline
                      fullWidth
                      size="small"
                      InputProps={{
                        readOnly: isViewMode,
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {showDeleteDialogExp && (
        <ConfirmationDialog
          open={showDeleteDialogExp}
          onConfirmDialogClose={handleCloseDeleteDialogExp}
          onYesClick={handleDialogDeleteExp}
          title={"Xóa nhân viên"}
          text={`Bạn có muốn xóa kinh nghiệm làm việc không?`}
          Yes={t("general.delete")}
          No={t("general.cancel")}
        ></ConfirmationDialog>
      )}
    </div>
  );
};

export default ExperiencesComponent;
