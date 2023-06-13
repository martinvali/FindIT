import NewJobPage from "../../new/page";

async function getPostData(id) {
  // const response = await supabase.from("posts").select().eq("id", id);
}
export default function Page({ params: { id } }) {
  const data = getPostData();
  return <NewJobPage isEditing={true} id={id}></NewJobPage>;
}
