import { useState, useRef, useEffect } from 'react'

type UseResizableProps = {
  initialWidth: number
  minWidth: number
  maxWidth: number
}

export function useResizable({ initialWidth, minWidth, maxWidth }: UseResizableProps) {
  const [width, setWidth] = useState(initialWidth)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true
    startX.current = e.pageX
    startWidth.current = width
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return

      const deltaX = e.pageX - startX.current
      const newWidth = Math.min(Math.max(startWidth.current + deltaX, minWidth), maxWidth)
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      isResizing.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [minWidth, maxWidth])

  return {
    width,
    handleMouseDown
  }
} 