import { View, Text } from '@tarojs/components'
import './index.scss'

interface ITag {
  key: string
  label: string
  color?: string
}

interface IProps {
  tags: ITag[]
  selected: string[]
  onChange: (selected: string[]) => void
  multiple?: boolean
}

export default function TagSelector({ tags, selected, onChange, multiple = false }: IProps) {
  const handleToggle = (key: string) => {
    if (multiple) {
      const next = selected.includes(key)
        ? selected.filter((s) => s !== key)
        : [...selected, key]
      onChange(next)
    } else {
      onChange(selected.includes(key) ? [] : [key])
    }
  }

  return (
    <View className='tag-selector'>
      {tags.map((tag) => {
        const isActive = selected.includes(tag.key)
        return (
          <View
            key={tag.key}
            className={`tag-selector__tag ${isActive ? 'tag-selector__tag--active' : ''}`}
            style={isActive && tag.color ? { backgroundColor: tag.color, borderColor: tag.color } : {}}
            onClick={() => handleToggle(tag.key)}
          >
            <Text
              className='tag-selector__label'
              style={isActive ? { color: '#fff' } : {}}
            >
              {tag.label}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
