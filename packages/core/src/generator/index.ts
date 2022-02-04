import { fiveWords } from '../assets/json'
import { version } from '../../package.json'
import type { Result, Word } from '../types'

export class WordoodleGenerator {
  public version = version
  public words: Word[] = []
  public word = ''
  public indicator = 0
  public result: Result = {} as Result
  public usedWord = new Set<string>()

  constructor(
    public wordSize: number = 5,
  ) {
    this.setWordSize(wordSize)
    this.indicator = 0
    this.word = this.words[0].word
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
    return this.word
  }

  check(word: string): Result {
    const result = { isEqual: false, isError: false, location: { correct: [], incorrect: [] } } as Result
    try {
      result.isEqual = this.word === word && word.length === this.wordSize

      const checkWordArr = word.split('')
      const wordArr = this.word.split('')
      // check correct location
      wordArr.forEach((w, i) => {
        const isEqual = w === checkWordArr[i]
        if (isEqual)
          result.location.correct.push(i)
      })
      // check correct word but incorrect location
      checkWordArr.forEach((w, i) => {
        this.usedWord.add(w)
        if (result.location.correct.includes(i))
          return

        if (wordArr.includes(w))
          result.location.incorrect.push(i)
      })
    }
    catch (error) {
      result.isError = true
    }
    this.result = result
    return this.result
  }
}

export function createWordoodleGenerator(wordSize = 5) {
  return new WordoodleGenerator(wordSize)
}
