import { KeyTypeEnum, createWordoodleGenerator } from '@wordoodle/core'
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
    expect(checkTest2.location.wrongLocation).to.be.eql([2, 4])
  })

  it('can store used word', () => {
    const wordoodl2 = createWordoodleGenerator()
    wordoodl2.word = 'thorn'
    wordoodl2.check('thorn')
    expect(wordoodl2.keyList.find(w => w.word === 't')?.type).to.be.eql(KeyTypeEnum.CORRECT)
    expect(wordoodl2.keyList.find(w => w.word === 'h')?.type).to.be.eql(KeyTypeEnum.CORRECT)
    expect(wordoodl2.keyList.find(w => w.word === 'o')?.type).to.be.eql(KeyTypeEnum.CORRECT)
    expect(wordoodl2.keyList.find(w => w.word === 'r')?.type).to.be.eql(KeyTypeEnum.CORRECT)
    expect(wordoodl2.keyList.find(w => w.word === 'n')?.type).to.be.eql(KeyTypeEnum.CORRECT)
    const wordoodl3 = createWordoodleGenerator()
    wordoodl3.word = 'space'
    wordoodl3.check('thorn')
    expect(wordoodl3.keyList.find(w => w.word === 't')?.type).to.be.eql(KeyTypeEnum.INCORRECT)
    expect(wordoodl3.keyList.find(w => w.word === 'h')?.type).to.be.eql(KeyTypeEnum.INCORRECT)
    expect(wordoodl3.keyList.find(w => w.word === 'o')?.type).to.be.eql(KeyTypeEnum.INCORRECT)
    expect(wordoodl3.keyList.find(w => w.word === 'r')?.type).to.be.eql(KeyTypeEnum.INCORRECT)
    expect(wordoodl3.keyList.find(w => w.word === 'n')?.type).to.be.eql(KeyTypeEnum.INCORRECT)
    const wordoodl4 = createWordoodleGenerator()
    wordoodl4.word = 'space'
    wordoodl4.check('pecas')
    expect(wordoodl4.keyList.find(w => w.word === 's')?.type).to.be.eql(KeyTypeEnum.WRONG_LOCATION)
    expect(wordoodl4.keyList.find(w => w.word === 'p')?.type).to.be.eql(KeyTypeEnum.WRONG_LOCATION)
    expect(wordoodl4.keyList.find(w => w.word === 'a')?.type).to.be.eql(KeyTypeEnum.WRONG_LOCATION)
    expect(wordoodl4.keyList.find(w => w.word === 'c')?.type).to.be.eql(KeyTypeEnum.WRONG_LOCATION)
    expect(wordoodl4.keyList.find(w => w.word === 'e')?.type).to.be.eql(KeyTypeEnum.WRONG_LOCATION)
  })

  it('can check correct word', () => {
    expect(wordoodle.checkIsCorrectWord('thorn')).toBeTruthy()
    expect(wordoodle.checkIsCorrectWord('hello')).toBeFalsy()
    expect(wordoodle.checkIsCorrectWord('xxxxx')).toBeFalsy()
  })
})
