/**
 * @description Find functions that are longer than 10 lines
 * @kind problem
 * @id javascript/functions-10-lines
 * @problem.severity recommendation
 */
import javascript

from Function fn
where fn.getEndLine() - fn.getStartLine() > 10
select fn, "Function is longer than 10 lines."