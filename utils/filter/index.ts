import { isUndefined } from '~/is'

/**
 * 根据指定键和值过滤数组中的对象。
 * @param arr 要过滤的对象数组。
 * @param key 对象中用于匹配的键。
 * @param value 要匹配的值，可以是单个值或值的数组。
 * @returns 如果提供了值和键，则返回过滤后的数组或找到的第一个匹配对象；否则返回 undefined。
 */
export function filterArray<T extends object>(
  arr: T[],
  key: keyof T,
  value?: number | string | boolean,
): T | undefined
export function filterArray<T extends object>(
  arr: T[],
  key: keyof T,
  value?: (number | string | boolean)[],
): T[]
export function filterArray<T extends object>(
  arr: T[],
  key: keyof T,
  value?: number | string | boolean | (number | string | boolean)[],
) {
  if (isUndefined(value) || isUndefined(key)) return undefined
  if (Array.isArray(value)) {
    return arr.filter((item) => value.includes(item[key] as any))
  } else {
    return arr.find((item) => item[key] === value)
  }
}
