import "./footer.css";
import { FaGithub } from "react-icons/fa";
export function Footer() {
  return (
    <footer className="footer">
      <FaGithub color={"whiteSmoke"} size={25} />
      <a
        href="https://github.com/Leonardo-KF/WA-front/tree/main/client"
        target="blank"
        rel="noopener"
      >
        Developed by Leonardo Fleck
      </a>
    </footer>
  );
}
