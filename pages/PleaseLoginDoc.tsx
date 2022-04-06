export default function pleaseLoginDoc() {
  return (
    /// Si il y a pépin
    <div>
      {" "}
      <form action="/api/auth/loginDoc" method="GET">
        <button> Plz login</button>
      </form>
      ;
    </div>
  );
}
