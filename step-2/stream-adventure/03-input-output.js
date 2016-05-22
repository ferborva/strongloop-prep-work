/*

Take data from `process.stdin` and pipe it to `process.stdout`.

With `.pipe()`. `process.stdin.pipe()` to be exact.

Don't overthink this.

 */

'use strict';

process.stdin.pipe(process.stdout);

/*

// Here's the reference solution:

  process.stdin.pipe(process.stdout);

 */