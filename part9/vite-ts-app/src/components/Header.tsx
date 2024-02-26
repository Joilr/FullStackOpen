interface HeaderProps {
  name: string;
}

function Header({ name }: HeaderProps) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}

export default Header;
