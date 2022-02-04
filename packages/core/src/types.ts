export interface Word {
  word: string
}

export interface Result {
  isEqual: boolean
  isError: boolean
  location: {
    incorrect: number[]
    correct: number[]
  }
}
