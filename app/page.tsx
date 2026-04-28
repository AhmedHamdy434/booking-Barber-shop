import { supabase } from "@/lib/supabase"

export default async function Home() {
  const { data } = await supabase.from("test").select("*")
  console.log(data)

  return <div>Hello</div>
}