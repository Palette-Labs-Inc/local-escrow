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
import type * as XyzNoshdeliveryV0MediaImage from './image.js'
import type * as XyzNoshdeliveryV0MediaVideo from './video.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.media.defs'

/** width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit. */
export interface AspectRatio {
  $type?: 'xyz.noshdelivery.v0.media.defs#aspectRatio'
  width: number
  height: number
}

const hashAspectRatio = 'aspectRatio'

export function isAspectRatio<V>(v: V) {
  return is$typed(v, id, hashAspectRatio)
}

export function validateAspectRatio<V>(v: V) {
  return validate<AspectRatio & V>(v, id, hashAspectRatio)
}

export type MediaView = (
  | $Typed<XyzNoshdeliveryV0MediaImage.ImageView>
  | $Typed<XyzNoshdeliveryV0MediaVideo.VideoView>
  | { $type: string }
)[]
