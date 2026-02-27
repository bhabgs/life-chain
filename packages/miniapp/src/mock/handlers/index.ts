import type { IRouteEntry } from '../helpers'
import { authHandlers } from './auth.handlers'
import { memoryHandlers } from './memory.handlers'
import { chatHandlers } from './chat.handlers'
import { userHandlers } from './user.handlers'
import { reviewHandlers } from './review.handlers'
import { uploadHandlers } from './upload.handlers'
import { shareHandlers } from './share.handlers'

/** 所有 mock 路由 */
export const routes: IRouteEntry[] = [
  ...authHandlers,
  ...memoryHandlers,
  ...chatHandlers,
  ...userHandlers,
  ...reviewHandlers,
  ...uploadHandlers,
  ...shareHandlers,
]
