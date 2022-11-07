import * as yup from "yup";

export const purchaseFormNonRattiMilli = yup.object().shape({
    customer: yup
        .string()
        .required("Customer Name Required"),
    pondWeight: yup.number().required("Pond weight Required"),
    mail: yup.number().required("Mail Required"),
    gramRate: yup.number().required("Rate/Gram Required")
});
export const purchaseFormRattiMilli = yup.object().shape({
    customer: yup
        .string()
        .required("Customer Name Required"),
    pondWeight: yup.number().required("Pond weight Required"),
    mail: yup.number().required("Mail Required"),
    rate: yup.number().required("Rate Required")
});