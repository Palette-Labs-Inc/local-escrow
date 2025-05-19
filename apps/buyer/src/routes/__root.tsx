import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { Menubar, MenuItem } from '@ariakit/react'
import { useAccount } from 'wagmi'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const { isConnected } = useAccount()
  return (
    <>
      {/* Primary navigation */}
      <header className="border-b border-gray-200 mb-4">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-4">
          <Link to="/" className="font-bold text-lg">
            Buyer
          </Link>

          {isConnected && (
            <Menubar aria-label="Main" className="flex gap-4">
              <MenuItem
                className="px-2 py-1 rounded focus:outline-none"
                render={
                  <Link
                    to="/profile"
                    className="outline-none"
                    activeProps={{ className: 'font-semibold text-blue-600' }}
                  />
                }
              >
                Profile
              </MenuItem>
              <MenuItem
                className="px-2 py-1 rounded focus:outline-none"
                render={
                  <Link
                    to="/shop"
                    className="outline-none"
                    activeProps={{ className: 'font-semibold text-blue-600' }}
                  />
                }
              >
                Shop
              </MenuItem>
              <MenuItem
                className="px-2 py-1 rounded focus:outline-none"
                render={
                  <Link
                    to="/orders"
                    className="outline-none"
                    activeProps={{ className: 'font-semibold text-blue-600' }}
                  />
                }
              >
                Orders
              </MenuItem>
            </Menubar>
          )}
        </div>
      </header>

      <Outlet />

      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
