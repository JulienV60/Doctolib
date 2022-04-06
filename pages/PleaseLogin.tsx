export default function pleaseLogin() {
  return (
    <div>
      {" "}
      <form action="/api/auth/login" method="GET">
        <button> Plz login</button>
      </form>
      ;
    </div>
  );
}
