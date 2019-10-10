/*
 * @Author: saber2pr
 * @Date: 2019-08-22 15:10:01
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-08-22 15:18:34
 */
import { ListNode } from "./ListNode"
import { HashMap } from "./HashMap"

type Key = string | symbol | Object

export class LRU {
  private hashMap = new HashMap<Key, ListNode>()
  private head = new ListNode()

  public constructor(private size: number = 5) {}

  private remove(node: ListNode) {
    node.removeSelf()
    this.hashMap.delete(node.key)
  }

  private appendLatest(node: ListNode) {
    const latest = this.getLatest()
    if (latest) latest.prev = node
    node.next = latest

    node.prev = this.head
    this.head.next = node

    if (!this.hashMap.has(node.key)) {
      this.hashMap.set(node.key, node)
    }
  }

  private getLatest() {
    return this.head.next
  }

  private getOldest() {
    return this.head.foot()
  }

  public get(key: Key) {
    if (this.hashMap.has(key)) {
      const node = this.hashMap.get(key)
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

  public put(key: Key, value: any) {
    if (this.get(key)) {
      const latest = this.getLatest()
      latest.value = value
    } else {
      this.checkForClean()
      const node = new ListNode(key, value)
      this.hashMap.set(key, node)
      this.appendLatest(node)
    }
  }

  public values() {
    const latest = this.getLatest()
    return latest.collect()
  }
}
