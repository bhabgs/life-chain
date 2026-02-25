/** 验证邮箱格式 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/** 验证密码强度（至少8位，包含字母和数字） */
export function validatePassword(password: string): {
  valid: boolean
  message?: string
} {
  if (password.length < 8) {
    return { valid: false, message: '密码长度至少8位' }
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: '密码需要包含字母' }
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: '密码需要包含数字' }
  }
  return { valid: true }
}

/** 验证手机号（中国大陆） */
export function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/** 验证用户名（3-20位字母数字下划线） */
export function validateUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username)
}
