import { filterArray } from './index'

describe('filterArray', () => {
  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 25 },
    { id: 4, name: 'Charlie', age: 0 },
    { id: 5, name: 'Charlie', age: null },
    { id: 6, name: 'Charlie', age: undefined },
  ]
  // 测试null
  it('should return the first matching element when value is null', () => {
    const result = filterArray(data, 'age', null as any)
    expect(result).toEqual({ id: 5, name: 'Charlie', age: null })
  })

  // 测试0
  it('should return the first matching element when value is undefined', () => {
    const result = filterArray(data, 'age', 0)
    expect(result).toEqual({ id: 4, name: 'Charlie', age: 0 })
  })

  // 测试单个值
  it('should return the first matching element when value is a single value', () => {
    const result = filterArray(data, 'age', 25)
    expect(result).toEqual({ id: 1, name: 'Alice', age: 25 })
  })

  it('should return undefined when no matching element is found for a single value', () => {
    const result = filterArray(data, 'age', 40)
    expect(result).toBeUndefined()
  })

  // 测试数组
  it('should return all matching elements when value is an array', () => {
    const result = filterArray(data, 'age', [25, 30])
    expect(result).toEqual([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 25 },
    ])
  })

  it('should return an empty array when no matching elements are found for an array value', () => {
    const result = filterArray(data, 'age', [40, 50])
    expect(result).toEqual([])
  })

  // 测试未提供 value 或 key
  it('should return undefined when value is undefined', () => {
    const result = filterArray(data, 'age', undefined)
    expect(result).toBeUndefined()
  })

  it('should return undefined when key is undefined', () => {
    const result = filterArray(data, undefined as any, 25)
    expect(result).toBeUndefined()
  })

  // 测试边界情况
  it('should return undefined when the array is empty', () => {
    const result = filterArray([], 'age', 25)
    expect(result).toBeUndefined()
  })

  it('should handle null value correctly', () => {
    const result = filterArray(data, null as any, 'age')
    expect(result).toBeUndefined()
  })

  // 测试 key 不存在的情况
  it('should return undefined when the key does not exist in the objects', () => {
    const result = filterArray(data, 'invalidKey' as any, 25)
    expect(result).toBeUndefined()
  })
})
