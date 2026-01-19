export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary-subtle">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Menu
          </a>
          <ul className="dropdown-menu bg-primary-subtle">
            <li><a className="dropdown-item" href="#">Link1</a></li>
            <li><a className="dropdown-item" href="#">Link2</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}
