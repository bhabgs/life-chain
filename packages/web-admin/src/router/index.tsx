import type { RouterProviderProps } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

export const router: RouterProviderProps['router'] = createBrowserRouter(routes)
