const { getOrder } = require("../tools");

describe("getOrder", async () => {
  it("returns an array containing two strings, first one representing field name, second representing order", async () => {
    const [field, order] = getOrder({ sort: "AUTHOR", direction: "DESC" });
    expect(field).toEqual("user_id");
    expect(order).toEqual("DESC");
  });
  it("returns undefined field provided with incorrect data", async () => {
    const [field, order] = getOrder({ sort: "bla", direction: "ASC" });
    expect(field).toBeUndefined();
    expect(order).toEqual("ASC");
  });
});
