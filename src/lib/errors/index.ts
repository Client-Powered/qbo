import {
  BadGatewayError,
  BadRequestError, QBOError,
  ConflictError,
  ForbiddenError, GatewayTimeoutError,
  GoneError, InternalServerError, LengthRequiredError,
  MethodNotAllowedError,
  NotAcceptableError,
  NotFoundError, NotImplementedError, PayloadTooLargeError,
  PaymentRequiredError, PreconditionFailedError,
  ProxyAuthenticationRequiredError,
  RequestTimeoutError, ServiceUnavailableError, TooManyRequestsError,
  UnauthorizedError, UnprocessableEntityError, UnsupportedMediaTypeError, UnknownQBOError
} from "./error-classes";

export type QBOApiErrorResponse = {
  Fault: {
    Error: {
      Message: string,
      Detail: string,
      code: string
    }[],
    type: string
  },
  time: number
};
export const getErrorFromResponse = async (
  response: Response,
  intuitTid: string | null
): Promise<QBOError> => {
  if (response.ok) {
    throw new Error(`Tried to get an error instance from response but there was no error (received status code ${response.status})`);
  }
  const message: string = `Error in QBO request to url ${response.url}`;
  let errorJsonBody: QBOApiErrorResponse | null = null;
  try {
    errorJsonBody = await response.json();
  } catch {}

  switch (response.status) {
    case 400:
      return new BadRequestError(message, intuitTid, errorJsonBody);
    case 401:
      return new UnauthorizedError(message, intuitTid, errorJsonBody);
    case 402:
      return new PaymentRequiredError(message, intuitTid, errorJsonBody);
    case 403:
      return new ForbiddenError(message, intuitTid, errorJsonBody);
    case 404:
      return new NotFoundError(message, intuitTid, errorJsonBody);
    case 405:
      return new MethodNotAllowedError(message, intuitTid, errorJsonBody);
    case 406:
      return new NotAcceptableError(message, intuitTid, errorJsonBody);
    case 407:
      return new ProxyAuthenticationRequiredError(message, intuitTid, errorJsonBody);
    case 408:
      return new RequestTimeoutError(message, intuitTid, errorJsonBody);
    case 409:
      return new ConflictError(message, intuitTid, errorJsonBody);
    case 410:
      return new GoneError(message, intuitTid, errorJsonBody);
    case 411:
      return new LengthRequiredError(message, intuitTid, errorJsonBody);
    case 412:
      return new PreconditionFailedError(message, intuitTid, errorJsonBody);
    case 413:
      return new PayloadTooLargeError(message, intuitTid, errorJsonBody);
    case 415:
      return new UnsupportedMediaTypeError(message, intuitTid, errorJsonBody);
    case 422:
      return new UnprocessableEntityError(message, intuitTid, errorJsonBody);
    case 429:
      return new TooManyRequestsError(message, intuitTid, errorJsonBody);
    case 500:
      return new InternalServerError(message, intuitTid, errorJsonBody);
    case 501:
      return new NotImplementedError(message, intuitTid, errorJsonBody);
    case 502:
      return new BadGatewayError(message, intuitTid, errorJsonBody);
    case 503:
      return new ServiceUnavailableError(message, intuitTid, errorJsonBody);
    case 504:
      return new GatewayTimeoutError(message, intuitTid, errorJsonBody);
    default:
      return new UnknownQBOError(`Status of ${response.status} is not a known QBO error`, intuitTid, errorJsonBody);
  }
};