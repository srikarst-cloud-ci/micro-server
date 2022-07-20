export async function withPromise(
  wrappedFn: WrappedFn
): Promise<ResponseOutput> {
  return new Promise<ResponseOutput>(
    async (
      resolve: (output: ResponseOutput) => any,
      reject: (output: ResponseOutput) => any
    ) => {
      const output: ResponseOutput = await wrappedFn();
      switch (output.status) {
        case 200:
          resolve(output);
          break;
        case 400:
          reject(output);
          break;
        case 404:
          reject(output);
          break;
        default:
          resolve(output);
          break;
      }
    }
  );
}
