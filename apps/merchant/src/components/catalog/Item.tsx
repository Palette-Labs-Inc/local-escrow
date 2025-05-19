import { useCatalog } from '#/hooks/use-catalog'
import { useState } from 'react'

const LINK_CLASSES = 'inline-block cursor-pointer ml-2 font-semibold text-blue-600'

export function EditOrCreateItem({
  itemId,
  onConfirm,
  onCancel,
}: {
  itemId?: string
  onConfirm: (name: string, price: number) => void
  onCancel: () => void
}) {
  const { catalogs } = useCatalog()
  const item = itemId ? catalogs?.items[itemId] : undefined

  const [name, setName] = useState(item?.name || '')
  const [price, setPrice] = useState(item?.priceMoney.amount || 0)

  const handleSave = () => {
    if (name && price) {
      onConfirm(name, price)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    }
  }
  const handleCancel = () => {
    setName('')
    setPrice(0)
    onCancel()
  }

  return (
    <div className="mb-2 flex flex-row items-center">
      <input
        type="text"
        autoFocus
        value={name}
        className="grow mr-2"
        placeholder="Item Name"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="number"
        value={price}
        placeholder="Item Price"
        className="mr-2"
        onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : 0)}
        onKeyDown={handleKeyDown}
      />
      <div>
        <button className={LINK_CLASSES} onClick={handleSave}>
          save
        </button>
        <button className={LINK_CLASSES} onClick={handleCancel}>
          cancel
        </button>
      </div>
    </div>
  )
}

export default function Item({ itemId, onRemove }: { itemId: string; onRemove: () => void }) {
  const { catalogs, putRecord } = useCatalog()
  const item = catalogs?.items[itemId]
  const [editing, setEditing] = useState(false)

  const handleEditItem = (name: string, price: number) => {
    putRecord({
      type: 'xyz.noshdelivery.v0.catalog.item',
      object: {
        ...item,
        name,
        priceMoney: { amount: price, currency: 'USD' },
      },
    })
    setEditing(false)
  }

  const handleEditPress = () => {
    setEditing(true)
  }

  return editing ? (
    <EditOrCreateItem itemId={itemId} onConfirm={handleEditItem} onCancel={() => setEditing(false)} />
  ) : (
    <div className="mb-2 flex flex-row items-center">
      <div className="mr-2 grow">{item?.name}</div>
      <div className="text-gray-300 mr-4">${item?.priceMoney.amount}</div>
      <div>
        <button className={LINK_CLASSES} onClick={handleEditPress}>
          edit
        </button>
        <button className={LINK_CLASSES} onClick={onRemove}>
          x
        </button>
      </div>
    </div>
  )
}
