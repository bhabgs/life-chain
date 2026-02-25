import { authHandlers } from './auth.handlers'
import { userHandlers } from './user.handlers'
import { memoryHandlers } from './memory.handlers'
import { personalityHandlers } from './personality.handlers'
import { dashboardHandlers } from './dashboard.handlers'
import { systemHandlers } from './system.handlers'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...memoryHandlers,
  ...personalityHandlers,
  ...dashboardHandlers,
  ...systemHandlers,
]
