export default async function Signup() {
  const baseUrl = "http://localhost:3030";

  const signUpUser = async (formData: FormData) => {
    "use server";
    const rawFormData = {
      username: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
      birthday: formData.get("birthday"),
    };

    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(rawFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(`FE - successfull fetch at ${baseUrl}/auth/signup`);

      return data;
    } catch (error) {
      console.log(`failed fetch at ${baseUrl}/auth/signup`);
      return `failed fetch at ${baseUrl}/auth/signup`;
    }
  };

  return (
    <section>
      <form action={signUpUser} method="POST">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="birthday">Birthday</label>
        <input type="date" name="birthday" id="birthday" />
        <button type="submit">Sign up</button>
      </form>
    </section>
  );
}
