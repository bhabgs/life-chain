import type { IRouteEntry } from '../helpers'
import { ok } from '../helpers'

export const uploadHandlers: IRouteEntry[] = [
  // 图片上传（mock）
  {
    method: 'POST',
    pattern: '/upload/image',
    handler: () =>
      ok({
        url: `https://picsum.photos/400/300?random=${Date.now()}`,
        filename: `upload-${Date.now()}.jpg`,
      }),
  },

  // 语音转文字（mock）
  {
    method: 'POST',
    pattern: '/upload/voice-transcribe',
    handler: () =>
      ok({
        text: '这是一段模拟的语音转文字结果，记录了今天发生的一些有趣的事情。阳光很好，心情也不错。',
        duration: 15,
        confidence: 0.95,
      }),
  },
]
