import React from 'react'
import { useTranslation } from "react-i18next";
import GeneralComponent from '../Component/GeneralComponent/GeneralComponent'
import {STATUS_OF_LEADER_CONFIRM } from 'app/Constants/ListStatus'

const LeaderConfirm = () => {
  const { t } = useTranslation();
  return (
    <GeneralComponent status={STATUS_OF_LEADER_CONFIRM} decision={false} manage={t("Dashboard.leader")} title={t("Đã duyệt")}></GeneralComponent>
  )
}

export default LeaderConfirm