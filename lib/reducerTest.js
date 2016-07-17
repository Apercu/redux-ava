'use strict'

const deepFreeze = require('deep-freeze')
const { is, Iterable: { isIterable } } = require('immutable')

module.exports = (reducer, stateBefore, action, stateAfter, description) => t => {
  deepFreeze(action)

  if (isIterable(stateBefore) && isIterable(stateAfter)) {
    return t.true(is(reducer(stateBefore, action), stateAfter), description)
  }

  deepFreeze(stateBefore)
  t.deepEqual(reducer(stateBefore, action), stateAfter, description)
}
