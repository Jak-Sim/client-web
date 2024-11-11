export const coloredStatusCode = (statusCode: number) => {
  let color = '';

  if (statusCode < 200) {
    color = '\x1b[34m';
  } else if (statusCode < 300) {
    color = '\x1b[32m';
  } else if (statusCode < 400) {
    color = '\x1b[34m';
  } else {
    color = '\x1b[31m';
  }
  return `${color}${statusCode}${color}`;
};
