/*
 * @Author: saber2pr
 * @Date: 2019-08-21 19:10:27
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-08-21 19:10:27
 */
type Hash = string | symbol

class ListNode {
  public hash: Hash
  public prev: ListNode
  public next: ListNode
  public constructor(public value = null) {}
}

export class LRU {
  private hashMap = new Map<Hash, ListNode>()
  private head = new ListNode()

  public constructor(public size: number = 5) {}

  private remove(node: ListNode) {
    if (node.prev) node.prev.next = node.next
    if (node.next) node.next.prev = node.prev
    this.hashMap.delete(node.hash)
  }

  private appendLatest(node: ListNode) {
    const latest = this.getLatest()
    if (latest) latest.prev = node
    node.next = latest

    node.prev = this.head
    this.head.next = node

    if (!this.hashMap.has(node.hash)) {
      this.hashMap.set(node.hash, node)
    }
  }

  private getLatest() {
    return this.head.next
  }

  private getOldest() {
    let node = this.getLatest()
    while (node.next) {
      node = node.next
    }
    return node
  }

  public get(hash: Hash) {
    if (this.hashMap.has(hash)) {
      const node = this.hashMap.get(hash)
      this.remove(node)
      this.appendLatest(node)
      return node.value
    } else {
      return null
    }
  }

  private checkForClean() {
    if (this.size <= this.hashMap.size) {
      const oldest = this.getOldest()
      this.remove(oldest)
    }
  }

  public put(hash: Hash, value: any) {
    if (this.get(hash)) {
      const latest = this.getLatest()
      latest.value = value
    } else {
      this.checkForClean()
      const node = new ListNode(value)
      node.hash = hash
      this.hashMap.set(hash, node)
      this.appendLatest(node)
    }
  }

  public values() {
    const vals = []
    let node = this.getLatest()
    while (node) {
      vals.push(node.value)
      node = node.next
    }
    return vals
  }
}
