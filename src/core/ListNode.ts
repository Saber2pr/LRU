/*
 * @Author: saber2pr
 * @Date: 2019-08-22 15:10:58
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-08-22 15:18:04
 */
type Key = string | symbol

export class ListNode {
  public prev: ListNode
  public next: ListNode
  public constructor(public key: Key = null, public value = null) {}

  public removeSelf() {
    if (this.prev) this.prev.next = this.next
    if (this.next) this.next.prev = this.prev
  }

  public head() {
    let node: ListNode = this
    while (node.prev) {
      node = node.prev
    }
    return node
  }

  public foot() {
    let node: ListNode = this
    while (node.next) {
      node = node.next
    }
    return node
  }

  public collect() {
    const vals = []
    let node: ListNode = this
    while (node) {
      vals.push(node.value)
      node = node.next
    }
    return vals
  }
}
