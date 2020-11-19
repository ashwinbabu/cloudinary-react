/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

import { Video, Transformation } from '../index'

export default {
  title: 'Example/Video',
  component: Video,
  subcomponents: { Transformation }
}

const Template = (args) => <Video {...args} />

export const Basic = Template.bind({})
Basic.args = {
  cloudName: 'demo',
  publicId: 'dog',
  controls: true
}
export const WithFallback = Template.bind({})
WithFallback.args = {
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  fallback: 'Cannot display video'
}
export const WithInlineFallback = (args) => (
  <Video {...args}>
    Cannot display <b>video</b>.
  </Video>
)
WithInlineFallback.args = {
  cloudName: 'demo',
  publicId: 'dog',
  controls: true
}
export const WithSourceTypes = Template.bind({})
WithSourceTypes.args = {
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  sourceTypes: ['webm', 'ogv', 'mp4'],
  sourceTransformation: {
    webm: { aspectRatio: '1:1' },
    ogv: { aspect_ratio: '3:2' }
  },
  fallback: 'Cannot display video'
}
export const Width = Template.bind({})
Width.args = {
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  width: 300,
  crop: 'scale'
}
export const PosterUrl = Template.bind({})
PosterUrl.args = {
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  poster: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
}
export const PosterObject = Template.bind({})
PosterObject.args = {
  cloudName: 'demo',
  publicId: 'dog',
  controls: true,
  poster: { cloudName: 'demo', publicId: 'sample' }
}
