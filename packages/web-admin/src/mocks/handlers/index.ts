import { authHandlers } from './auth.handlers'
import { userHandlers } from './user.handlers'
import { memoryHandlers } from './memory.handlers'
import { personalityHandlers } from './personality.handlers'
import { dashboardHandlers } from './dashboard.handlers'
import { systemHandlers } from './system.handlers'
import { contentHandlers } from './content.handlers'
import { emotionHandlers } from './emotion.handlers'
import { supportHandlers } from './support.handlers'
import { stageHandlers } from './stage.handlers'
import { assetHandlers } from './asset.handlers'
import { hardwareHandlers } from './hardware.handlers'
import { analysisHandlers } from './analysis.handlers'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...memoryHandlers,
  ...personalityHandlers,
  ...dashboardHandlers,
  ...systemHandlers,
  ...contentHandlers,
  ...emotionHandlers,
  ...supportHandlers,
  ...stageHandlers,
  ...assetHandlers,
  ...hardwareHandlers,
  ...analysisHandlers,
]
