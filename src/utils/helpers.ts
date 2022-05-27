export const formBuilder = (baseForm: any[]) => {
  const buildedForm: any[] = [];

  const isOddNumber = baseForm.length / 2;

  baseForm.forEach((inputs, index) => {
    buildedForm.push({
      input: {
        name: inputs.name,
        id: inputs.name,
        type: inputs.type,
        value: inputs.value ?? null,
        placeholder: `Digite o ${inputs.label}`,
        tabIndex: index,
        options: inputs.options ?? null,
      },
      label: {
        text: inputs.label,
        html_for: inputs.name,
      },
      styles: {
        col_lg:
          index === 0
            ? isOddNumber / 2 === 1
              ? 6
              : 12
            : index === baseForm.length - 1
            ? isOddNumber / 2 === 1
              ? 6
              : 12
            : 6,
      },
      invalid: false,
      onChange: inputs.onChange,
    });
  });

  return buildedForm;
};

export const verifyInputsFields = async (
  element: object | any,
  fields: any[]
) => {
  const options = [...fields];

  fields.forEach((field, index) => {
    options[index] = {
      ...options[index],
      invalid: !element[field.input.name] ? true : false,
    };
  });

  return options;
};

export const verifyInputsIsFilled = (inputs: any) => {
  const keys = Object.keys(inputs);

  let errors_found = false;

  keys.forEach((key) => {
    if (inputs[key] === "") errors_found = true;
  });

  return errors_found;
};

export const decodeExceptionObject = (
  exception: any,
  custom_message?: string
) => {
  const { status, data } = exception.response;

  switch (status) {
    case 404:
      return custom_message;
    case 500:
      return "Falha de conexão, verifique sua internet e tente novamente!";
    default:
      return data?.response;
  }
};
