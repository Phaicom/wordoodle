import { createWordoodleGenerator } from '@wordoodle/core'
import { describe, expect, it, vi } from 'vitest'

describe('wordoodle generator', () => {
  const wordoodle = createWordoodleGenerator()

  it('can create generator', () => {
    expect(wordoodle.words.length).eql(9330)
    expect(wordoodle.wordSize).eql(5)
  })

  it('can shuffle words', () => {
    const temp = wordoodle.words[0]
    wordoodle.shuffle()
    expect(wordoodle.words[0].word).to.not.eql(temp.word)
    expect(wordoodle.words.length).eql(9330)
  })

  it('can next word', () => {
    let temp = wordoodle.word
    for (let i = 0; i < 5; i++) {
      expect(wordoodle.indicator).eql(i)
      wordoodle.next()
      expect(wordoodle.word).to.not.eql(temp)
      temp = wordoodle.word
    }
  })

  it('can check word', () => {
    expect(wordoodle.check('t')).toBeFalsy()
    wordoodle.word = 'hello'
    expect(wordoodle.check('hello')).toBeTruthy()
  })
})
