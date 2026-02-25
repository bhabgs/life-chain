import { Tag } from 'antd'
import { USER_STATUS } from '@lifechain/shared'
import type { TUserStatus } from '@lifechain/shared'

interface StatusTagProps {
  status: TUserStatus
}

export default function StatusTag({ status }: StatusTagProps) {
  const config = USER_STATUS[status]
  if (!config) return <Tag>{status}</Tag>
  return <Tag color={config.color}>{config.label}</Tag>
}
