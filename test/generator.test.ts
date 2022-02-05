import { createWordoodleGenerator } from '@wordoodle/core'
import { describe, expect, it } from 'vitest'

describe('wordoodle generator', () => {
  const wordoodle = createWordoodleGenerator()

  it('can create generator', () => {
    expect(wordoodle.words.length).eql(6083)
    expect(wordoodle.wordSize).eql(5)
  })

  it('can shuffle words', () => {
    const temp = wordoodle.words[0]
    wordoodle.shuffle()
    expect(wordoodle.words[0].word).to.not.eql(temp.word)
    expect(wordoodle.words.length).eql(6083)
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
    expect(wordoodle.check('t').isEqual).toBeFalsy()
    wordoodle.word = 'hello'
    expect(wordoodle.check('hello').isEqual).toBeTruthy()
    const checkTest1 = wordoodle.check('xexlo')
    expect(checkTest1.isEqual).toBeFalsy()
    expect(checkTest1.isError).toBeFalsy()
    expect(checkTest1.location.correct).to.be.eql([1, 3, 4])
    const checkTest2 = wordoodle.check('xeoll')
    expect(checkTest2.isEqual).toBeFalsy()
    expect(checkTest2.isError).toBeFalsy()
    expect(checkTest2.location.correct).to.be.eql([1, 3])
    expect(checkTest2.location.incorrect).to.be.eql([2, 4])
  })

  it('can store used word', () => {
    const wordoodle2 = createWordoodleGenerator()
    wordoodle2.check('hello')
    expect(Array.from(wordoodle2.usedWord.values())).to.be.eql(['h', 'e', 'l', 'o'])
  })
})
