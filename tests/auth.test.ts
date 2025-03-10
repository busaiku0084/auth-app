import request from "supertest";
import app from "../src/app"; 

describe("認証APIテスト", () => {
  let token: string;

  it("ユーザー登録できること", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ username: "testuser", password: "testpass" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user.id");
  });

  it("トークンを発行できること", async () => {
    const res = await request(app)
      .post("/auth/issue")
      .send({ username: "testuser", password: "testpass" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // 取得したトークンを保存
  });

  it("トークンを検証できること", async () => {
    const res = await request(app)
      .get("/auth/verify")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
  });

  it("トークンを無効化できること", async () => {
    const res = await request(app)
      .post("/auth/revoke")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Token revoked");
  });

  it("無効化後のトークンが使えないこと", async () => {
    const res = await request(app)
      .get("/auth/verify")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(false);
  });
});
