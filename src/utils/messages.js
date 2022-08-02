import "./message.css";

export const successMessage = (success, msg) => {
  // setTimeout(() => {
  if (success) return <div className="message__success">{msg}</div>;
  // }, 300);
};

export const errorMessage = (error, msg) => {
  if (error) return <div>{msg}</div>;
};
