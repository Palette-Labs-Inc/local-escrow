import { useEffect, useState } from 'react'
import { AtUri } from '@atproto/uri'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCatalog } from '../hooks/use-catalog'
import type { Catalogs } from '../types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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

function CreateOrEditItemDialog({
  trigger,
  onConfirm,
  item,
}: {
  trigger: React.ReactNode
  onConfirm: (name: string, price: number) => void
  item?: { name: string; price: number }
}) {
  console.log('item', item)
  const [name, setName] = useState(item?.name || '')
  const [price, setPrice] = useState(item?.price || 0)
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Collection</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="number"
            placeholder="Price"
            value={String(price)}
            onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : 0)}
          />
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            disabled={!name}
            onClick={() => {
              if (name) {
                onConfirm(name, price)
                setOpen(false)
              }
            }}
          >
            {item ? 'Update' : 'Create'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Collection({ catalog, id }: { catalog: Catalogs; id: string }) {
  const { putRecord } = useCatalog()

  const collection = catalog.collections[id]
  const itemMap = catalog.items

  const handleNewItem = (name: string, price: number) => {
    putRecord(
      {
        type: 'xyz.noshdelivery.v0.catalog.item',
        object: {
          name,
          priceMoney: { amount: price, currency: 'USD' },
        },
      },
      {
        onSuccess: (uri) => {
          // Now update the collection to include the new item
          const itemUri = new AtUri(uri)
          const itemId = itemUri.rkey
          console.log('itemId', itemId)
          putRecord({
            type: 'xyz.noshdelivery.v0.catalog.collection',
            object: {
              ...collection,
              items: [...collection.items, itemId],
            },
          })
        },
      },
    )
  }

  const handleRemoveItem = (itemId: string) => {
    putRecord({
      type: 'xyz.noshdelivery.v0.catalog.collection',
      object: {
        ...collection,
        items: collection.items.filter((id) => id !== itemId),
      },
    })
  }

  const handleEditItem = (itemId: string, name: string, price: number) => {
    putRecord({
      type: 'xyz.noshdelivery.v0.catalog.item',
      object: {
        ...itemMap[itemId],
        name,
        priceMoney: { amount: price, currency: 'USD' },
      },
    })
  }

  return (
    <div>
      <div className="flex flex-row items-center mb-4">
        <h2 className="mb-1 mr-4">{collection.name}</h2>
        <CreateOrEditItemDialog trigger={<Button variant="secondary">+</Button>} onConfirm={handleNewItem} />
      </div>
      <div>
        {collection.items.map((itemId) => {
          if (!itemMap[itemId]) {
            return null
          }
          return (
            <div key={itemId}>
              <Card className="mb-4 w-200">
                <CardContent>
                  <div className="flex flex-row items-center">
                    <h3 className="grow">{itemMap[itemId].name}</h3>
                    <div className="mr-12 font-bold">${itemMap[itemId].priceMoney.amount}</div>
                    <div className="flex flex-row gap-2">
                      <CreateOrEditItemDialog
                        trigger={<Button variant="secondary">Edit</Button>}
                        onConfirm={(name, price) => handleEditItem(itemId, name, price)}
                        item={{ name: itemMap[itemId].name, price: itemMap[itemId].priceMoney.amount }}
                      />
                      <Button variant="secondary" onClick={() => handleRemoveItem(itemId)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
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
