# @saber2pr/lru

> LRU Cache.

```bash
npm install @saber2pr/lru

yarn add @saber2pr/lru
```

## Cache

```ts
const cache = new LRU(3) // limit: 3.

cache.put('a', 1)
cache.put('b', 2)
cache.put('c', 3)
cache.values() // [3, 2, 1]

cache.put('d', 4)
cache.put('e', 5)
cache.values() // [5, 4, 3]

cache.put('d', 44)
cache.values() // [44, 5, 3]

cache.get('c') // 3
cache.values() // [3, 44, 5]
```

---

## start

```bash
yarn start

yarn test
```

> Author: saber2pr
