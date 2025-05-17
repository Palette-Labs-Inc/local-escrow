import { createFileRoute } from '@tanstack/react-router'
import { App as Home } from '../App'

export const Route = createFileRoute('/')({
  component: Home,
}) 