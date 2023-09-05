import { Grid, TextFieldProps, TextField } from "@mui/material";
import { FormikValues, useFormik } from "formik";
import { isEmpty } from "lodash";
import { ReactElement, useEffect } from "react";
import { ObjectSchema } from "yup";

interface MUIFormBuilderProps {
  meta: FormBuilderMeta;
}

export interface FormBuilderMeta {
  columns?: number;
  initialValues?: any;
  validationSchema?: ObjectSchema<any>;
  setForm?: any;
  handleSubmit: (values: any) => any;
  fields: (TextFieldProps & {
    name: string;
    colSpan?: number;
    render?: (props: any) => ReactElement;
  })[];
}

export function MUIFormBuilder<T extends FormikValues>({
  meta,
}: MUIFormBuilderProps) {
  const { initialValues, validationSchema, fields, columns, setForm } = meta;
  const formik = useFormik<T>({
    initialValues: !isEmpty(initialValues)
      ? initialValues
      : fields.reduce((prev, cur) => ({ ...prev, [cur.name]: "" }), {}),
    validationSchema,
    onSubmit: meta.handleSubmit,
    onReset: () => {},
  });

  useEffect(() => {
    setForm && setForm(formik);
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container columns={columns ?? 1} spacing={2}>
        {fields.map((field: any, i) => {
          const f = typeof field === "function" ? field(formik) : field;
          return (
            <Grid key={i} item xs={f.colSpan ?? 1}>
              {f.render ? (
                f.render({
                  ...formik.getFieldProps(f.name),
                  fullWidth: true,
                  id: f.name,
                  label: f.label,
                })
              ) : (
                <TextField
                  {...f}
                  fullWidth
                  id={f.name}
                  label={f.label}
                  {...formik.getFieldProps(f.name)}
                  error={Boolean(formik.errors[f.name])}
                  helperText={formik.errors[f.name] as any}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
}
