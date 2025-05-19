import { useCatalog } from '#/hooks/use-catalog'
import { AtUri } from '@atproto/api'
import { useState } from 'react'
import { Drawer } from 'vaul'

function extractRkey(uri: string) {
  const atUri = new AtUri(uri)
  return atUri.rkey
}

const LINK_CLASSES = 'inline-block cursor-pointer ml-2 font-semibold text-blue-600'

function Item({ itemId }: { itemId: string }) {
  const { catalogs } = useCatalog()
  const item = catalogs?.items[itemId]
  return (
    <div className="mb-2 flex flex-row items-center">
      <div className="mr-2 grow">{item?.name}</div>
      <div className="text-gray-300 mr-4">${item?.priceMoney.amount}</div>
      <div>
        <button className={LINK_CLASSES}>edit</button>
        <button className={LINK_CLASSES}>x</button>
      </div>
    </div>
  )
}

function Collection({ collectionId }: { collectionId: string }) {
  const { catalogs } = useCatalog()
  const collection = catalogs?.collections[collectionId]
  console.log(collectionId, collection)
  return (
    <div>
      <div className="mt-8 mb-4 font-bold">
        {collection?.name} <span className={LINK_CLASSES}>+</span>
      </div>
      <div>
        {collection?.items?.length ? (
          collection?.items?.map((itemId) => <Item key={itemId} itemId={itemId} />)
        ) : (
          <div>[No items]</div>
        )}
      </div>
    </div>
  )
}

function Catalog({ catalogId }: { catalogId: string }) {
  const { catalogs, putRecord } = useCatalog()
  const catalog = catalogs?.catalogs[catalogId]
  const [creatingCollection, setCreatingCollection] = useState(false)
  const [name, setName] = useState('')

  const handleNewCollection = (name: string) => {
    putRecord(
      {
        type: 'xyz.noshdelivery.v0.catalog.collection',
        object: {
          name,
          items: [],
          childCollections: [],
        },
      },
      {
        onSuccess: (collectionUri) => {
          const collectionId = extractRkey(collectionUri)
          putRecord({
            type: 'xyz.noshdelivery.v0.catalog.catalog',
            object: {
              ...catalog,
              collections: [...(catalog?.collections || []), collectionId],
            },
          })
          setCreatingCollection(false)
          setName('')
        },
      },
    )
  }

  return (
    <div>
      <div className="mb-4 font-bold">Schedule:</div>
      <div className="mb-8">
        {catalog?.availabilityPeriods?.map((period) => (
          <div key={period.dayOfWeek}>
            <div>{period.dayOfWeek}</div>
            <div>
              {period.start.localHour}:{period.start.localMinute.toString().padStart(2, '0')} - {period.end.localHour}:
              {period.end.localMinute.toString().padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="mb-4 mt-4 flex flex-row items-center">
        {creatingCollection ? (
          <>
            <input
              type="text"
              autoFocus
              placeholder="Collection Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNewCollection(name)
                }
              }}
              className="grow mr-4"
            />
            <button onClick={() => setCreatingCollection(false)} className={`mr-4 ${LINK_CLASSES}`}>
              Cancel
            </button>
            <button onClick={() => handleNewCollection(name)} className={`${LINK_CLASSES}`}>
              Create
            </button>
          </>
        ) : (
          <button className={LINK_CLASSES} onClick={() => setCreatingCollection(true)}>
            + Add Collection
          </button>
        )}
      </div>
      <hr />
      <div>
        {catalog?.collections?.map((collectionId) => (
          <Collection key={collectionId} collectionId={collectionId} />
        ))}
      </div>
    </div>
  )
}

export default Catalog
