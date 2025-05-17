import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      {/* Simple nav – extend as needed */}
      <nav className="p-2 flex gap-4 border-b border-gray-200 mb-4">
        <Link to="/" className="[&.active]:font-semibold">
          Home
        </Link>
      </nav>

      {/* Render the matched child route */}
      <Outlet />

      {/* Devtools only in development */}
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
} 