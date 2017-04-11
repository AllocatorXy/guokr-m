/**
 * date: 2017-03-21 21:08:50
 * author: AllocatorXy
 * description: node for haozhi
 */
'use strict';

const ex = require('express');
const st = require('express-static');
const sv = ex();

sv.listen(80);
sv.use(st(__dirname));
