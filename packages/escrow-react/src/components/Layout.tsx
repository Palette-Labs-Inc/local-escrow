import type { ReactNode } from 'react'

export function Layout({ children, loading, loadingTitle }: LayoutProps) {
  if (loading) {
    return (
      <div className="flex flex-grow items-center justify-center p-6">
        {loadingTitle ?? 'Loading…'}
      </div>
    )
  }

  return <div className="flex flex-grow flex-col">{children}</div>
}

interface LayoutProps {
  children: ReactNode
  loading?: boolean
  loadingTitle?: string
}

Layout.Content = function LayoutContent({ children, className }: LayoutContentProps) {
  return <div className={`max-w-2xl mx-auto p-6 space-y-8 ${className ?? ''}`}>{children}</div>
}

interface LayoutContentProps {
  children: ReactNode
  className?: string
}

Layout.Header = function LayoutHeader({ title, subtitle }: LayoutHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  )
}

interface LayoutHeaderProps {
  title: string
  subtitle?: ReactNode
}

Layout.Footer = function LayoutFooter({ children, className }: LayoutFooterProps) {
  return <div className={`mt-auto w-full p-6 ${className ?? ''}`}>{children}</div>
}

interface LayoutFooterProps {
  children: ReactNode
  className?: string
} 