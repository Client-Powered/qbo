import { QBOApiErrorResponse } from "./index";

export class QBOError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly name: string,
    public readonly intuitTid: number | null = null,
    public readonly errorJson: QBOApiErrorResponse | null
  ) {
    super(message);
  }
}

export class UnknownQBOError extends QBOError {
  constructor(
    message: string,
    intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 0, "Unknown", intuitTid, errorJson);
  }
}

export class InvalidQueryArgsError extends QBOError {
  constructor(message: string, intuitTid: number | null) {
    super(message, 400, "InvalidQueryArgs", intuitTid, null);
  }
}

export class BadRequestError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 400, "BadRequest", intuitTid, errorJson);
  }
}

export class UnauthorizedError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 401, "Unauthorized", intuitTid, errorJson);
  }
}

export class PaymentRequiredError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 402, "PaymentRequired", intuitTid, errorJson);
  }
}

export class ForbiddenError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 403, "Forbidden", intuitTid, errorJson);
  }
}

export class NotFoundError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 404, "NotFound", intuitTid, errorJson);
  }
}

export class MethodNotAllowedError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 405, "MethodNotAllowed", intuitTid, errorJson);
  }
}

export class NotAcceptableError extends QBOError {
  constructor(
    message: string,
    intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 406, "NotAcceptable", intuitTid, errorJson);
  }
}

export class ProxyAuthenticationRequiredError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 407, "ProxyAuthenticationRequired", intuitTid, errorJson);
  }
}

export class RequestTimeoutError extends QBOError {
  constructor(
    message: string,
    intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 408, "RequestTimeout", intuitTid, errorJson);
  }
}

export class ConflictError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 409, "Conflict", intuitTid, errorJson);
  }
}

export class GoneError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 410, "Gone", intuitTid, errorJson);
  }
}

export class LengthRequiredError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 411, "LengthRequired", intuitTid, errorJson);
  }
}

export class PreconditionFailedError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 412, "PreconditionFailed", intuitTid, errorJson);
  }
}

export class PayloadTooLargeError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 413, "PayloadTooLarge", intuitTid, errorJson);
  }
}

export class UnsupportedMediaTypeError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 415, "UnsupportedMediaType", intuitTid, errorJson);
  }
}

export class UnprocessableEntityError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 422, "UnprocessableEntity", intuitTid, errorJson);
  }
}

export class TooManyRequestsError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 429, "TooManyRequests", intuitTid, errorJson);
  }
}

export class InternalServerError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 500, "InternalServerError", intuitTid, errorJson);
  }
}

export class NotImplementedError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 501, "NotImplemented", intuitTid, errorJson);
  }
}

export class BadGatewayError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 502, "BadGateway", intuitTid, errorJson);
  }
}

export class ServiceUnavailableError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 503, "ServiceUnavailable", intuitTid, errorJson);
  }
}

export class GatewayTimeoutError extends QBOError {
  constructor(
    message: string, intuitTid: number | null,
    errorJson: QBOApiErrorResponse | null = null
  ) {
    super(message, 504, "GatewayTimeout", intuitTid, errorJson);
  }
}