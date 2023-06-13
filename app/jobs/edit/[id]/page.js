import NewJobPage from "../../new/page";

export default function Page({ params: { id } }) {
  return <NewJobPage isEditing={true}></NewJobPage>;
}
