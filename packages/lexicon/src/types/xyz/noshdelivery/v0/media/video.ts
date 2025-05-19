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
const id = 'xyz.noshdelivery.v0.media.video'

export interface Main {
  $type?: 'xyz.noshdelivery.v0.media.video'
  /** The mp4 video file. May be up to 100mb. */
  video: BlobRef
  /** Alt text description of the video, for accessibility. */
  alt?: string
  aspectRatio?: XyzNoshdeliveryV0MediaDefs.AspectRatio
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

export interface VideoView {
  $type?: 'xyz.noshdelivery.v0.media.video#videoView'
  uri: string
  thumbnail: string
  alt?: string
  aspectRatio?: XyzNoshdeliveryV0MediaDefs.AspectRatio
}

const hashVideoView = 'videoView'

export function isVideoView<V>(v: V) {
  return is$typed(v, id, hashVideoView)
}

export function validateVideoView<V>(v: V) {
  return validate<VideoView & V>(v, id, hashVideoView)
}
