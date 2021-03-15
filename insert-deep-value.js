// inserts a value deep into an object
// like optional chaining but for assigning

/**
 * @param {Object} object the object to insert the key path into
 * @param {Array<String>} keyPath array of key names ['key1', 'key2', 'key3', ...]
 * @param {Any} value value to be inserted at the location specified by the keyPath
 * @return {Object} object with the key path, value pair inserted
 */
const insertDeepValue = (object, keyPath, value) =>
  re(object, keyPath.reverse(), value);

const re = (object, keyPath, value) => {
  const key = keyPath.pop();
  if (!key) {
    return value;
  }
  if (!object) {
    object = {};
  }
  object[key] = re(object[key], keyPath, value);
  return object;
};

// tests

// deep insertion
const test1 = insertDeepValue(
  { a0: { a1: { a2: {} } } },
  [
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "a10",
    "a11",
    "a12",
    "a13",
    "a14",
    "a15",
    "a16",
    "a17",
    "a18",
    "a19",
    "a20",
  ],
  "Hi!"
);
console.log("test1:", JSON.stringify(test1));

// insertion around other values and to an undefined value
const test2 = insertDeepValue(
  {
    a0: {
      a1: {
        a2: {
          a3: {
            a4: undefined,
            b4: "goodbye",
          },
          b3: {},
        },
        b2: {},
      },
      b1: {},
    },
    b0: {},
  },
  ["a0", "a1", "a2", "a3", "a4"],
  "hello"
);
console.log("test2:", JSON.stringify(test2));

// insert short keypath into deep object and writing to an already defined value
const test3 = insertDeepValue(
  { a0: { a1: { a2: { a3: { a4: { a5: { a6: {} } } } } } } },
  ["a0", "a1", "a2", "a3"],
  "I need a haircut."
);
console.log("test3:", JSON.stringify(test3));
