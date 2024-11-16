export const extractErrorReason = (error: any) => {
  if (!error) return 'Unknown error';

  if (error.reason) {
    return error.reason;
  }

  if (error.cause && error.cause.reason) {
    return error.cause.reason;
  }

  const message = error.message || '';
  const regex = /reverted with the following reason:\s*(.*)/;
  const matches = message.match(regex);
  if (matches && matches[1]) {
    return matches[1];
  }

  return message || 'Unknown error';
};
