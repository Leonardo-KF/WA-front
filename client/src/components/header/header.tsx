import "./header.css";
export function Header() {
  return (
    <header>
      <section className="logo">
        <img src="./killer.png" width="65px" />
        <h1>AnimeFlix</h1>
      </section>
      <button className="header-button">Update Movies</button>
    </header>
  );
}
