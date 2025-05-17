/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  XrpcClient,
  type FetchHandler,
  type FetchHandlerOptions,
} from '@atproto/xrpc'
import { schemas } from './lexicons.js'
import { CID } from 'multiformats/cid'
import { type OmitKey, type Un$Typed } from './util.js'
import * as XyzNoshdeliveryV0CatalogCatalog from './types/xyz/noshdelivery/v0/catalog/catalog.js'
import * as XyzNoshdeliveryV0CatalogCollection from './types/xyz/noshdelivery/v0/catalog/collection.js'
import * as XyzNoshdeliveryV0CatalogDefs from './types/xyz/noshdelivery/v0/catalog/defs.js'
import * as XyzNoshdeliveryV0CatalogGetItemsDetails from './types/xyz/noshdelivery/v0/catalog/getItemsDetails.js'
import * as XyzNoshdeliveryV0CatalogGetObjects from './types/xyz/noshdelivery/v0/catalog/getObjects.js'
import * as XyzNoshdeliveryV0CatalogGetShallowCatalogView from './types/xyz/noshdelivery/v0/catalog/getShallowCatalogView.js'
import * as XyzNoshdeliveryV0CatalogItem from './types/xyz/noshdelivery/v0/catalog/item.js'
import * as XyzNoshdeliveryV0CatalogModifier from './types/xyz/noshdelivery/v0/catalog/modifier.js'
import * as XyzNoshdeliveryV0CatalogModifierGroup from './types/xyz/noshdelivery/v0/catalog/modifierGroup.js'
import * as XyzNoshdeliveryV0CatalogPutCatalogObject from './types/xyz/noshdelivery/v0/catalog/putCatalogObject.js'
import * as XyzNoshdeliveryV0MediaDefs from './types/xyz/noshdelivery/v0/media/defs.js'
import * as XyzNoshdeliveryV0MediaImage from './types/xyz/noshdelivery/v0/media/image.js'
import * as XyzNoshdeliveryV0MediaVideo from './types/xyz/noshdelivery/v0/media/video.js'
import * as XyzNoshdeliveryV0MerchantDefs from './types/xyz/noshdelivery/v0/merchant/defs.js'
import * as XyzNoshdeliveryV0MerchantGetGroup from './types/xyz/noshdelivery/v0/merchant/getGroup.js'
import * as XyzNoshdeliveryV0MerchantGroup from './types/xyz/noshdelivery/v0/merchant/group.js'
import * as XyzNoshdeliveryV0MerchantListGroups from './types/xyz/noshdelivery/v0/merchant/listGroups.js'
import * as XyzNoshdeliveryV0MerchantListLocations from './types/xyz/noshdelivery/v0/merchant/listLocations.js'
import * as XyzNoshdeliveryV0MerchantLocation from './types/xyz/noshdelivery/v0/merchant/location.js'
import * as XyzNoshdeliveryV0MerchantPutGroup from './types/xyz/noshdelivery/v0/merchant/putGroup.js'
import * as XyzNoshdeliveryV0MerchantPutLocation from './types/xyz/noshdelivery/v0/merchant/putLocation.js'
import * as ComAtprotoLabelDefs from './types/com/atproto/label/defs.js'
import * as ComAtprotoRepoApplyWrites from './types/com/atproto/repo/applyWrites.js'
import * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord.js'
import * as ComAtprotoRepoDefs from './types/com/atproto/repo/defs.js'
import * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord.js'
import * as ComAtprotoRepoDescribeRepo from './types/com/atproto/repo/describeRepo.js'
import * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord.js'
import * as ComAtprotoRepoImportRepo from './types/com/atproto/repo/importRepo.js'
import * as ComAtprotoRepoListMissingBlobs from './types/com/atproto/repo/listMissingBlobs.js'
import * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords.js'
import * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord.js'
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef.js'
import * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob.js'
import * as CommunityLexiconLocationAddress from './types/community/lexicon/location/address.js'
import * as CommunityLexiconLocationGeo from './types/community/lexicon/location/geo.js'

export * as XyzNoshdeliveryV0CatalogCatalog from './types/xyz/noshdelivery/v0/catalog/catalog.js'
export * as XyzNoshdeliveryV0CatalogCollection from './types/xyz/noshdelivery/v0/catalog/collection.js'
export * as XyzNoshdeliveryV0CatalogDefs from './types/xyz/noshdelivery/v0/catalog/defs.js'
export * as XyzNoshdeliveryV0CatalogGetItemsDetails from './types/xyz/noshdelivery/v0/catalog/getItemsDetails.js'
export * as XyzNoshdeliveryV0CatalogGetObjects from './types/xyz/noshdelivery/v0/catalog/getObjects.js'
export * as XyzNoshdeliveryV0CatalogGetShallowCatalogView from './types/xyz/noshdelivery/v0/catalog/getShallowCatalogView.js'
export * as XyzNoshdeliveryV0CatalogItem from './types/xyz/noshdelivery/v0/catalog/item.js'
export * as XyzNoshdeliveryV0CatalogModifier from './types/xyz/noshdelivery/v0/catalog/modifier.js'
export * as XyzNoshdeliveryV0CatalogModifierGroup from './types/xyz/noshdelivery/v0/catalog/modifierGroup.js'
export * as XyzNoshdeliveryV0CatalogPutCatalogObject from './types/xyz/noshdelivery/v0/catalog/putCatalogObject.js'
export * as XyzNoshdeliveryV0MediaDefs from './types/xyz/noshdelivery/v0/media/defs.js'
export * as XyzNoshdeliveryV0MediaImage from './types/xyz/noshdelivery/v0/media/image.js'
export * as XyzNoshdeliveryV0MediaVideo from './types/xyz/noshdelivery/v0/media/video.js'
export * as XyzNoshdeliveryV0MerchantDefs from './types/xyz/noshdelivery/v0/merchant/defs.js'
export * as XyzNoshdeliveryV0MerchantGetGroup from './types/xyz/noshdelivery/v0/merchant/getGroup.js'
export * as XyzNoshdeliveryV0MerchantGroup from './types/xyz/noshdelivery/v0/merchant/group.js'
export * as XyzNoshdeliveryV0MerchantListGroups from './types/xyz/noshdelivery/v0/merchant/listGroups.js'
export * as XyzNoshdeliveryV0MerchantListLocations from './types/xyz/noshdelivery/v0/merchant/listLocations.js'
export * as XyzNoshdeliveryV0MerchantLocation from './types/xyz/noshdelivery/v0/merchant/location.js'
export * as XyzNoshdeliveryV0MerchantPutGroup from './types/xyz/noshdelivery/v0/merchant/putGroup.js'
export * as XyzNoshdeliveryV0MerchantPutLocation from './types/xyz/noshdelivery/v0/merchant/putLocation.js'
export * as ComAtprotoLabelDefs from './types/com/atproto/label/defs.js'
export * as ComAtprotoRepoApplyWrites from './types/com/atproto/repo/applyWrites.js'
export * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord.js'
export * as ComAtprotoRepoDefs from './types/com/atproto/repo/defs.js'
export * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord.js'
export * as ComAtprotoRepoDescribeRepo from './types/com/atproto/repo/describeRepo.js'
export * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord.js'
export * as ComAtprotoRepoImportRepo from './types/com/atproto/repo/importRepo.js'
export * as ComAtprotoRepoListMissingBlobs from './types/com/atproto/repo/listMissingBlobs.js'
export * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords.js'
export * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord.js'
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef.js'
export * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob.js'
export * as CommunityLexiconLocationAddress from './types/community/lexicon/location/address.js'
export * as CommunityLexiconLocationGeo from './types/community/lexicon/location/geo.js'

export class AtpBaseClient extends XrpcClient {
  xyz: XyzNS
  com: ComNS
  community: CommunityNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.xyz = new XyzNS(this)
    this.com = new ComNS(this)
    this.community = new CommunityNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class XyzNS {
  _client: XrpcClient
  noshdelivery: XyzNoshdeliveryNS

  constructor(client: XrpcClient) {
    this._client = client
    this.noshdelivery = new XyzNoshdeliveryNS(client)
  }
}

export class XyzNoshdeliveryNS {
  _client: XrpcClient
  v0: XyzNoshdeliveryV0NS

  constructor(client: XrpcClient) {
    this._client = client
    this.v0 = new XyzNoshdeliveryV0NS(client)
  }
}

export class XyzNoshdeliveryV0NS {
  _client: XrpcClient
  catalog: XyzNoshdeliveryV0CatalogNS
  media: XyzNoshdeliveryV0MediaNS
  merchant: XyzNoshdeliveryV0MerchantNS

  constructor(client: XrpcClient) {
    this._client = client
    this.catalog = new XyzNoshdeliveryV0CatalogNS(client)
    this.media = new XyzNoshdeliveryV0MediaNS(client)
    this.merchant = new XyzNoshdeliveryV0MerchantNS(client)
  }
}

export class XyzNoshdeliveryV0CatalogNS {
  _client: XrpcClient
  catalog: CatalogRecord
  collection: CollectionRecord
  item: ItemRecord
  modifier: ModifierRecord
  modifierGroup: ModifierGroupRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.catalog = new CatalogRecord(client)
    this.collection = new CollectionRecord(client)
    this.item = new ItemRecord(client)
    this.modifier = new ModifierRecord(client)
    this.modifierGroup = new ModifierGroupRecord(client)
  }

  getItemsDetails(
    params?: XyzNoshdeliveryV0CatalogGetItemsDetails.QueryParams,
    opts?: XyzNoshdeliveryV0CatalogGetItemsDetails.CallOptions,
  ): Promise<XyzNoshdeliveryV0CatalogGetItemsDetails.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.catalog.getItemsDetails',
      params,
      undefined,
      opts,
    )
  }

  getObjects(
    params?: XyzNoshdeliveryV0CatalogGetObjects.QueryParams,
    opts?: XyzNoshdeliveryV0CatalogGetObjects.CallOptions,
  ): Promise<XyzNoshdeliveryV0CatalogGetObjects.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.catalog.getObjects',
      params,
      undefined,
      opts,
    )
  }

  getShallowCatalogView(
    params?: XyzNoshdeliveryV0CatalogGetShallowCatalogView.QueryParams,
    opts?: XyzNoshdeliveryV0CatalogGetShallowCatalogView.CallOptions,
  ): Promise<XyzNoshdeliveryV0CatalogGetShallowCatalogView.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.catalog.getShallowCatalogView',
      params,
      undefined,
      opts,
    )
  }

  putCatalogObject(
    data?: XyzNoshdeliveryV0CatalogPutCatalogObject.InputSchema,
    opts?: XyzNoshdeliveryV0CatalogPutCatalogObject.CallOptions,
  ): Promise<XyzNoshdeliveryV0CatalogPutCatalogObject.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.catalog.putCatalogObject',
      opts?.qp,
      data,
      opts,
    )
  }
}

export class CatalogRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryV0CatalogCatalog.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.catalog',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogCatalog.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.catalog',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogCatalog.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.catalog'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.v0.catalog.catalog', ...params },
      { headers },
    )
  }
}

export class CollectionRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryV0CatalogCollection.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.collection',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogCollection.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.collection',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogCollection.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.collection'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.v0.catalog.collection', ...params },
      { headers },
    )
  }
}

export class ItemRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryV0CatalogItem.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.item',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogItem.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.item',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogItem.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.item'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.v0.catalog.item', ...params },
      { headers },
    )
  }
}

export class ModifierRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryV0CatalogModifier.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.modifier',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogModifier.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.modifier',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogModifier.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.modifier'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.v0.catalog.modifier', ...params },
      { headers },
    )
  }
}

export class ModifierGroupRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: XyzNoshdeliveryV0CatalogModifierGroup.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.modifierGroup',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogModifierGroup.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.modifierGroup',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogModifierGroup.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.modifierGroup'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.v0.catalog.modifierGroup', ...params },
      { headers },
    )
  }
}

export class XyzNoshdeliveryV0MediaNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}

export class XyzNoshdeliveryV0MerchantNS {
  _client: XrpcClient
  group: GroupRecord
  location: LocationRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.group = new GroupRecord(client)
    this.location = new LocationRecord(client)
  }

  getGroup(
    params?: XyzNoshdeliveryV0MerchantGetGroup.QueryParams,
    opts?: XyzNoshdeliveryV0MerchantGetGroup.CallOptions,
  ): Promise<XyzNoshdeliveryV0MerchantGetGroup.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.merchant.getGroup',
      params,
      undefined,
      opts,
    )
  }

  listGroups(
    params?: XyzNoshdeliveryV0MerchantListGroups.QueryParams,
    opts?: XyzNoshdeliveryV0MerchantListGroups.CallOptions,
  ): Promise<XyzNoshdeliveryV0MerchantListGroups.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.merchant.listGroups',
      params,
      undefined,
      opts,
    )
  }

  listLocations(
    params?: XyzNoshdeliveryV0MerchantListLocations.QueryParams,
    opts?: XyzNoshdeliveryV0MerchantListLocations.CallOptions,
  ): Promise<XyzNoshdeliveryV0MerchantListLocations.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.merchant.listLocations',
      params,
      undefined,
      opts,
    )
  }

  putGroup(
    data?: XyzNoshdeliveryV0MerchantPutGroup.InputSchema,
    opts?: XyzNoshdeliveryV0MerchantPutGroup.CallOptions,
  ): Promise<XyzNoshdeliveryV0MerchantPutGroup.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.merchant.putGroup',
      opts?.qp,
      data,
      opts,
    )
  }

  putLocation(
    data?: XyzNoshdeliveryV0MerchantPutLocation.InputSchema,
    opts?: XyzNoshdeliveryV0MerchantPutLocation.CallOptions,
  ): Promise<XyzNoshdeliveryV0MerchantPutLocation.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.merchant.putLocation',
      opts?.qp,
      data,
      opts,
    )
  }
}

export class GroupRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryV0MerchantGroup.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.merchant.group',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0MerchantGroup.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.merchant.group',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0MerchantGroup.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.merchant.group'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.v0.merchant.group', ...params },
      { headers },
    )
  }
}

export class LocationRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryV0MerchantLocation.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.merchant.location',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0MerchantLocation.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.merchant.location',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0MerchantLocation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.merchant.location'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.v0.merchant.location', ...params },
      { headers },
    )
  }
}

export class ComNS {
  _client: XrpcClient
  atproto: ComAtprotoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.atproto = new ComAtprotoNS(client)
  }
}

export class ComAtprotoNS {
  _client: XrpcClient
  repo: ComAtprotoRepoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.repo = new ComAtprotoRepoNS(client)
  }
}

export class ComAtprotoRepoNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  applyWrites(
    data?: ComAtprotoRepoApplyWrites.InputSchema,
    opts?: ComAtprotoRepoApplyWrites.CallOptions,
  ): Promise<ComAtprotoRepoApplyWrites.Response> {
    return this._client
      .call('com.atproto.repo.applyWrites', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoApplyWrites.toKnownErr(e)
      })
  }

  createRecord(
    data?: ComAtprotoRepoCreateRecord.InputSchema,
    opts?: ComAtprotoRepoCreateRecord.CallOptions,
  ): Promise<ComAtprotoRepoCreateRecord.Response> {
    return this._client
      .call('com.atproto.repo.createRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoCreateRecord.toKnownErr(e)
      })
  }

  deleteRecord(
    data?: ComAtprotoRepoDeleteRecord.InputSchema,
    opts?: ComAtprotoRepoDeleteRecord.CallOptions,
  ): Promise<ComAtprotoRepoDeleteRecord.Response> {
    return this._client
      .call('com.atproto.repo.deleteRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoDeleteRecord.toKnownErr(e)
      })
  }

  describeRepo(
    params?: ComAtprotoRepoDescribeRepo.QueryParams,
    opts?: ComAtprotoRepoDescribeRepo.CallOptions,
  ): Promise<ComAtprotoRepoDescribeRepo.Response> {
    return this._client.call(
      'com.atproto.repo.describeRepo',
      params,
      undefined,
      opts,
    )
  }

  getRecord(
    params?: ComAtprotoRepoGetRecord.QueryParams,
    opts?: ComAtprotoRepoGetRecord.CallOptions,
  ): Promise<ComAtprotoRepoGetRecord.Response> {
    return this._client
      .call('com.atproto.repo.getRecord', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoRepoGetRecord.toKnownErr(e)
      })
  }

  importRepo(
    data?: ComAtprotoRepoImportRepo.InputSchema,
    opts?: ComAtprotoRepoImportRepo.CallOptions,
  ): Promise<ComAtprotoRepoImportRepo.Response> {
    return this._client.call(
      'com.atproto.repo.importRepo',
      opts?.qp,
      data,
      opts,
    )
  }

  listMissingBlobs(
    params?: ComAtprotoRepoListMissingBlobs.QueryParams,
    opts?: ComAtprotoRepoListMissingBlobs.CallOptions,
  ): Promise<ComAtprotoRepoListMissingBlobs.Response> {
    return this._client.call(
      'com.atproto.repo.listMissingBlobs',
      params,
      undefined,
      opts,
    )
  }

  listRecords(
    params?: ComAtprotoRepoListRecords.QueryParams,
    opts?: ComAtprotoRepoListRecords.CallOptions,
  ): Promise<ComAtprotoRepoListRecords.Response> {
    return this._client.call(
      'com.atproto.repo.listRecords',
      params,
      undefined,
      opts,
    )
  }

  putRecord(
    data?: ComAtprotoRepoPutRecord.InputSchema,
    opts?: ComAtprotoRepoPutRecord.CallOptions,
  ): Promise<ComAtprotoRepoPutRecord.Response> {
    return this._client
      .call('com.atproto.repo.putRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoPutRecord.toKnownErr(e)
      })
  }

  uploadBlob(
    data?: ComAtprotoRepoUploadBlob.InputSchema,
    opts?: ComAtprotoRepoUploadBlob.CallOptions,
  ): Promise<ComAtprotoRepoUploadBlob.Response> {
    return this._client.call(
      'com.atproto.repo.uploadBlob',
      opts?.qp,
      data,
      opts,
    )
  }
}

export class CommunityNS {
  _client: XrpcClient
  lexicon: CommunityLexiconNS

  constructor(client: XrpcClient) {
    this._client = client
    this.lexicon = new CommunityLexiconNS(client)
  }
}

export class CommunityLexiconNS {
  _client: XrpcClient
  location: CommunityLexiconLocationNS

  constructor(client: XrpcClient) {
    this._client = client
    this.location = new CommunityLexiconLocationNS(client)
  }
}

export class CommunityLexiconLocationNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}
