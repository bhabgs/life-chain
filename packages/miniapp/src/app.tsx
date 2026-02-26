import { PropsWithChildren } from 'react'
import { setupMock } from './mock'
import './app.scss'

// 开发环境下启用 mock
setupMock()

export default function App({ children }: PropsWithChildren) {
  return <>{children}</>
}
