export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Profile</h1>
      <p>Hello {id}</p>
    </div>
  );
}