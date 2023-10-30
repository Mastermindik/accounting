interface ICustomError {
  status: number,
  data: {
    status: number,
    message: string,
    timestamp: string
  }
}

interface IFetchError {
  /**
   * * `"FETCH_ERROR"`:
   *   An error that occurred during execution of `fetch` or the `fetchFn` callback option
   **/
  status: 'FETCH_ERROR';
  data?: undefined;
  error: string;
}

interface IParsingError {
  /**
   * * `"PARSING_ERROR"`:
   *   An error happened during parsing.
   *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
   *   or an error occurred while executing a custom `responseHandler`.
   **/
  status: 'PARSING_ERROR';
  originalStatus: number;
  data: string;
  error: string;
}

interface ITimeoutError {
  /**
   * * `"TIMEOUT_ERROR"`:
   *   Request timed out
   **/
  status: 'TIMEOUT_ERROR';
  data?: undefined;
  error: string;
}

export type IAppError = ICustomError | IFetchError | IParsingError | ITimeoutError

