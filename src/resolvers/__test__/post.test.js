const { post } = require("../post");

let createdPostId;
describe("get post by id", async () => {
  it("works for an existing id", async () => {
    const { id, title, body } = await post.byId(1);
    expect(id).toEqual(1);
    expect(title).toBeDefined();
    expect(body).toBeDefined();
  });

  it("returns undefined if the post doesn't exist", async () => {
    const res = await post.byId(999999);
    expect(res).toBeUndefined();
  });
});

describe("get all posts", async () => {
  it("gets all posts from the database", async () => {
    const posts = await post.all();
    posts.forEach(p => {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("title");
      expect(p).toHaveProperty("body");
      expect(p).toHaveProperty("user_id");
    });
    expect(posts).toBeInstanceOf(Array);
  });
});

describe("create new post", async () => {
  it("successfully creates new post if provided with needed data and returns new id", async () => {
    const randomString = Math.random()
      .toString(36)
      .substring(7);

    createdPostId = await post.create({
      title: randomString,
      body: randomString,
      user_id: 1
    });
    expect(createdPostId).toBeDefined();
    expect(createdPostId).toBeGreaterThan(0);
  });

  it("doesn't work if trying to create it with incorrect data", async () => {
    const { name } = await post.create({ title: 123, body: "zxc", user_id: 0 });
    expect(name).toEqual("error");
  });
});

describe("remove post", async () => {
  it("removes post from the database, consuming id as a param", async () => {
    const result = await post.remove(createdPostId);
    expect(result).toEqual(createdPostId);
    const getPost = await post.byId(createdPostId);
    expect(getPost).toBeUndefined();
  });
});
