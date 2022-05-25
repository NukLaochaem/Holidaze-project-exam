import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="notfound-container text-center">
      <h1 className="mt-5">404</h1>
      <h3>Page was not found</h3>

      <Link to="/">Go to Home </Link>
    </div>
  );
}
