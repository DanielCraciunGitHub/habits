import { HabitPage } from "./HabitPage";

export default async function Page({
  params,
}: {
  params: Promise<{ habit: string }>;
}) {
  const slug = (await params).habit;
  return <HabitPage slug={slug} />;
}
