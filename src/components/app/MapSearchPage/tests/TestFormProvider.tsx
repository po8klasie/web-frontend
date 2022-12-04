import { FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { FC, ReactNode } from 'react';

interface TestFormProviderProps {
  renderField: (formMethods: UseFormReturn) => ReactNode;
  defaultValues?: UseFormProps['defaultValues'];
}

const TestFormProvider: FC<TestFormProviderProps> = ({ renderField, defaultValues = {} }) => {
  const formMethods = useForm({
    defaultValues,
  });
  return <FormProvider {...formMethods}>{renderField(formMethods)}</FormProvider>;
};

export default TestFormProvider;
