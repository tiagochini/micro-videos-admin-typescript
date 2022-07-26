#!/bin/sh

npm run cti create './src/_Shared/Application' -- -i '*spec.ts' -b &&
npm run cti create './src/_Shared/Domain' -- -i '*spec.ts' -b &&
npm run cti create './src/_Shared/Infra' -- -i '*spec.ts' -b &&

npm run cti create './src/Category/Application' -- -i '*spec.ts' -b &&
npm run cti create './src/Category/Domain' -- -i '*spec.ts' -b &&
npm run cti create './src/Category/Infra' -- -i '*spec.ts' -b 