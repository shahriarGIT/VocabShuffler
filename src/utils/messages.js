export const successMessage = (success, msg) => {
  if (success) return <div>{msg}</div>;
};

export const errorMessage = (error, msg) => {
  if (error) return <div>{msg}</div>;
};
