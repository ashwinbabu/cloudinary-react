import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import { Video, Transformation } from '../index'

describe('Video', () => {
  it('should include child transformation for a single source type', function () {
    const tag = shallow(
      <Video
        cloudName='demo'
        sourceTypes='webm'
        publicId='dog'
        sourceTransformation={{
          webm: { overlay: 'text:verdana_30:webm!' }
        }}
      >
        <Transformation quality='70' />
      </Video>
    )
    expect(tag.props().src).toEndWith('/q_70/l_text:verdana_30:webm!/dog.webm')
  })

  it('should support fps parameter', function () {
    let tag = shallow(
      <Video cloudName='demo' sourceTypes='webm' publicId='dog'>
        <Transformation fps='24' />
      </Video>
    )
    expect(tag.props().src).toEndWith('/fps_24/dog.webm')
    tag = shallow(
      <Video cloudName='demo' sourceTypes='webm' publicId='dog'>
        <Transformation fps='24-29.97' />
      </Video>
    )
    expect(tag.props().src).toEndWith('/fps_24-29.97/dog.webm')
    tag = shallow(
      <Video cloudName='demo' sourceTypes='webm' publicId='dog'>
        <Transformation fps='25-' />
      </Video>
    )
    expect(tag.props().src).toEndWith('/fps_25-/dog.webm')
  })

  it('should support startOffset parameter', function () {
    let tag = shallow(
      <Video cloudName='demo' sourceTypes='webm' publicId='dog'>
        <Transformation startOffset='auto' />
      </Video>
    )
    expect(tag.props().src).toEndWith('/so_auto/dog.webm')
    tag = shallow(
      <Video cloudName='demo' sourceTypes='webm' publicId='dog'>
        <Transformation startOffset='2' />
      </Video>
    )
    expect(tag.props().src).toEndWith('/so_2/dog.webm')
    tag = shallow(
      <Video cloudName='demo' sourceTypes='webm' publicId='dog'>
        <Transformation startOffset='2.34' />
      </Video>
    )
    expect(tag.props().src).toEndWith('/so_2.34/dog.webm')
  })

  it('should include child transformation for multiple source types', function () {
    const tag = shallow(
      <Video
        cloudName='demo'
        sourceTypes={['webm', 'mp4']}
        publicId='dog'
        sourceTransformation={{
          webm: { overlay: 'text:verdana_30:webm!' },
          mp4: { overlay: 'text:verdana_30:mp4!' }
        }}
      >
        <Transformation quality='70' />
      </Video>
    )
    expect(tag.find('[type="video/webm"]').props().src).toEndWith(
      '/q_70/l_text:verdana_30:webm!/dog.webm'
    )
    expect(tag.find('[type="video/mp4"]').props().src).toEndWith(
      '/q_70/l_text:verdana_30:mp4!/dog.mp4'
    )
  })

  it('should support inner text', function () {
    const tag = shallow(
      <Video cloudName='demo' publicId='dog'>
        Your browser does not support the video tag.
      </Video>
    )
    expect(tag.type()).toEqual('video')
  })

  it('Should support forwarding innerRef to underlying video element', function () {
    const myRef = React.createRef()

    const tag = mount(
      <Video
        innerRef={myRef}
        cloudName='demo'
        sourceTypes='webm'
        publicId='dog'
        sourceTransformation={{
          webm: { overlay: 'text:verdana_30:webm!' }
        }}
      />
    )

    const video = myRef.current

    expect(tag.find('video').prop('src')).toEndWith(
      '/l_text:verdana_30:webm!/dog.webm'
    )
    expect(video.src).toEndWith('/l_text:verdana_30:webm!/dog.webm')
    ;['play', 'pause', 'canPlayType', 'addTextTrack'].forEach((func) =>
      expect(typeof video[func]).toBe('function')
    )
  })

  it('Should set default video poster', function () {
    const tag = shallow(<Video cloudName='demo' publicId='dog' />)

    expect(tag.props().poster).toEqual(
      'http://res.cloudinary.com/demo/video/upload/dog.jpg'
    )
  })

  it('Should set secure video poster', function () {
    const tag = shallow(
      <Video cloudName='demo' publicId='dog' poster={{ secure: true }} />
    )

    expect(tag.props().poster).toEqual(
      'https://res.cloudinary.com/demo/video/upload/dog.jpg'
    )
  })

  it('Should set video poster url', function () {
    const tag = shallow(
      <Video
        cloudName='demo'
        publicId='dog'
        poster='https://res.cloudinary.com/demo/video/upload/w_200,dpr_2.0/dog.jpg'
      />
    )

    expect(tag.props().poster).toEqual(
      'https://res.cloudinary.com/demo/video/upload/w_200,dpr_2.0/dog.jpg'
    )
  })

  it('Should set video poster public_id and transformation', function () {
    const poster = {
      public_id: 'elephants',
      transformation: [{ width: 100, crop: 'scale' }, { dpr: '2.0' }]
    }

    const tag = shallow(
      <Video cloudName='demo' publicId='dog' poster={poster} />
    )

    expect(tag.props().poster).toEqual(
      'http://res.cloudinary.com/demo/image/upload/c_scale,w_100/dpr_2.0/elephants'
    )
  })

  it('Should set video poster public_id, resource_type and transformation', function () {
    const poster = {
      public_id: 'elephants',
      resource_type: 'video',
      format: 'jpg',
      transformation: [{ width: 100, crop: 'scale' }, { dpr: '2.0' }]
    }

    const tag = shallow(
      <Video cloudName='demo' publicId='dog' poster={poster} />
    )

    expect(tag.props().poster).toEqual(
      'http://res.cloudinary.com/demo/video/upload/c_scale,w_100/dpr_2.0/elephants.jpg'
    )
  })
  it('Should pass camelCase attributes to Video component', function () {
    const tag = shallow(
      <Video playsInline autoPlay cloudName='demo' publicId='dog' />
    )

    const { autoPlay, auto_play, playsInline, plays_inline } = tag.props()

    expect(playsInline).toEqual(true)
    expect(autoPlay).toEqual(true)

    expect(plays_inline).toEqual(undefined)
    expect(auto_play).toEqual(undefined)
  })
  it('Should pass camelCase attributes to inner video element', function () {
    const tag = mount(
      <Video playsInline autoPlay cloudName='demo' publicId='dog' />
    )

    const video = tag.find('video')
    expect(video.prop('playsInline')).toEqual(true)
    expect(video.prop('autoPlay')).toEqual(true)

    expect(video.prop('plays_inline')).toEqual(undefined)
    expect(video.prop('auto_play')).toEqual(undefined)
  })
  it('should not change kebab-case param names', () => {
    const tag = mount(
      <Video publicId='dog' cloudName='demo' data-testid='testing' />
    )

    const video = tag.find('video')
    expect(video.prop('data-testid')).toEqual('testing')
    expect(video.prop('datatestid')).toEqual(undefined)
  })
  it('reloads video on props change', () => {
    const tag = shallow(<Video cloudName='demo' publicId='dog' />)

    // detect calls for reloadVideo()
    sinon.spy(tag.instance(), 'reloadVideo')

    expect(tag.instance().reloadVideo).not.toHaveBeenCalled()

    tag.setProps({ publicId: 'cat' })
    expect(tag.instance().reloadVideo).toHaveBeenCalled()
  })
})
