type newsServerProps = { params: { id: string } };

export default function SpecificNews({ params: { id } }: newsServerProps) {
  return <div>{id}</div>;
}
