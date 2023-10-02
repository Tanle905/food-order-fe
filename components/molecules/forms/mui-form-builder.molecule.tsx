import { Grid, TextFieldProps, TextField } from "@mui/material";
import { Formik, FormikBag, FormikHelpers, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import { ReactElement } from "react";
import { ObjectSchema } from "yup";

interface MUIFormBuilderProps {
  meta: FormBuilderMeta;
}

export interface FormBuilderMeta {
  columns?: number;
  initialValues?: any;
  validationSchema?: ObjectSchema<any>;
  handleSubmit: ((
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>) &
    ((values: any, formikBag: FormikBag<any, any>) => any);
  innerRef?: any;
  fields: (TextFieldProps & {
    name: string;
    colSpan?: number;
    render?: (props: any) => ReactElement;
  })[];
}

export function MUIFormBuilder({ meta }: MUIFormBuilderProps) {
  const {
    initialValues,
    validationSchema,
    fields,
    columns,
    innerRef,
    handleSubmit,
  } = meta;

  return (
    <Formik
      initialValues={
        !isEmpty(initialValues)
          ? initialValues
          : fields.reduce((prev, cur) => ({ ...prev, [cur.name]: "" }), {})
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      onReset={() => {}}
      innerRef={innerRef}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Grid container columns={columns ?? 1} spacing={2}>
            {fields.map((field: any, i) => {
              const f = typeof field === "function" ? field(formik) : field;
              const errors =
                (formik.touched[f.name] || formik.submitCount > 0) &&
                (formik.errors[f.name] as any);

              return (
                <Grid key={i} item xs={f.colSpan ?? 1}>
                  {f.render ? (
                    f.render({
                      ...formik.getFieldProps(f.name),
                      fullWidth: true,
                      id: f.name,
                      label: f.label,
                      error: !!errors,
                      helperText: errors,
                    })
                  ) : (
                    <TextField
                      {...f}
                      fullWidth
                      id={f.name}
                      label={f.label}
                      {...formik.getFieldProps(f.name)}
                      error={!!errors}
                      helperText={errors}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        </form>
      )}
    </Formik>
  );
}
