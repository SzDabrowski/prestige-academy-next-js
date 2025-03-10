// config/auth.ts or similar
export const config = {
  providers: [
    Credentials({
      name: "admin",
      credentials: {
        email: { type: "text", required: true },
        password: { type: "password", required: true },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "admin@example.com" &&
          credentials.password === "password"
        ) {
          return { email: "admin@example.com" };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  providersType: "auth",
};
