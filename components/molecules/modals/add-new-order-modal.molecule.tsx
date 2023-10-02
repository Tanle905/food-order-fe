import { ATLargeModal } from "@/components/atoms/modals/large-modal.atom";
import { Button, MenuItem } from "@mui/material";
import {
  FormBuilderMeta,
  MUIFormBuilder,
} from "../forms/mui-form-builder.molecule";
import { FormikProps } from "formik";
import { useState } from "react";
import {
  orderTypeOptions,
  orderVisibilityOptions,
} from "@/constants/variables";
import { array, object, string } from "yup";
import { MuiFileInput } from "mui-file-input";
import { isEmpty } from "lodash";

const addOrderFormMeta: FormBuilderMeta = {
  columns: 3,
  validationSchema: object({
    orderName: string()
      .max(20, "Order Name can not be longer than 20 characters")
      .required("Order Name is required"),
    orderLink: string().required().max(
      100,
      "Order Link cannot be longer than 100 characters"
    ),
    orderType: string().required(),
    orderVisibility: string().required(),
    menu: array().required().min(1, 'dsfsdf'),
  }),
  initialValues: {
    orderType: 0,
    orderVisibility: 0,
  },
  handleSubmit(values) {
    console.log(values);
  },
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
    (form: FormikProps<any>) => {
      return {
        name: "member",
        label: "Member",
        select: true,
        disabled: form.values?.orderVisibility !== 1,
        children: [],
      };
    },
    (form: FormikProps<any>) => ({
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

export function MCAddNewOrderModal() {
  const [form, setForm] = useState<FormikProps<any>>();

  async function handleSubmitForm() {
    const errors = await form?.validateForm();
    await form?.submitForm();

    if (!isEmpty(errors)) throw new Error();
  }

  return (
    <ATLargeModal
      title="Add New Order"
      triggerElement={<Button variant="contained">Add New Order</Button>}
      onOk={handleSubmitForm}
    >
      <MUIFormBuilder meta={{ ...addOrderFormMeta, setForm }} />
    </ATLargeModal>
  );
}
