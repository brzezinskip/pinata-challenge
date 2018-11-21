const getOrder = ({ sort, direction }) => {
  const FIELDS_MAP = {
    ID: "id",
    DATE: "created_at",
    TITLE: "title",
    AUTHOR: "user_id",
    BODY: "body"
  };
  return [FIELDS_MAP[sort], direction];
};

const paginatedQuery = (getAllFn, { limit, after, orderBy }) => {
  const [field, direction] = orderBy
    ? getOrder(orderBy)
    : ["created_at", "DESC"];
  let query = getAllFn().orderBy(field, direction);
  query = after
    ? query.where("created_at", "<", new Date(parseInt(after))).limit(limit)
    : limit
    ? query.limit(limit)
    : query;
  return query.then(rows => {
    return {
      edges: rows.map(row => ({
        node: row,
        cursor: row.created_at
      })),
      pageInfo: {
        endCursor: rows.length ? rows[rows.length - 1].created_at : ""
      }
    };
  });
};

module.exports = {
  getOrder,
  paginatedQuery
};
