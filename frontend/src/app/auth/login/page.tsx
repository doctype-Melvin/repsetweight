import { redirect } from "next/navigation";

export default async function Login() {
  const baseUrl = "http://localhost:3030";

  const logInUser = async (formData: FormData) => {
    "use server";
    const rawFormData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      console.log(rawFormData);
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(rawFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("FE - ", response.status, response.statusText);
        return;
      }
      const data = await response.json();
      console.log(
        `FE - Server Response at /auth/login:`,
        data.message,
        data.code
      );

      return data;
    } catch (error) {
      console.log(`FE - failed at POST /auth/login`);
      return `failed fetch at ${baseUrl}/auth/login`;
    }
  };

  return (
    <section>
      <form action={logInUser}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Log In</button>
      </form>
    </section>
  );
}
