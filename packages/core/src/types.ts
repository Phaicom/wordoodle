export interface Word {
  word: string
}

export interface Result {
  isEqual: boolean
  isError: boolean
  location: {
    correct: number[]
    wrongLocation: number[]
  }
}
export enum KeyTypeEnum {
  DEFAULT = 'default',
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  WRONG_LOCATION = 'wrong location',
}

export interface KeyList {
  word: string
  type: KeyTypeEnum
}
