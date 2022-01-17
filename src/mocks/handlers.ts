import { rest } from 'msw';

export const handlers = [
  rest.get('/book', (req, res, ctx) => {
    return res(
      ctx.json({
        description:
          'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
        imageUrl: '/book-cover.jpg',
        title: 'Lord of the Rings',
      })
    );
  }),
  rest.get('/reviews', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          author: 'John Maverick',
          id: '60333292-7ca1-4361-bf38-b6b43b90cb16',
          text: 'Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!',
        },
      ])
    );
  }),
];
