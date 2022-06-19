export const checkUserFieldsExistence = (userKeys: string[]) =>
  ['name', 'age', 'hobbies'].every(prop => userKeys.includes(prop));
