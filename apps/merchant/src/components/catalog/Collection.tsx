import { useCatalog } from '#/hooks/use-catalog'
import { useState } from 'react'
import Item from './Item'
import { EditOrCreateItem } from './Item'
import { AtUri } from '@atproto/api'
const LINK_CLASSES = 'inline-block cursor-pointer ml-2 font-semibold text-blue-600'

export default function Collection({ collectionId }: { collectionId: string }) {
  const { catalogs, putRecord } = useCatalog()
  const collection = catalogs?.collections[collectionId]!
  const [creatingItem, setCreatingItem] = useState(false)

  const handleCreateItem = (name: string, price: number) => {
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
          putRecord({
            type: 'xyz.noshdelivery.v0.catalog.collection',
            object: {
              ...collection,
              items: [...collection.items, itemId],
            },
          })
          setCreatingItem(false)
        },
      },
    )
  }

  const handleRemoveItem = (itemId: string) => {
    putRecord({
      type: 'xyz.noshdelivery.v0.catalog.collection',
      object: {
        ...collection,
        items: collection?.items.filter((id) => id !== itemId) || [],
      },
    })
  }

  return (
    <div>
      <div className="mt-8 mb-4 font-bold">
        {collection?.name}{' '}
        <span className={LINK_CLASSES} onClick={() => setCreatingItem(true)}>
          +
        </span>
      </div>
      <div>
        {creatingItem && <EditOrCreateItem onConfirm={handleCreateItem} onCancel={() => setCreatingItem(false)} />}
        {collection?.items?.length ? (
          collection?.items?.map((itemId) => (
            <Item key={itemId} itemId={itemId} onRemove={() => handleRemoveItem(itemId)} />
          ))
        ) : (
          <div>[No items]</div>
        )}
      </div>
    </div>
  )
}
