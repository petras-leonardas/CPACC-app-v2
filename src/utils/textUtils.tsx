import React from 'react'

export function wrapWordsWithSpans(text: string, charOffset: number = 0): React.ReactNode {
  const words = text.split(/(\s+)/)
  let currentCharIndex = charOffset
  
  return words.map((word, index) => {
    const wordStartIndex = currentCharIndex
    currentCharIndex += word.length
    
    if (word.match(/^\s+$/)) {
      return <React.Fragment key={index}>{word}</React.Fragment>
    }
    
    return (
      <span
        key={index}
        data-word-index={wordStartIndex}
        className="tts-word"
      >
        {word}
      </span>
    )
  })
}
