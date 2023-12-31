import { ATLargeModal } from "@/components/atoms/modals/large-modal.atom";
import { Button, MenuItem } from "@mui/material";
import {
  FormBuilderMeta,
  MUIFormBuilder,
} from "../forms/mui-form-builder.molecule";
import { FormikProps } from "formik";
import {
  orderTypeOptions,
  orderVisibilityOptions,
} from "@/constants/variables";
import { array, object, string } from "yup";
import { MuiFileInput } from "mui-file-input";
import { useRef } from "react";
import {
  FormBuilderRHFMeta,
  MUIFormBuilderReactHookForm,
} from "../forms/mui-form-builder-react-hook-form";
import { isEmpty } from "lodash";

const addOrderFormMeta: FormBuilderRHFMeta = {
  columns: 3,
  validationSchema: object({
    orderName: string()
      .max(20, "Order Name can not be longer than 20 characters")
      .required("Order Name is required"),
    orderLink: string()
      .required("Order Link is required")
      .max(100, "Order Link cannot be longer than 100 characters"),
    orderType: string().required(),
    orderVisibility: string().required(),
    menu: array().required("Menu Image is required").min(1, "Min 1 file"),
  }),
  initialValues: {
    orderType: 0,
    orderVisibility: 0,
  },
  handleSubmit: handleSubmitForm,
  fields: [
    {
      name: "orderName",
      label: "Order Name",
      type: "text",
      colSpan: 2,
      required: true,
    },
    {
      name: "orderLink",
      label: "Order Link",
      type: "text",
      colSpan: 3,
    },
    {
      name: "orderType",
      label: "Order Type",
      select: true,
      required: true,
      children: orderTypeOptions.map((o, i) => (
        <MenuItem key={i} value={o.value}>
          {o.label}
        </MenuItem>
      )),
    },
    {
      name: "orderVisibility",
      label: "Order Visibility",
      select: true,
      children: orderVisibilityOptions.map((o, i) => (
        <MenuItem key={i} value={o.value}>
          {o.label}
        </MenuItem>
      )),
    },
    (form: any) => {
      return {
        name: "member",
        label: "Member",
        select: true,
        disabled: form.values?.orderVisibility !== 1,
        children: [],
        reactFormHookProps: { deps: ["orderVisibility"] },
      };
    },
    (form: any) => ({
      name: "menu",
      label: "Upload Menu",
      colSpan: 3,
      render: (props: any) => (
        <MuiFileInput
          {...props}
          value={form.values.menu}
          onChange={(newFile) => form.setFieldValue("menu", newFile)}
          inputProps={{ accept: ".png, .jpeg" }}
          multiple
        />
      ),
    }),
  ],
};

async function handleSubmitForm(values: any, formikBag: any) {
  console.log(values);
}

export function MCAddNewOrderModal() {
  const formRef = useRef<any>();

  async function submitFormFormik() {
    const errors = await formRef.current?.validateForm();
    formRef.current?.submitForm();

    if (!isEmpty(errors)) throw new Error();
  }

  async function submitFormReactHookForm() {
    await formRef.current.trigger();
    await formRef.current.handleSubmit();
    console.log(formRef.current.formState.errors)
    if (!isEmpty(formRef.current.formState.errors)) throw new Error();
  }

  return (
    <ATLargeModal
      title="Add New Order"
      triggerElement={<Button variant="contained">Add New Order</Button>}
      onOk={submitFormFormik}
    >
      <MUIFormBuilder
        meta={{ ...addOrderFormMeta }}
        innerRef={formRef}
      />
    </ATLargeModal>
  );
}
