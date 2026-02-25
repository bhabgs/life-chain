/** 情绪标签 */
export type TEmotionLabel =
  | 'happy'
  | 'sad'
  | 'angry'
  | 'fearful'
  | 'surprised'
  | 'disgusted'
  | 'neutral'
  | 'anxious'
  | 'peaceful'
  | 'excited'

/** 情绪识别结果 */
export interface IEmotionResult {
  label: TEmotionLabel
  confidence: number
  valence: number  // -1 到 1，负向到正向
  arousal: number  // 0 到 1，平静到激动
}

/** 情绪趋势数据 */
export interface IEmotionTrend {
  date: string
  dominant: TEmotionLabel
  valence: number
  arousal: number
}

/** 情绪配置 */
export interface IEmotionConfig {
  id: string
  label: TEmotionLabel
  displayName: string
  color: string
  icon: string
  thresholds: {
    low: number
    medium: number
    high: number
  }
}
