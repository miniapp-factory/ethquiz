export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-4 mt-auto">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} ETHQUIZ
      </div>
    </footer>
  );
}
