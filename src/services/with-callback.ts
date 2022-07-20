export async function withCallback(
  wrappedFn: WrappedFn,
  successCallback: (output: ResponseOutput) => any,
  errorCallback: (output: ResponseOutput) => any
) {
  const output: ResponseOutput = await wrappedFn();
  switch (output.status) {
    case 200:
      successCallback(output);
      break;
    case 400:
      errorCallback(output);
      break;
    case 404:
      errorCallback(output);
      break;
    default:
      successCallback(output);
      break;
  }
}
