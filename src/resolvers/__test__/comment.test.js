const { comment } = require("../comment");

let createdCommentId;

describe("get comment by id", async () => {
  it("works for an existing id", async () => {
    const { id, body, post_id, user_id } = await comment.byId(1);
    expect(id).toEqual(1);
    expect(post_id).toBeDefined();
    expect(user_id).toBeDefined();
    expect(body).toBeDefined();
  });

  it("returns undefined if the comment doesn't exist", async () => {
    const res = await comment.byId(999999);
    expect(res).toBeUndefined();
  });
});

describe("get all comments", async () => {
  it("gets all comments from the database", async () => {
    const posts = await comment.all();
    posts.forEach(p => {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("body");
      expect(p).toHaveProperty("user_id");
      expect(p).toHaveProperty("post_id");
    });
    expect(posts).toBeInstanceOf(Array);
  });
});

describe("create new comment", async () => {
  it("successfully creates new comment if provided with needed data and returns new id", async () => {
    const randomString = Math.random()
      .toString(36)
      .substring(7);

    createdCommentId = await comment.create({
      title: randomString,
      body: randomString,
      post_id: 1,
      user_id: 1
    });
    expect(createdCommentId).toBeDefined();
    expect(createdCommentId).toBeGreaterThan(0);
  });

  it("doesn't work if trying to create it with incorrect data", async () => {
    const { name } = await comment.create({
      body: "zxc",
      user_id: 0,
      post_id: 0
    });
    expect(name).toEqual("error");
  });
});

describe("remove comment", async () => {
  it("removes comment from the database, consuming id as a param", async () => {
    const result = await comment.remove(createdCommentId);
    expect(result).toEqual(createdCommentId);
    const getComment = await comment.byId(createdCommentId);
    expect(getComment).toBeUndefined();
  });
});

describe("get comments by post id", async () => {
  it("gets list of comments for given post", async () => {
    const result = await comment.commentsByPostId(1);
    result.forEach(c => expect(c.post_id).toBe(1));
    expect(result).toBeInstanceOf(Array);
  });
  it("returns empty list if post id doesn't exist", async () => {
    const result = await comment.commentsByPostId(9999);
    console.log(result);
    expect(result).toEqual([]);
  });
});
