const server = require("../../../../utils/server")("internal");

describe("User Routes Test", () => {
    let authToken;

    const testUser = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "StrongPassword123",
    };

    beforeAll(async () => {
        const registerResponse = await server
            .post("v1.0/user/register")
            .send(testUser);
        authToken = registerResponse.body.token;
    });

    it("registers a user successfully", async () => {
        const res = await server.post("v1.0/user/register").send(testUser);
        console.log("res:", res);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it("logs in a user successfully", async () => {
        const loginData = {
            email: testUser.email,
            password: testUser.password,
        };

        const res = await server.post("v1.0/user/login").send(loginData);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it("fetches user profile successfully", async () => {
        const res = await server
            .get("v1.0/user/me")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe(testUser.firstName);
    });

    afterAll(async () => {
        const res = await server
            .delete("v1.0/user/me")
            .set("Authorization", `Bearer ${authToken}`);
    });
});
