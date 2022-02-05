import { fiveWords } from '../assets/json'
import { version } from '../../package.json'
import { KeyTypeEnum } from '../types'
import type { KeyList, Result, Word } from '../types'

export class WordoodleGenerator {
  public version = version
  public words: Word[] = []
  public word = ''
  public indicator = 0
  public result: Result = {} as Result
  public keyList: KeyList[] = []

  constructor(
    public wordSize: number = 5,
  ) {
    this.setWordSize(wordSize)
    this.indicator = 0
    this.word = this.words[0].word
    this.setKeyList()
  }

  setKeyList() {
    const alpha = Array.from(Array(26)).map((e, i) => i + 97)
    alpha.map(x => String.fromCharCode(x)).forEach((a) => {
      this.keyList.push({ word: a, type: KeyTypeEnum.DEFAULT } as KeyList)
    })
  }

  setWordSize(wordSize: number) {
    this.wordSize = wordSize
    switch (wordSize) {
      case 5:
        this.words = fiveWords
        break

      default:
        this.words = fiveWords
        break
    }
  }

  shuffle() {
    const words = this.words
    for (let i = 0; i < words.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (words.length - i))

      const temp = words[j]
      words[j] = words[i]
      words[i] = temp
    }
    this.indicator = 0
    this.words = words
    this.word = words[0].word
  }

  next() {
    if (!(this.indicator >= 0 && this.indicator < this.words.length))
      this.shuffle()

    this.word = this.words[this.indicator += 1].word
    this.result = {} as Result
    this.setKeyList()
    return this.word
  }

  check(word: string): Result {
    const result = { isEqual: false, isError: false, location: { correct: [], wrongLocation: [] } } as Result
    try {
      result.isEqual = this.word === word && word.length === this.wordSize

      const checkWordArr = word.split('')
      const wordArr = this.word.split('')
      // check correct location
      wordArr.forEach((w, i) => {
        const isEqual = w === checkWordArr[i]
        if (isEqual) {
          const idx = this.keyList.findIndex(k => k.word === w)
          this.keyList[idx].type = KeyTypeEnum.CORRECT
          result.location.correct.push(i)
        }
      })
      // check correct word but wrong location
      checkWordArr.forEach((w, i) => {
        const idx = this.keyList.findIndex(k => k.word === w)

        if (result.location.correct.includes(i))
          return

        if (wordArr.includes(w)) {
          this.keyList[idx].type = KeyTypeEnum.WRONG_LOCATION
          result.location.wrongLocation.push(i)
          return
        }

        this.keyList[idx].type = KeyTypeEnum.INCORRECT
      })
    }
    catch (error) {
      result.isError = true
    }
    this.result = result
    return this.result
  }

  checkIsCorrectWord(word: string): boolean {
    return this.words.filter(w => w.word === word).length > 0
  }
}

export function createWordoodleGenerator(wordSize = 5) {
  return new WordoodleGenerator(wordSize)
}
