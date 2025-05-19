import { AtpAgent } from '@atproto/api'
import {
  XyzNoshdeliveryV0CatalogItem,
  XyzNoshdeliveryV0CatalogCollection,
  XyzNoshdeliveryV0CatalogCatalog,
} from 'lexicon'
const agent = new AtpAgent({
  service: 'http://localhost:3001',
})

const REPO = 'did:plc:ufa7rl6agtfdqje6bant3wsb'
const itemKeys = [
  '3lnw7k6v34s25',
  '3lnw7k6v34t25',
  '3lnw7k6v34u25',
  '3lnw7k6v34v25',
  '3lnw7k6v34w25',
  '3lnw7k6v34x25',
  '3lnw7k6v34y25',
]
const collectionKeys = ['3lnw7k6v34z25', '3lnw7k6v35225']
const catalogKey = '3lnw7k6v44c25'

function putRecord<T extends { [_ in string]: unknown }>(collection: string, rkey: string, record: T) {
  return agent.com.atproto.repo.putRecord({
    repo: REPO,
    collection,
    rkey,
    record,
  })
}

async function populateCatalog() {
  const item1 = await putRecord<XyzNoshdeliveryV0CatalogItem.Record>('xyz.noshdelivery.v0.catalog.item', itemKeys[0], {
    name: 'Fries',
    priceMoney: {
      amount: 5,
      currency: 'USD',
    },
    suspended: false,
    $type: 'xyz.noshdelivery.v0.catalog.item',
  })

  const item2 = await putRecord<XyzNoshdeliveryV0CatalogItem.Record>('xyz.noshdelivery.v0.catalog.item', itemKeys[1], {
    name: 'Salad',
    priceMoney: {
      amount: 20,
      currency: 'USD',
    },
    suspended: false,
    $type: 'xyz.noshdelivery.v0.catalog.item',
  })

  const item3 = await putRecord<XyzNoshdeliveryV0CatalogItem.Record>('xyz.noshdelivery.v0.catalog.item', itemKeys[2], {
    name: 'Burger',
    priceMoney: {
      amount: 10,
      currency: 'USD',
    },
    suspended: false,
    $type: 'xyz.noshdelivery.v0.catalog.item',
  })

  const collection1 = await putRecord<XyzNoshdeliveryV0CatalogCollection.Record>(
    'xyz.noshdelivery.v0.catalog.collection',
    collectionKeys[0],
    {
      name: 'Appetizers',
      items: [itemKeys[0]],
      $type: 'xyz.noshdelivery.v0.catalog.collection',
    },
  )

  const collection2 = await putRecord<XyzNoshdeliveryV0CatalogCollection.Record>(
    'xyz.noshdelivery.v0.catalog.collection',
    collectionKeys[1],
    {
      name: 'Entrees',
      items: [itemKeys[1], itemKeys[2]],
      $type: 'xyz.noshdelivery.v0.catalog.collection',
    },
  )
  const catalog = await putRecord<XyzNoshdeliveryV0CatalogCatalog.Record>(
    'xyz.noshdelivery.v0.catalog.catalog',
    catalogKey,
    {
      merchantLocation: 'at://' + REPO + '/xyz.noshdelivery.v0.merchant.location/3lnw7k6v34w25',
      name: 'Full Menu',
      collections: [collectionKeys[0], collectionKeys[1]],
      availabilityPeriods: [
        {
          dayOfWeek: 'MONDAY',
          start: {
            localHour: 10,
            localMinute: 0,
          },
          end: {
            localHour: 10,
            localMinute: 0,
          },
        },
      ],
      $type: 'xyz.noshdelivery.v0.catalog.catalog',
    },
  )
}

populateCatalog()

// for (let i = 0; i < 10; i++) {
//   const nextRkey = TID.next()
//   console.log(nextRkey.toString())
// }
