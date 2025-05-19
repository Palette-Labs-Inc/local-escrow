import { useCatalog } from '#/hooks/use-catalog'

function Item({ itemId }: { itemId: string }) {
  const { catalogs } = useCatalog()
  const item = catalogs?.items[itemId]
  return (
    <div className="mb-2 flex flex-row items-center">
      <div className="mr-2 grow">{item?.name}</div>
      <div className="text-gray-300 mr-4">${item?.priceMoney.amount}</div>
      <div>
        <button className="inline-block cursor-pointer ml-2 font-semibold text-blue-600">edit</button>
        <button className="inline-block cursor-pointer ml-2 font-semibold text-blue-600">x</button>
      </div>
    </div>
  )
}

function Collection({ collectionId }: { collectionId: string }) {
  const { catalogs } = useCatalog()
  const collection = catalogs?.collections[collectionId]
  return (
    <div>
      <div className="mt-8 mb-4 font-bold">
        {collection?.name} <span className="inline-block cursor-pointer ml-2 font-semibold text-blue-600">+</span>
      </div>
      <div>
        {collection?.items?.map((itemId) => (
          <Item key={itemId} itemId={itemId} />
        ))}
      </div>
    </div>
  )
}

function Catalog({ catalogId }: { catalogId: string }) {
  const { catalogs } = useCatalog()
  const catalog = catalogs?.catalogs[catalogId]
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
      <div>
        {catalog?.collections?.map((collectionId) => (
          <Collection key={collectionId} collectionId={collectionId} />
        ))}
      </div>
    </div>
  )
}

export default Catalog
