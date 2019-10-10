import LRU from ".."

describe("LRU Cache Tests", () => {
  const cache = new LRU(3)
  it("put in limit", () => {
    cache.put("a", 1)
    cache.put("b", 2)
    cache.put("c", 3)
    expect(cache.values()).toEqual([3, 2, 1])
  })

  it("put two values overflow limit", () => {
    cache.put("d", 4)
    cache.put("e", 5)
    expect(cache.values()).toEqual([5, 4, 3])
  })

  it("push hash existed", () => {
    cache.put("c", 300)
    expect(cache.values()).toEqual([300, 5, 4])
  })

  it("get", () => {
    expect(cache.get("d")).toBe(4)
    expect(cache.values()).toEqual([4, 300, 5])
  })

  const key = function() {}
  it("put object key", () => {
    cache.put(key, 6)
    expect(cache.values()).toEqual([6, 4, 300])
    cache.put("f", 7)
    expect(cache.values()).toEqual([7, 6, 4])
  })

  it("get object key", () => {
    expect(cache.get(key)).toBe(6)
    expect(cache.values()).toEqual([6, 7, 4])
  })
})
