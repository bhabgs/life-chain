/** 设计系统颜色 */
export const COLORS = {
  primary: '#FF8A5B',
  secondary: '#5BA3FF',
  success: '#52C41A',
  warning: '#FAAD14',
  error: '#F5222D',
  text: {
    primary: '#262626',
    secondary: '#8C8C8C',
    disabled: '#BFBFBF',
  },
  background: {
    default: '#FFFFFF',
    secondary: '#FAFAFA',
  },
} as const

/** 间距规范 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

/** 字体大小规范 */
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
} as const
