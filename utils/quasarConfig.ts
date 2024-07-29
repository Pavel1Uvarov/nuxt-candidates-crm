type State = {
  errors: string[];
};

export const quasarConfig = (state: State) => {
  return {
    props: {
      error: !!state.errors[0],
      "error-message": state.errors[0],
      validateOnBlur: true,
      validateOnInput: false,
    },
  };
};
