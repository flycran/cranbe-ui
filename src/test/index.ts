const a: { code: number; data: ({ name: string; id: number } | { name: string; id: number })[] } = {
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "家用电器",
    },
    {
      "id": 2,
      "name": "手机",
    },
  ]
}

type T = {code: number, data: {id: number, name: string, parent: number, grade: number, deleteAt: number}[]}

export {}