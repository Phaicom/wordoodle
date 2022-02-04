import { fiveWords } from '../assets/json'
import { version } from '../../package.json'
import type { word } from '../types'

export class WordoodleGenerator {
  public version = version
  public words: word[] = []
  public word = ''
  public indicator = 0

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

  check(word: string): boolean {
    return this.word === word && word.length === this.wordSize
  }
}

export function createWordoodleGenerator(wordSize = 5) {
  return new WordoodleGenerator(wordSize)
}
