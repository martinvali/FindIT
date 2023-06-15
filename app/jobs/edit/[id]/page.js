import NewJobPage from "../../new/page";

export default async function Page({ params: { id } }) {
  const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {cache:"no-store"});
  const data = await response.json();
  return <NewJobPage post={...data}></NewJobPage>;
}
