export const validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export function formatDollar(number) {
  const formattedNumber = number.toLocaleString();

  const parts = formattedNumber.split(",");

  return `$${parts.join(",")}`;
}

export default {
  validateEmail,
  formatDollar,
};
