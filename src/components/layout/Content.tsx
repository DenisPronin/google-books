interface Props {
  children: JSX.Element
}

function Content (props: Props) {
  return (
    <main>
      {props.children}
    </main>
  );
}

export default Content;
