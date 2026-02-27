import { useState, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import { memoryService } from '@/services/memory.service'
import { uploadService } from '@/services/upload.service'
import './index.scss'

export default function VoiceCapturePage() {
  const [recording, setRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const [recorded, setRecorded] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [saving, setSaving] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startRecord = () => {
    setRecording(true)
    setDuration(0)
    setRecorded(false)
    setTranscription('')

    timerRef.current = setInterval(() => {
      setDuration((d) => {
        if (d >= 60) {
          stopRecord()
          return 60
        }
        return d + 1
      })
    }, 1000)
  }

  const stopRecord = () => {
    setRecording(false)
    setRecorded(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    // 调用语音转文字服务
    uploadService.transcribeVoice('mock-voice-file.mp3').then((res) => {
      setTranscription(res.data.text)
    }).catch(() => {
      setTranscription('语音识别失败，请重试')
    })
  }

  const handleSave = async () => {
    if (!recorded) return
    setSaving(true)
    try {
      await memoryService.create({
        type: 'voice',
        title: '语音记忆',
        content: transcription || `语音记录 (${duration}秒)`,
        emotion: 'neutral',
      })
      Taro.showToast({ title: '记录成功', icon: 'success' })
      setTimeout(() => Taro.navigateBack(), 1500)
    } catch {
      Taro.showToast({ title: '保存失败', icon: 'none' })
    } finally {
      setSaving(false)
    }
  }

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = s % 60
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  return (
    <View className='page-voice-capture'>
      <NavBar title='语音记录' />

      <View className='page-voice-capture__body'>
        {/* 时长显示 */}
        <Text className='page-voice-capture__timer'>{formatTime(duration)}</Text>
        <Text className='page-voice-capture__limit'>最长60秒</Text>

        {/* 录音按钮 */}
        <View
          className={`page-voice-capture__record-btn ${recording ? 'page-voice-capture__record-btn--recording' : ''}`}
          onClick={recording ? stopRecord : startRecord}
        >
          <Text className='page-voice-capture__record-icon'>
            {recording ? '⏹' : '🎤'}
          </Text>
        </View>
        <Text className='page-voice-capture__hint'>
          {recording ? '点击停止' : recorded ? '点击重新录制' : '点击开始录音'}
        </Text>

        {/* 转文字预览 */}
        {transcription && (
          <View className='page-voice-capture__transcription'>
            <Text className='page-voice-capture__transcription-title'>语音转文字</Text>
            <Text className='page-voice-capture__transcription-text'>{transcription}</Text>
          </View>
        )}
      </View>

      {/* 保存按钮 */}
      {recorded && (
        <View
          className={`page-voice-capture__save-btn ${saving ? 'page-voice-capture__save-btn--disabled' : ''}`}
          onClick={handleSave}
        >
          <Text className='page-voice-capture__save-text'>{saving ? '保存中...' : '保存记忆'}</Text>
        </View>
      )}
    </View>
  )
}
