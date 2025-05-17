import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCatalog } from './hooks/use-catalog'
import { Separator } from './components/ui/separator'
import type { Catalogs } from './types'

function Collection({ catalog, id }: { catalog: Catalogs; id: string }) {
  const collection = catalog.collections[id]
  const itemMap = catalog.items

  return (
    <div>
      <div className="flex flex-row items-center mb-4">
        <h2 className="mb-1 mr-4">{collection.name}</h2>
        <Button variant="secondary">+</Button>
      </div>
      <div>
        {collection.items.map((itemId) => (
          <div key={itemId}>
            <Card className="mb-4 w-200">
              <CardContent>
                <div className="flex flex-row items-center">
                  <h3 className="grow">{itemMap[itemId].name}</h3>
                  <div className="mr-12 font-bold">${itemMap[itemId].priceMoney.amount}</div>
                  <div className="flex flex-row gap-2">
                    <Button variant="secondary">Edit</Button>
                    <Button variant="secondary">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const { catalogs } = useCatalog()
  const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null)

  useEffect(() => {
    const catalogIds = Object.keys(catalogs.catalogs)
    if (catalogIds.length > 0) {
      setSelectedCatalog(catalogIds[0])
    }
  }, [catalogs])

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Merchant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.values(catalogs.catalogs).map((catalog) => (
            <Card
              key={catalog.id}
              className={`w-60 hover:shadow-md transition-all duration-300 cursor-pointer ${
                selectedCatalog === catalog.id ? 'border-gray-200' : ''
              }`}
              onClick={() => setSelectedCatalog(catalog.id)}
            >
              <CardHeader>
                <CardTitle>{catalog.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Button variant="default" className="mb-8">
          New Collection
        </Button>

        {selectedCatalog && (
          <div>
            {Object.values(catalogs.collections).map((collection) => (
              <Collection key={collection.id} catalog={catalogs} id={collection.id} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default App
