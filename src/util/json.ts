import { OrderedMap } from "immutable";

export const reviver = (_: string, value: unknown) => {
  if (value != null && typeof value === "object") {
    if (
      "dataType" in value &&
      "value" in value &&
      value.dataType === "OrderedMap" &&
      Array.isArray(value.value)
    ) {
      return OrderedMap(value.value);
    }
  }

  return value;
};

export function replacer(key: string, value: unknown) {
  // @ts-ignore: JSON.stringify declassing this for some reason
  if (this[key] instanceof OrderedMap) {
    return {
      dataType: "OrderedMap",
      // @ts-ignore
      value: this[key].toArray(),
    };
  }

  return value;
}
