import { useEffect, useState } from 'react'
import { useCatalog } from '#/hooks/use-catalog'
import Catalog from './Catalog'

function CatalogList() {
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

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="font-bold">Menus:</div>
        {Object.values(catalogs.catalogs).map((catalog) => (
          <span
            key={catalog.id}
            className={`cursor-pointer inline-block mr-4 ${
              selectedCatalog === catalog.id ? 'font-semibold text-blue-600' : ''
            }`}
            onClick={() => setSelectedCatalog(catalog.id)}
          >
            {catalog.name}
          </span>
        ))}
      </div>
      <hr />
      {selectedCatalog && (
        <div>
          <Catalog catalogId={selectedCatalog} />
        </div>
      )}
    </>
  )
}

export default CatalogList
