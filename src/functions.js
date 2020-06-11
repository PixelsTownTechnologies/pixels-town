import {
    PERMISSION_TYPE_DOCTOR,
    PERMISSION_TYPE_HOSPITAL,
    PERMISSION_TYPE_LAB,
    PERMISSION_TYPE_PATIENT,
    PERMISSION_TYPE_SUPERVISOR
} from "./components/operation/values";

export const isLab = (user, company) => {
    return user.type.type === PERMISSION_TYPE_SUPERVISOR && company.type.type === PERMISSION_TYPE_LAB;
};

export const isHospital = (user, company) => {
    return user.type.type === PERMISSION_TYPE_SUPERVISOR && company.type.type === PERMISSION_TYPE_HOSPITAL;
};

export const isDoctor = (user, company) => {
    return user.type.type === PERMISSION_TYPE_DOCTOR;
};

export const isPatient = (user, company) => {
    return user.type.type === PERMISSION_TYPE_PATIENT;
};

