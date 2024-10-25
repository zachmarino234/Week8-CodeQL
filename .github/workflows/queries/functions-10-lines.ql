/**
 * @description Find functions that are longer than 10 lines
 * @kind problem
 * @id javascript/functions-10-lines
 * @problem.severity recommendation
 */
import javascript

predicate isLongFunction(Function fn) {
  fn.getEndLine() - fn.getStartLine() > 10
}

from Function fn
where isLongFunction(fn)
select fn, "Function is longer than 10 lines."