import { QBOApiErrorResponse } from "./index";

export class QBOError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly name: string,
    public readonly errorJson: QBOApiErrorResponse | null
  ) {
    super(message);
  }
}

export class UnknownQBOError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 0, "Unknown", errorJson);
  }
}

export class InvalidQueryArgsError extends QBOError {
  constructor(message: string) {
    super(message, 400, "InvalidQueryArgs", null);
  }
}

export class BadRequestError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 400, "BadRequest", errorJson);
  }
}

export class UnauthorizedError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 401, "Unauthorized", errorJson);
  }
}

export class PaymentRequiredError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 402, "PaymentRequired", errorJson);
  }
}

export class ForbiddenError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 403, "Forbidden", errorJson);
  }
}

export class NotFoundError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 404, "NotFound", errorJson);
  }
}

export class MethodNotAllowedError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 405, "MethodNotAllowed", errorJson);
  }
}

export class NotAcceptableError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 406, "NotAcceptable", errorJson);
  }
}

export class ProxyAuthenticationRequiredError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 407, "ProxyAuthenticationRequired", errorJson);
  }
}

export class RequestTimeoutError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 408, "RequestTimeout", errorJson);
  }
}

export class ConflictError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 409, "Conflict", errorJson);
  }
}

export class GoneError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 410, "Gone", errorJson);
  }
}

export class LengthRequiredError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 411, "LengthRequired", errorJson);
  }
}

export class PreconditionFailedError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 412, "PreconditionFailed", errorJson);
  }
}

export class PayloadTooLargeError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 413, "PayloadTooLarge", errorJson);
  }
}

export class UnsupportedMediaTypeError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 415, "UnsupportedMediaType", errorJson);
  }
}

export class UnprocessableEntityError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 422, "UnprocessableEntity", errorJson);
  }
}

export class TooManyRequestsError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 429, "TooManyRequests", errorJson);
  }
}

export class InternalServerError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 500, "InternalServerError", errorJson);
  }
}

export class NotImplementedError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 501, "NotImplemented", errorJson);
  }
}

export class BadGatewayError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 502, "BadGateway", errorJson);
  }
}

export class ServiceUnavailableError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 503, "ServiceUnavailable", errorJson);
  }
}

export class GatewayTimeoutError extends QBOError {
  constructor(
    message: string,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 504, "GatewayTimeout", errorJson);
  }
}