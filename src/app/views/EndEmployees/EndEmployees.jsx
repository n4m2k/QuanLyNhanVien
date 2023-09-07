import React from 'react'
import { useTranslation } from "react-i18next";
import GeneralComponent from '../Component/GeneralComponent/GeneralComponent'
import { STATUS_OF_END_EMPLOYEE } from 'app/Constants/ListStatus'

const EndEmployees = () => {
  const { t } = useTranslation();
  return (
    <GeneralComponent status={STATUS_OF_END_EMPLOYEE} decision={true} manage={t("Dashboard.manage")} title={t("staff.title")} ></GeneralComponent>
  )
}

export default EndEmployees