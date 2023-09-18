# Agenda.mo
People connector

# Dev environment
```
bun dev
```

# Database Adapters
# Where Statement
Most database adapters should have the ability to convert a `where statement` to their own search pattern.

This is the type of `where statements`
```ts
type WhereStatement = {
    [x: string]: string | number | {
        like?: string | undefined;
        greaterThan?: number | undefined;
        lessThan?: number | undefined;
        not?: string | number | {
            like?: string | undefined;
            greaterThan?: number | undefined;
            lessThan?: number | undefined;
        } | undefined;
    };
}
```

This is an example of a where statement and its counterpart in SQL:

Example 1:
```ts
const where = {
  name: 'Johnny',
};

const sqlWhere = 'WHERE `name` = "Johnny"';
```

Example 2:
```ts
const where = {
  name: {
    not: 'Bryan',
  },
  age: {
    greaterThan: 18,
  },
};

const sqlWhere = 'WHERE `name` != "Bryan" AND `age` > 18';
```

An array of wheres should be interpreted as OR conditions.

Example 1:
```ts
const where = [
  { name: 'Johnny' },
  { age: { greaterThan: 18 }},
];

const sqlWhere = 'WHERE `name` = "Johnny" OR `age` > 18';
```