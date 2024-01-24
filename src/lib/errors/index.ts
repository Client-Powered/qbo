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
  time: string
};
export const getErrorFromResponse = async (
  response: Response
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
      return new BadRequestError(message, errorJsonBody);
    case 401:
      return new UnauthorizedError(message, errorJsonBody);
    case 402:
      return new PaymentRequiredError(message, errorJsonBody);
    case 403:
      return new ForbiddenError(message, errorJsonBody);
    case 404:
      return new NotFoundError(message, errorJsonBody);
    case 405:
      return new MethodNotAllowedError(message, errorJsonBody);
    case 406:
      return new NotAcceptableError(message, errorJsonBody);
    case 407:
      return new ProxyAuthenticationRequiredError(message, errorJsonBody);
    case 408:
      return new RequestTimeoutError(message, errorJsonBody);
    case 409:
      return new ConflictError(message, errorJsonBody);
    case 410:
      return new GoneError(message, errorJsonBody);
    case 411:
      return new LengthRequiredError(message, errorJsonBody);
    case 412:
      return new PreconditionFailedError(message, errorJsonBody);
    case 413:
      return new PayloadTooLargeError(message, errorJsonBody);
    case 415:
      return new UnsupportedMediaTypeError(message, errorJsonBody);
    case 422:
      return new UnprocessableEntityError(message, errorJsonBody);
    case 429:
      return new TooManyRequestsError(message, errorJsonBody);
    case 500:
      return new InternalServerError(message, errorJsonBody);
    case 501:
      return new NotImplementedError(message, errorJsonBody);
    case 502:
      return new BadGatewayError(message, errorJsonBody);
    case 503:
      return new ServiceUnavailableError(message, errorJsonBody);
    case 504:
      return new GatewayTimeoutError(message, errorJsonBody);
    default:
      return new UnknownQBOError(`Status of ${response.status} is not a known QBO error`, errorJsonBody);
  }
};