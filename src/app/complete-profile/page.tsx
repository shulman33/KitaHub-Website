export default function Page() {
  return (
    <main>
      <h1>Complete your profile</h1>
      <form action="/api/update-profile" method="post">
        <label>
          University
          <input type="text" name="university" required />
        </label>
        <label>
          Are you a professor?
          <input type="checkbox" name="isProfessor" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};
