import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCatalog } from '../hooks/use-catalog'
import type { Catalogs } from '../types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

function NewCollectionDialog({ trigger, onConfirm }: { trigger: React.ReactNode; onConfirm: (name: string) => void }) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Collection</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Input type="text" placeholder="Collection Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            disabled={!name}
            onClick={() => {
              if (name) {
                onConfirm(name)
                setOpen(false)
              }
            }}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

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
                    <Button variant="secondary">Remove</Button>
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

function CatalogView() {
  const { catalogs, putRecord } = useCatalog()
  const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null)

  useEffect(() => {
    if (catalogs) {
      const catalogIds = Object.keys(catalogs.catalogs)
      if (catalogIds.length > 0) {
        setSelectedCatalog(catalogIds[0])
      }
    }
  }, [catalogs])

  if (!catalogs) {
    return <div>Loading...</div>
  }

  const handleNewCollection = (name: string) => {
    putRecord({
      type: 'xyz.noshdelivery.v0.catalog.collection',
      object: {
        name,
        items: [],
        childCollections: [],
      },
    })
  }
  return (
    <>
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

          <NewCollectionDialog
            trigger={
              <Button variant="default" className="mb-8">
                New Collection
              </Button>
            }
            onConfirm={handleNewCollection}
          />

          {selectedCatalog && (
            <div>
              {Object.values(catalogs.collections).map((collection) => (
                <Collection key={collection.id} catalog={catalogs} id={collection.id} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default CatalogView
