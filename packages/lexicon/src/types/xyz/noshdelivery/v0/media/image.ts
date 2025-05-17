/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../../util'
import type * as XyzNoshdeliveryV0MediaDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.media.image'

export interface Main {
  $type?: 'xyz.noshdelivery.v0.media.image'
  /** The image file. Limited to 10mb. */
  image: BlobRef
  /** Alt text description of the image, for accessibility. */
  alt: string
  aspectRatio?: XyzNoshdeliveryV0MediaDefs.AspectRatio
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

export interface ImageView {
  $type?: 'xyz.noshdelivery.v0.media.image#imageView'
  /** Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View. */
  thumb: string
  /** Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View. */
  fullsize: string
  /** Alt text description of the image, for accessibility. */
  alt: string
  aspectRatio?: XyzNoshdeliveryV0MediaDefs.AspectRatio
}

const hashImageView = 'imageView'

export function isImageView<V>(v: V) {
  return is$typed(v, id, hashImageView)
}

export function validateImageView<V>(v: V) {
  return validate<ImageView & V>(v, id, hashImageView)
}
