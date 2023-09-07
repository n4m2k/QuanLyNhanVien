import React from "react";
import { Avatar, Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../../../../styles/views/_profileForm.scss";
import ExperiencesComponent from "./ExperiencesForm/ExperiencesComponent";
import { GENDER, TEAM } from "app/Constants/ListSelectItem";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { updateEmployees } from "app/redux/actions/EmployeeActions";
import { STATUS_OF_EMPLOYEE } from "app/Constants/ListStatus";
import { removeMultipleSpaces } from "../../../../utils/handleGeneral";
const ProfileForm = ({ employee, setEmployee, submitRef, isViewMode }) => {
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: removeMultipleSpaces(e.target.value),
    });
  };

  const handleSubmit = () => {
    const dataTemp = {
      ...employee,
      knowledge: employee?.knowledge?.trim(),
      skill: employee?.skill?.trim(),
      activity: employee?.activity?.trim(),
    };
    dispatch(updateEmployees(dataTemp, STATUS_OF_EMPLOYEE));
  };
  return (
    <div className="root-profile">
      <div className="background-profile">
        <div className="cvp-content three cv-wrap">
          <div className="box-top">
            <div className="box-img">
              <Avatar
                className="cv-photo"
                alt="Your Name"
                src={employee?.image}
              />
            </div>
            <div className="box-name">
              <div className="box-name-contain">
                <div className="">
                  <h3 className="name-custom">{employee?.name}</h3>
                </div>
                <div className="box-cv-name">
                  <h4 className="name-cv">
                    {" "}
                    {TEAM.find((item) => item.id === employee?.team)?.name}
                  </h4>
                </div>
              </div>
              <div className="box-info">
                <div className="cvp-box-child-list">
                  <div className="content-info">
                    <div>
                      <div className="change-font-size custom-icon">
                        <i
                          class="fa fa-venus-mars icn-mars"
                          aria-hidden="true"
                        ></i>
                        <span className="info-item">
                          {
                            GENDER?.find(
                              (item) =>
                                item?.id === employee?.gender?.toString()
                            )?.name
                          }
                        </span>
                      </div>
                      <div className="change-font-size custom-icon">
                        <i
                          class="fa fa-birthday-cake icn-cake"
                          aria-hidden="true"
                        ></i>
                        <span className="info-item">
                          {moment(employee?.dateOfBirth).format("DD/MM/YYYY")}
                        </span>
                      </div>
                      <div className="change-font-size custom-icon">
                        <i class="fa-solid fa-location-dot icn-location"></i>
                        <span className="info-item">{employee?.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-bottom">
            <div className="box-left">
              <div>
                <ValidatorForm onSubmit={handleSubmit}>
                  <div className="box-left-info">
                    <div>
                      <div className="box-left-email">
                        <i
                          class="fa fa-envelope-o icn-email"
                          aria-hidden="true"
                        ></i>
                        <span className="info-item info-email">
                          {employee?.email}
                        </span>
                      </div>
                      <div className="box-left-phone">
                        <i class="fa-solid fa-phone icn-phone"></i>
                        <span className="info-item info-phone">
                          {employee?.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="children-sort skill-custom">
                    <h3 className="change-title">Kỹ năng</h3>
                    <div className="part-content">
                      <TextValidator
                        onChange={handleInputChange}
                        name="skill"
                        value={employee?.skill || ""}
                        fullWidth
                        validators={["required"]}
                        errorMessages={["Vui lòng nhập kỹ năng"]}
                        size="small"
                        multiline
                        InputProps={{
                          readOnly: isViewMode,
                        }}
                        contenteditable={!isViewMode ? "true" : "false"}
                        placeholder="Mô tả các kỹ năng của bạn. Bạn có thể trình bày các kỹ năng tương thích với công việc nhất, càng phù hợp, tỷ lệ được chọn càng cao."
                        className="textarea-custom"
                      />
                    </div>
                  </div>
                  <div className="children-sort">
                    <h3 className="change-title">Ngoại ngữ</h3>
                    <div className="title-block">
                      <h4 className="change-title-language">Tiếng Anh</h4>
                      <div className="rating-child">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div className="title-block">
                      <h4 className="change-title-language">Tiếng Trung</h4>
                      <div className="rating-child">
                        <span></span>
                        <span></span>
                        <span className="not-active"></span>
                      </div>
                    </div>
                  </div>
                  <div className="children-sort">
                    <h3 className="change-title">Tin học</h3>
                    <div className="title-block">
                      <h4 className="change-title-language">Word</h4>
                      <div className="rating-child">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div className="title-block">
                      <h4 className="change-title-language">Excel</h4>
                      <div className="rating-child">
                        <span></span>
                        <span></span>
                        <span className="not-active"></span>
                      </div>
                    </div>
                  </div>
                  <div className="children-sort">
                    <h3 className="change-title">Hoạt động</h3>
                    <div className="part-content">
                      <TextValidator
                        onChange={handleInputChange}
                        name="activity"
                        value={employee?.activity || ""}
                        fullWidth
                        validators={["required"]}
                        errorMessages={["Vui lòng nhập hoạt động"]}
                        size="small"
                        multiline
                        InputProps={{
                          readOnly: isViewMode,
                        }}
                        contenteditable={!isViewMode ? "true" : "false"}
                        placeholder="Mô tả các hoạt động nổi bật bạn đã làm trong tổ chức của bạn."
                        className="textarea-custom"
                      />
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    className="primary"
                    type="submit"
                    ref={submitRef}
                    style={{ display: "none" }}
                  >
                    Lưu
                  </Button>
                </ValidatorForm>
              </div>
            </div>
            {/* Right */}
            <div className="box-right">
              <div className="parent-sort">
                <div className="children-sort box-parent">
                  <h3 className="change-title">Mục tiêu nghề nghiệp</h3>
                  <div className="knowledge-content">
                    <TextValidator
                      id="standard-basic"
                      fullWidth
                      value={employee?.knowledge || ""}
                      type="text"
                      name="knowledge"
                      multiline
                      className="knowledge-input"
                      onChange={handleInputChange}
                      placeholder="Mô tả sơ lược mục tiêu hoặc vị trí bạn mong muốn trong tương lai và có phương hướng cụ thể để thực hiện mục tiêu của bạn bao gồm các mục tiêu ngắn hạn và dài hạn."
                      InputProps={{
                        readOnly: isViewMode,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="parent-sort">
                <div className="children-sort box-parent">
                  <ExperiencesComponent
                    employee={employee}
                    isViewMode={isViewMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
