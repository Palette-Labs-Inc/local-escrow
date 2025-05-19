import { useCatalog } from '#/hooks/use-catalog'
import { useState } from 'react'
import Item from './Item'

const LINK_CLASSES = 'inline-block cursor-pointer ml-2 font-semibold text-blue-600'

export default function Collection({ collectionId }: { collectionId: string }) {
  const { catalogs, putRecord } = useCatalog()
  const collection = catalogs?.collections[collectionId]
  const [editingItems, setEditingItems] = useState<Set<string>>(new Set())

  const handleNewItemPress = () => {}

  const itemMap = catalogs?.items

  const newItem = (
    <div>
      <input type="text" placeholder="Item Name" />
      <input type="number" placeholder="Item Price" />
      <button onClick={handleNewItemPress}>Add</button>
    </div>
  )

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
        {collection?.name} <span className={LINK_CLASSES}>+</span>
      </div>
      <div>
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
