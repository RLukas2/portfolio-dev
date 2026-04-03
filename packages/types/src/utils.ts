/**
 * Utility types for common patterns
 */

/**
 * Make specific properties optional
 * @example
 * type User = { id: string; name: string; email: string }
 * type UserUpdate = PartialBy<User, 'name' | 'email'>
 * // Result: { id: string; name?: string; email?: string }
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 * @example
 * type User = { id: string; name?: string; email?: string }
 * type UserCreate = RequiredBy<User, 'name' | 'email'>
 * // Result: { id: string; name: string; email: string }
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Branded type for type-safe IDs
 * @example
 * type UserId = Branded<string, 'UserId'>
 * type PostId = Branded<string, 'PostId'>
 * // UserId and PostId are not assignable to each other
 */
export type Branded<T, Brand extends string> = T & { __brand: Brand };

/**
 * Extract non-nullable properties from a type
 * @example
 * type User = { id: string; name: string | null; email?: string }
 * type NonNullableUser = NonNullableProps<User>
 * // Result: { id: string; name: string; email: string }
 */
export type NonNullableProps<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

/**
 * Create a type with all properties as nullable
 * @example
 * type User = { id: string; name: string }
 * type NullableUser = Nullable<User>
 * // Result: { id: string | null; name: string | null }
 */
export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Deep partial type (makes all nested properties optional)
 * @example
 * type Config = { db: { host: string; port: number } }
 * type PartialConfig = DeepPartial<Config>
 * // Result: { db?: { host?: string; port?: number } }
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Extract keys of a type that are of a specific type
 * @example
 * type User = { id: string; name: string; age: number }
 * type StringKeys = KeysOfType<User, string>
 * // Result: 'id' | 'name'
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 * Make a type mutable (remove readonly)
 * @example
 * type ReadonlyUser = { readonly id: string; readonly name: string }
 * type MutableUser = Mutable<ReadonlyUser>
 * // Result: { id: string; name: string }
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
