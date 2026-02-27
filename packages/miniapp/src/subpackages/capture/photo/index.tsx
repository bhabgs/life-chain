import { useState } from 'react'
import { View, Text, Image, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import { memoryService } from '@/services/memory.service'
import { uploadService } from '@/services/upload.service'
import './index.scss'

export default function PhotoCapturePage() {
  const [imagePath, setImagePath] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setImagePath(res.tempFilePaths[0])
      },
    })
  }

  const handleSave = async () => {
    if (!imagePath) {
      Taro.showToast({ title: '请先选择图片', icon: 'none' })
      return
    }
    setSaving(true)
    try {
      // 先上传图片获取 URL
      const uploadRes = await uploadService.uploadImage(imagePath)
      await memoryService.create({
        type: 'image',
        title: '图片记忆',
        content: description || '一张记忆的照片',
        emotion: 'happy',
        mediaUrls: [uploadRes.data.url],
      })
      Taro.showToast({ title: '记录成功', icon: 'success' })
      setTimeout(() => Taro.navigateBack(), 1500)
    } catch {
      Taro.showToast({ title: '保存失败', icon: 'none' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <View className='page-photo-capture'>
      <NavBar title='图片记录' rightText='保存' onRightClick={handleSave} />

      <View className='page-photo-capture__body'>
        {/* 图片选择区 */}
        <View className='page-photo-capture__image-area' onClick={handleChooseImage}>
          {imagePath ? (
            <Image
              className='page-photo-capture__preview'
              src={imagePath}
              mode='aspectFit'
            />
          ) : (
            <View className='page-photo-capture__placeholder'>
              <Text className='page-photo-capture__placeholder-icon'>📷</Text>
              <Text className='page-photo-capture__placeholder-text'>点击拍照或从相册选择</Text>
            </View>
          )}
        </View>

        {/* 描述输入 */}
        <View className='page-photo-capture__desc'>
          <Textarea
            className='page-photo-capture__desc-input'
            placeholder='为这张照片写点什么...'
            value={description}
            onInput={(e) => setDescription(e.detail.value)}
            maxlength={500}
            autoHeight
          />
          <Text className='page-photo-capture__count'>{description.length}/500</Text>
        </View>
      </View>

      <View
        className={`page-photo-capture__save-btn ${saving ? 'page-photo-capture__save-btn--disabled' : ''}`}
        onClick={handleSave}
      >
        <Text className='page-photo-capture__save-text'>{saving ? '保存中...' : '保存记忆'}</Text>
      </View>
    </View>
  )
}
