
export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Adote com Amor</p>
      <div className="socials">
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  );
}
