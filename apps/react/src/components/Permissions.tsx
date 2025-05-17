import { DisclosureProvider, Disclosure, DisclosureContent } from '@ariakit/react'
import { Json } from 'ox'
import { Hooks } from 'porto/wagmi'

function syntaxHighlight(json: string) {
  return json
    .split('\n')
    .map(line => 
      line
        .replace(/^(\s*)"([^"]+)":/gm, '$1<span class="text-purple-600">"$2"</span>:') // keys
        .replace(/: "([^"]+)"/g, ': <span class="text-green-600">"$1"</span>') // string values
        .replace(/: ([0-9]+)/g, ': <span class="text-blue-600">$1</span>') // numbers
        .replace(/: (true|false|null)/g, ': <span class="text-blue-600">$1</span>') // booleans and null
    )
    .join('\n')
}

export function Permissions() {
  const permissions = Hooks.usePermissions()
  const latestPermissions = permissions.data?.at(-1)
  const formattedJson = latestPermissions ? syntaxHighlight(Json.stringify(latestPermissions, null, 2)) : ''

  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <DisclosureProvider>
        <Disclosure className="mb-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors data-[open]:bg-gray-100">
          View Permissions
        </Disclosure>
        <DisclosureContent className="p-4 bg-gray-900 rounded-lg mb-4 overflow-x-auto max-h-[500px] overflow-y-auto">
          <pre className="text-sm font-mono text-white">
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
            <code dangerouslySetInnerHTML={{ __html: formattedJson }} />
          </pre>
        </DisclosureContent>
      </DisclosureProvider>
    </section>
  )
} 