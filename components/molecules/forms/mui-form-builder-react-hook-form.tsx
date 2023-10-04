import { Grid, TextFieldProps, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactElement, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { isEmpty } from "lodash";
import React from "react";

export interface MUIFormBuilderRHFProps {
  meta: FormBuilderRHFMeta;
}

export interface FormBuilderRHFMeta {
  columns?: number;
  initialValues?: any;
  validationSchema?: ObjectSchema<any>;
  handleSubmit: any;
  innerRef?: any;
  fields: (TextFieldProps & {
    name: string;
    colSpan?: number;
    render?: (props: any) => ReactElement;
    reactFormHookProps?: {};
  })[];
}

export const MUIFormBuilderReactHookForm = React.forwardRef(
  ({ meta }: MUIFormBuilderRHFProps, ref) => {
    const {
      watch,
      register,
      formState,
      handleSubmit,
      getValues,
      setValue,
      trigger,
    } = useForm({
      defaultValues: !isEmpty(meta.initialValues)
        ? meta.initialValues
        : meta.fields.reduce((prev, cur) => ({ ...prev, [cur.name]: "" }), {}),
      ...(meta.validationSchema && {
        resolver: yupResolver(meta.validationSchema),
      }),
    });

    useImperativeHandle(ref, () => {
      return {
        validateForm: trigger,
        handleSubmit,
      };
    });

    return (
      <form onSubmit={handleSubmit(meta.handleSubmit)}>
        <Grid container columns={meta.columns ?? 1} spacing={2}>
          {meta.fields.map((field: any, i) => {
            const f =
              typeof field === "function"
                ? field({ values: getValues(), setFieldValue: setValue, watch })
                : field;
            const errors =
              (formState.touchedFields[f.name] || formState.submitCount > 0) &&
              formState.errors[f.name]?.message;
            const fieldProps = {
              ...f,
              fullWidth: true,
              error: !!errors,
              helperText: errors,
            };

            return (
              <Grid key={i} item xs={f.colSpan ?? 1}>
                {f?.render?.({
                  ...register(f.name, f.reactFormHookProps),
                  ...fieldProps,
                }) ?? <TextField {...register(f.name)} {...fieldProps} />}
              </Grid>
            );
          })}
        </Grid>
      </form>
    );
  }
);
