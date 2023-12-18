import * as enums from "../json/enums.json" assert { type: "json" };
import { APIError } from '#errors/common'

export class IncorrectEmailOrPasswordError extends APIError {
  constructor(originalError) {
    super({
      type: 'auth/incorrect_credentials',
      title: 'Incorrect email or password',
      status: enums.HTTP_CODES.INTERNAL_SERVER_ERROR,
      cause: originalError,
    })
  }
}
